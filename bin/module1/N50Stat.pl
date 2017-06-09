#! /usr/bin/perl

use strict;
use warnings;
use File::Basename;
use List::Util qw(sum min max);

my $As = 0;
my $Ts = 0;
my $Gs = 0;
my $Cs = 0;
my $Ns = 0;

# Parameter variables

my $file = $ARGV[0];

if(!defined($file)) {
	prtError("No input files are provided");
}

my ($fileName, $filePath) = fileparse($file);
open(I, "<$file") or die "Can not open file: $file\n";

my @len = ();

my $prevFastaSeqId = "";
my $fastaSeqId = "";
my $fastaSeq = "";

while(my $line = <I>) {
	chomp $line;
	if($line =~ /^>/) {
		$prevFastaSeqId = $fastaSeqId;
		$fastaSeqId = $line;
		if($fastaSeq ne "") {
			push(@len, length $fastaSeq);
			baseCount($fastaSeq);
		}
		$fastaSeq = "";
	}
	else {
		$fastaSeq .= $line;
	}
}
if($fastaSeq ne "") {
	$prevFastaSeqId = $fastaSeqId;
	push(@len, length $fastaSeq);
	baseCount($fastaSeq);
}

my $totalReads = scalar @len;
my $bases = sum(@len);

=head
print "Total No. Of Bases: ", $bases, " bp\n";
print "Total No. Of As: ", sprintf("%.2f", ($As/$bases*100)), " %\n";
print "Total No. Of Ts: ", sprintf("%.2f", ($Ts/$bases*100)), " %\n";
print "Total No. Of Gs: ", sprintf("%.2f", ($Gs/$bases*100)), " %\n";
print "Total No. Of Cs: ", sprintf("%.2f", ($Cs/$bases*100)), " %\n";
print "Total No. Of (A + T)s: ", sprintf("%.2f", (($As+$Ts)/$bases*100)), " %\n";
print "Total No. Of (G + C)s: ", sprintf("%.2f", (($Gs+$Cs)/$bases*100)), " %\n";
print "Total No. Of Ns: ", sprintf("%.2f", ($Ns/$bases*100)), " %\n";
=cut

print $bases, " bp\n";
print sprintf("%.2f", ($As/$bases*100)), " %\n";
print sprintf("%.2f", ($Ts/$bases*100)), " %\n";
print sprintf("%.2f", ($Gs/$bases*100)), " %\n";
print sprintf("%.2f", ($Cs/$bases*100)), " %\n";
print sprintf("%.2f", (($As+$Ts)/$bases*100)), " %\n";
print sprintf("%.2f", (($Gs+$Cs)/$bases*100)), " %\n";
print sprintf("%.2f", ($Ns/$bases*100)), " %\n";


exit;

sub calcN50 {
	my @x = @{$_[0]};
	my $n = $_[1];
	@x=sort{$b<=>$a} @x;
	my $total = sum(@x);
	my ($count, $n50)=(0,0);
	for (my $j=0; $j<@x; $j++){
        $count+=$x[$j];
        if(($count>=$total*$n/100)){
            $n50=$x[$j];
            last;
        }
	}
	return $n50;
}

sub calcMedian {
	my @arr = @_;
	my @sArr = sort{$a<=>$b} @arr;
	my $arrLen = @arr;
	my $median;
	if($arrLen % 2 == 0) {
		$median = ($sArr[$arrLen/2-1] + $sArr[$arrLen/2])/2;
	}
	else {
		$median = $sArr[$arrLen/2];
	}
	return $median;
}

sub baseCount {
	my $seq = $_[0];
	my $tAs += $seq =~ s/A/A/gi;
	my $tTs += $seq =~ s/T/T/gi;
	my $tGs += $seq =~ s/G/G/gi;
	my $tCs += $seq =~ s/C/C/gi;
	$Ns += (length $seq) - $tAs - $tTs - $tGs - $tCs;
	$As += $tAs;
	$Ts += $tTs;
	$Gs += $tGs;
	$Cs += $tCs;
}

sub prtHelp {
	print "\n$0 options:\n\n";
	print "### Input reads/sequences (FASTA) (Required)\n";
	print "  -i <Read/Sequence file>\n";
	print "    Read/Sequence in fasta format\n";
	print "\n";
	print "### Other options [Optional]\n";
	print "  -h | -help\n";
	print "    Prints this help\n";
	print "  -o | -outputFile <Output file name>\n";
	print "    Output will be stored in the given file\n";
	print "    default: By default, N50 statistics file will be stored where the input file is\n";
	print "\n";
}

sub prtError {
	my $msg = $_[0];
	print STDERR "+======================================================================+\n";
	printf STDERR "|%-70s|\n", "  Error:";
	printf STDERR "|%-70s|\n", "       $msg";
	print STDERR "+======================================================================+\n";
	prtUsage();
	exit;
}

sub prtUsage {
	print "\nUsage: perl $0 <options>\n";
	prtHelp();
}
