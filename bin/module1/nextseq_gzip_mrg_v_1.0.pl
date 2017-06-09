use strict;
use Symbol;

my $gzip=`which gzip`;
chomp $gzip;
#if(!-e $gzip){     $gzip="/usr/local/bin/gzip"; }   

my $gunzip=`which gunzip`;
chomp $gunzip;
#if(!-e $gunzip){     $gunzip="/usr/local/bin/gunzip"; }   


my $adap="CTGTAGGCACCATCAATC";
$adap="CTGTAGGCACCA";
my $odir="fa";
#if(!-e $gzip){ die "$gzip does not exist on this machine, install first";}

my $file1=shift;
my $name=shift;
my $mode="mRNA";
$mode="DNA";
$mode="mRNA";

$mode=shift;
$odir=shift;
my $repeat=shift;
my $trunc=shift;
my $downloadLink = shift;
my $runRScript = shift;

my $host=`hostname`;

my $sort="sort ";

if($host=~/etna|lome/){
    $sort="sort -T /home/ravi/sort ";
    print STDERR "sort is now $sort\n";
#   my $com="cat @masters | sort --key=1,1  > $newmap/tbl_lane.master";
#my $com="cat @masters | sort -T /home/ravi/sort --key=1,1  > $newmap/tbl_lane.master";
} 
#die "Usage:$0 file name\nGive only the first file L001_R1 file and a name\n" if(!defined($name));
die "Usage:$0 file name mode(DNA|mRNA) outdir repeat truncate(0|1)\n".
    "Give only the first file L001_R1 file and a name\n".
    "repeat, 0 for no repeat filter, otherwise length of repetitive sequence to remove (typical value is 20) \n" if(!defined($trunc));

my @F_files;
my @R_files;

my ($dir)=$file1=~/^(\S+)\/[^\/]+$/;

if($file1!~/L001/){
    if(!-e $file1){ die "$file1 is non-existent\n";}
    push(@F_files,$file1);
    if($file1=~/R1/){
	my $file2=$file1;$file2=~s/R1/R2/;
	if(-e $file2){ push(@R_files,$file2);}
    }
}
else  {
    for (my $i=0;$i<4;$i++){
	my $file=$file1;
	my $j=$i+1;
	$file=~s/_L001_/_L00$j\_/;

	my $rfile=$file;
	if($rfile !~/R1/){ die "$rfile does not have R1 in its name\n";}
	$rfile=~s/_R1_/_R2_/;

	if(-e $file){ push(@F_files,$file);}
#    else { die "why don't you have $file";}

	if(-e $rfile){ push(@R_files,$rfile);}
    }
}
my $pe=0;
if(@R_files>0) {$pe=1;}

print STDERR "mode=$mode, pe=$pe\n";

my $unfa="$odir/$name.unfa";
my $fa="$odir/$name.fa";
my $lock="$odir/$name.lock";

if(-e $fa || -e $unfa || -e "$fa.gz"|| -e $lock) { print STDERR   "STOP:$fa,$unfa,$fa.gz or $lock exists\n"; exit;}

my ($lenf,$lenr)=get_len_stats_pair($F_files[0],$R_files[0]);

#print "len_stats done\n";

my $sublen=0;
my $prelen=0;
my $postlen=0;

my $lcnt=0;
if($mode eq "DNA"){
    if($lenf<75){
	$prelen=0;
	$postlen=0;
    }
    elsif($lenf>=75 && $lenf<84){
	$prelen=2;
	$postlen=2;
    }
    elsif($lenf>=84){
	$prelen=4;
	$postlen=4;
    }
    else {
	die "unhandled length\n";
    }
} elsif($mode eq "mRNA"){
    if($lenf>=50 && $lenf < 75){
	$prelen=2;
	$sublen=45;
    }
    elsif($lenf>=75 && $lenf < 84){
	$prelen=1;
	$sublen=37;
    }
    elsif($lenf>=84 && $lenf < 86){
	$prelen=2;
	$sublen=40;
    }
    elsif($lenf>=86 && $lenf < 98){
	$prelen=2;
	$sublen=42;
    }
    elsif($lenf>=98){
	$prelen=4;
	$sublen=45;
    }
    else {
	die "unhandled mRNA length\n";
    }
} else { die "unknown mode=$mode\n";}

if($trunc==0){	$prelen=0;	$postlen=0;    }

#print "$mode,prelen=$prelen, sublen=$sublen\n";

my $fa_cnt=0;
my $adapt_cnt=0;
system("touch $lock")==0 or die "FAIL:$lock";
if(-e $unfa){
    print "$unfa exists, so bypassing stuff\n";
    ## do not proceed, could be bad unfa from before, though unlikely anymore with lock files in place
    exit 1;
}
else{
    open OUT,">$unfa" or die "FAIL:$unfa";
    for(my $i=0;$i<@F_files;$i++){
	my $file=$F_files[$i];
	my $rfile;

	if($pe){ $rfile=$R_files[$i];}

	my $str=gensym();
	if($file=~/\.gz$/){ 	    open $str,"$gunzip -c $file |";	}
	else { 	    open $str,"cat $file |";	}
	my $str2=gensym();
	if($pe){
	    if($rfile=~/\.gz$/){open $str2,"$gunzip -c $rfile |";}
	    else{open $str2,"cat $rfile |";}
	}
	while(my $line1=<$str>){
	    chomp($line1);
	    my $line2=<$str>; chomp($line2);
	    my $line3=<$str>;chomp($line3);
	    my $line4=<$str>;chomp($line4);
	    $fa_cnt++;
	    $adapt_cnt++ if($line2=~/$adap/);

	    my ($line5,$line6,$line7,$line8);
	    if($pe){
		$line5=<$str2>;
		$line6=<$str2>;
		chomp($line6);
		$line7=<$str2>;
		$line8=<$str2>;
		if(length($line6) >= $lenr){$line6=substr($line6,0,$lenr);}
		else { next;}

		$line6=~s/^\w{$prelen}// if($mode=~/mRNA/);

		if($mode=~/DNA/){
		    $line6=~s/^\w{$prelen}//;$line6=~s/\w{$postlen}$//;}
		$line6=rc($line6);
	    }

	    if(length($line2) >= $lenf){
		$line2=substr($line2,0,$lenf);
		$line2=~s/^\w{$prelen}// if($mode=~/mRNA/);
		if($mode=~/DNA/){
		    $line2=~s/^\w{$prelen}//;$line2=~s/\w{$postlen}$//;}
	    }else {
		next;
	    }
	    my @seq;

	    if($mode=~/mRNA/){
		@seq= $line2=~/(\w{$sublen})/g;

#		print "line2=$line2\n";
#		print "      12345678901234567890123456789012345678901234567890\n";
#		print join("\n",@seq)."\n";
		if($pe){
		    my @seq2=$line6=~/(\w{$sublen})/g;
		    push(@seq,@seq2);
		}
	    } else {
		if($pe){
		    push(@seq,$line2."N".$line6);
		} else {
		    push(@seq,$line2);
		}
	    }
	    #print "@seq\n";exit;
	    #$lcnt++;
	    print OUT join("\n",@seq)."\n";
	}
    }
}
close OUT;
#print "lcnt=$lcnt\n";exit;
#my $com="head -10000 $unfa | sort  | uniq -c |  sort -nr -k 1,1 | grep -v \"\\([ACGT]\\)\\1\\{12\\}\" | grep -v \"N\\{4\\}\" | sed 's/^ *\\([0123456789]*\\)/\.\\1/' | sed = | sed \"N;s/\\n//;s/^\\([0123456789]*\\)/>$name.\\1/\" |  sed 's/\\([0123456789]\\)  *\\([ACGTN]\\)/\\1\\n\\2/'  > $fa";

#my $com="cat $unfa | sort  | uniq -c |  sort -nr -k 1,1 | grep -v \"\\([ACGT]\\)\\1\\{12\\}\" | grep -v \"N\\{4\\}\" | sed 's/^ *\\([0123456789]*\\)/\.\\1/' | sed = | sed \"N;s/\\n//;s/^\\([0123456789]*\\)/>$name.\\1/\" |  sed 's/\\([0123456789]\\)  *\\([ACGTN]\\)/\\1\\n\\2/'  > $fa";

#my $com="cat $unfa | sort  | uniq -c |  sort -nr -k 1,1 | grep -v \"\\([ACGT]\\)\\1\\{12\\}\" | grep -v \"N\\{4\\}\" |  grep -v \"T\\{32\\}\" | grep -v \"A\\{32\\}\" | grep -v \"C\\{32\\}\" | grep -v \"G\\{32\\}\" | sed 's/^ *\\([0123456789]*\\)/\.\\1/' | sed = | sed \"N;s/\\n//;s/^\\([0123456789]*\\)/>$name.\\1/\" |  sed 's/\\([0123456789]\\)  *\\([ACGTN]\\)/\\1\\n\\2/'  > $fa";
my $com;

if($repeat >0){ 
 $com="cat $unfa | $sort  | uniq -c |  $sort -nr -k 1,1 | grep -v \"\\([ACGTN][ACGTN]\\)\\1\\{$repeat\\}\"| grep -v \"\\([ACGTN]\\)\\1\\{$repeat\\}\" | sed 's/^ *\\([0123456789]*\\)/\.\\1/' | sed = | sed \"N;s/\\n//;s/^\\([0123456789]*\\)/>$name.\\1/\" |  sed 's/\\([0123456789]\\)  *\\([ACGTN]\\)/\\1\\n\\2/' | $gzip  > $fa.gz";
} else { 
 $com="cat $unfa | $sort  | uniq -c |  $sort -nr -k 1,1  | sed 's/^ *\\([0123456789]*\\)/\.\\1/' | sed = | sed \"N;s/\\n//;s/^\\([0123456789]*\\)/>$name.\\1/\" |  sed 's/\\([0123456789]\\)  *\\([ACGTN]\\)/\\1\\n\\2/' | $gzip  > $fa.gz";
} 
#print "$com\n";
print STDERR "sorting and making $fa\n";
system($com)==0 or die "FAIL:$com";

my $com="$gunzip -c $fa.gz | grep \"^>\" | sed -e 's/^>.*\\.\\([[:digit:]]\\{1,\\}\\)/\\1/' | uniq -c ";

my $str=`$com`;

#print "str=<$str>\n";

my @str=split(/\n/,$str);
my $sum_reads=0;
my $sum_fa=0;
foreach(@str){ 
    my ($x,$y)=$_=~/(\d+)\s+(\d+)/;
    $sum_fa+=$x;
    $sum_reads+=($x*$y);
} 

system("rm $unfa")==0 or die "FAIL:rm $unfa";
system("rm $lock")==0 or die "FAIL: un $lock";

my $csv=$fa;
$csv=~s/\.fa//;
my $graph = $csv . ".png";
my $tempZipFileName = $csv;
$csv.=".csv";

open OUT,">$csv" or die "FAIL:$csv";

print OUT "\n\n# TagLet Run Summary:\n\n";
print OUT "# Read Count,$fa_cnt\n";
print OUT "# Reads With Adapters,$adapt_cnt\n";
print OUT "# Number Of Reads,$sum_reads\n";
print OUT "# Number Of Sequences In Fasta File,$sum_fa\n";
if($lenr)
{
	print OUT "# Read Length\n#,# Forward,$lenf\n#,# Reverse,$lenr\n\n";
}
else
{
	print OUT "# Read Length\n#,# Forward,$lenf\n#,# Reverse,NA\n\n";
}

print OUT "Number Of Sequences,Abundance\n";

open TEMP,">$csv.temp" or die "FAIL:$csv.temp";
print TEMP "SequecesCount\tAbundance\n";
chomp($str);
my @str=split(/\n/,$str);

foreach (@str){ 
    $_=~s/^\s+//;
    $_=~s/(\S)\s+(\S)/$1,$2/;
    my @tempArr = split(",", $_);
    print TEMP "", log10($tempArr[0]), "\t" , log10($tempArr[1]), "\n";
    print OUT "$_\n";
} 
close OUT;
close TEMP;

## Changes from our side

my $runRcmd = "Rscript $runRScript $csv.temp $graph";
print "@ [INFO] Running cmd = $runRcmd\n";

if(system($runRcmd) != 0)
{
	warn "@ [WARNING] Can not create graph...!!\n";
	die "@ [ERROR] Can not make zip file...!!" if(system("zip -j $tempZipFileName.zip $fa.gz $csv"));
	die "@ [ERROR] Can copy file to download link...!!" if(system("cp $tempZipFileName.zip $downloadLink"));
}
else
{
	die "@ [ERROR] Can not make zip file...!!" if(system("zip -j $tempZipFileName.zip $fa.gz $csv $graph"));
	die "@ [ERROR] Can copy file to download link...!!" if(system("cp $tempZipFileName.zip $downloadLink"));
}

die "@ [ERROR] Can not remove fasta file...!!" if(system("rm -f $fa.gz"));
die "@ [ERROR] Can not remove temp csv file...!!" if(system("rm -f $csv.temp"));
die "@ [ERROR] Can not remove csv file...!!" if(system("rm -f $csv"));
die "@ [ERROR] Can not remove graph image file...!!" if(system("rm -f $graph"));

print "DONE \n";
exit;

sub log10
{
	my $n = shift;
	return log($n)/log(10);
}
sub rc{
    my $str=shift;
    $str=reverse($str);
    $str=~tr/ACGTacgt/TGCAtgca/;
    return $str;
}



sub get_len_stats_pair{
    my $file1=shift;
    my $file2=shift;
#    print "get_len_stats_pair($file1,$file2)\n"; exit;
    my $len1=get_len_stats($file1);
    my $len2;
    if(defined($file2)){
	$len2=get_len_stats($file2);
    }
    return ($len1,$len2);
}

sub get_len_stats{
    my $file=shift;

#    print "get_len_stats($file\n"; exit;

    my $com="$gunzip -c $file | head -100000 | grep \"^[ACGTN]*\$"."\" ";
    if($file!~/\.gz$/){
	$com="cat $file | head -100000 | grep \"^[ACGTN]*\$"."\" ";
    }
#    print "$com\n";
    my $str=`$com`;
    chomp($str);
    my %len;
    my $cnt=0;

    my @tmp=split(/\n/,$str);
    foreach my $line(@tmp){
	my $l=length($line);
	$cnt++;
#	print "$cnt,len=$l,$line\n";
#	print "$cnt,len=$l,$line\n" if($cnt%100001==1);
	$len{$l}++;
    }
    my @lens=sort{$b <=> $a} keys %len;
#    print "lens=@lens\n";exit;
    my $last;
    my $max=0;
    for(my $i=0;$i<@lens;$i++){

#	print "$lens[$i]\t".$len{$lens[$i]};

	$max=$len{$lens[$i]} if($max < $len{$lens[$i]});
	my $rat=$len{$lens[$i]}/$max;
#	print " rat=$rat\n";
	if($rat < 0.2){	    last;	}
	$last=$lens[$i];
    }

#    print "Truncating to $last from $lens[0]  give 3 if okay,  2 to suggest your own length\n";
    if(0){
	my $okay=<STDIN>;
	chomp($okay);
	if($okay == 3) { return $last;}
	elsif($okay == 2) {
	    print "give your length\n";
	    my $L=<STDIN>;chomp($L);
	    print "using $L as length give 3 to okay\n";
	    my $okay=<STDIN>;
	    chomp($okay);

	    if($okay != 3) { die "aborted\n";}
	    return $L;
	}else{
	    die "you aborted run";
	}
    }
   return $last;
}
