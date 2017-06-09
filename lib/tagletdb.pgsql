--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: table_admin; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE table_admin (
    admin_id bigint NOT NULL,
    admin_email character varying(255) NOT NULL,
    admin_name character varying(255) NOT NULL,
    admin_password character varying(255) NOT NULL,
    admin_salt character varying(255) NOT NULL
);


ALTER TABLE public.table_admin OWNER TO postgres;

--
-- Name: table_fffqc_query_files; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE table_fffqc_query_files (
    fffqc_id bigint NOT NULL,
    fffqc_query_files character varying(255)
);


ALTER TABLE public.table_fffqc_query_files OWNER TO postgres;

--
-- Name: table_firstprogram; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE table_firstprogram (
    tagletprocessid bigint NOT NULL,
    inptufilename text NOT NULL,
    outputfolder character varying(255),
    outputprefix character varying(255) NOT NULL,
    processmode character varying(255) NOT NULL,
    projectname character varying(255),
    truncation integer NOT NULL,
    process_id bigint NOT NULL
);


ALTER TABLE public.table_firstprogram OWNER TO postgres;

--
-- Name: table_four_five_four_qc; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE table_four_five_four_qc (
    fffqc_id bigint NOT NULL,
    fffqc_c text,
    fffqc_f text,
    fffqc_l text,
    fffqc_m text,
    fffqc_n text,
    fffqc_o text,
    fffqc_onlystat text,
    ffqc_project_name text,
    fffqc_s text,
    samples text,
    fffqc_t text,
    fffqc_z text,
    processes_process_id bigint
);


ALTER TABLE public.table_four_five_four_qc OWNER TO postgres;

--
-- Name: table_illumina_qc; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE table_illumina_qc (
    illumina_qc_id bigint NOT NULL,
    adapter_files text NOT NULL,
    cpu bigint NOT NULL,
    l character varying(255) NOT NULL,
    left_files text NOT NULL,
    onstat boolean NOT NULL,
    output_dir character varying(255) NOT NULL,
    project_name character varying(255) NOT NULL,
    readlayout character varying(255),
    right_files text NOT NULL,
    s character varying(255) NOT NULL,
    samples text NOT NULL,
    sequence_type character varying(255) NOT NULL,
    single_files text NOT NULL,
    t character varying(255) NOT NULL,
    variants character varying(255) NOT NULL,
    z character varying(255) NOT NULL,
    processes_process_id bigint
);


ALTER TABLE public.table_illumina_qc OWNER TO postgres;

--
-- Name: table_ion; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE table_ion (
    ion_id bigint NOT NULL,
    aa boolean,
    fasta_file character varying(255),
    fastq_file character varying(255),
    filter_sequence character varying(255),
    length character varying(255),
    output character varying(255),
    phred boolean,
    projectname character varying(255),
    qual boolean,
    qual_file character varying(255),
    seq_type character varying(255),
    process_id bigint NOT NULL
);


ALTER TABLE public.table_ion OWNER TO postgres;

--
-- Name: table_processes; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE table_processes (
    process_id bigint NOT NULL,
    process_pid bigint,
    process_next character varying(255),
    process_cmd text,
    process_end_time character varying(255),
    process_log text,
    process_name character varying(255),
    process_start_time character varying(255),
    process_status character varying(255),
    process_type text,
    process_type_id bigint,
    project_name text,
    report_path text,
    report_server_path text,
    user_id bigint
);


ALTER TABLE public.table_processes OWNER TO postgres;

--
-- Name: table_user; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE table_user (
    user_id bigint NOT NULL,
    user_address text NOT NULL,
    user_designation text NOT NULL,
    user_email_id character varying(255) NOT NULL,
    user_institute_name text NOT NULL,
    user_password text NOT NULL,
    user_salt character varying(255) NOT NULL,
    user_dir character varying(255) NOT NULL,
    user_name character varying(255) NOT NULL
);


ALTER TABLE public.table_user OWNER TO postgres;

--
-- Name: table_user_reports; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE table_user_reports (
    user_reports_id bigint NOT NULL,
    date_creation character varying(255) NOT NULL,
    download_link text NOT NULL,
    path_system text NOT NULL,
    process_name character varying(255) NOT NULL,
    project_name character varying(255),
    unique_name_for_multiple_process character varying(255),
    user_id bigint
);


ALTER TABLE public.table_user_reports OWNER TO postgres;

--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('hibernate_sequence', 1, false);


--
-- Data for Name: table_admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY table_admin (admin_id, admin_email, admin_name, admin_password, admin_salt) FROM stdin;
\.


--
-- Data for Name: table_fffqc_query_files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY table_fffqc_query_files (fffqc_id, fffqc_query_files) FROM stdin;
\.


--
-- Data for Name: table_firstprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY table_firstprogram (tagletprocessid, inptufilename, outputfolder, outputprefix, processmode, projectname, truncation, process_id) FROM stdin;
\.


--
-- Data for Name: table_four_five_four_qc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY table_four_five_four_qc (fffqc_id, fffqc_c, fffqc_f, fffqc_l, fffqc_m, fffqc_n, fffqc_o, fffqc_onlystat, ffqc_project_name, fffqc_s, samples, fffqc_t, fffqc_z, processes_process_id) FROM stdin;
\.


--
-- Data for Name: table_illumina_qc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY table_illumina_qc (illumina_qc_id, adapter_files, cpu, l, left_files, onstat, output_dir, project_name, readlayout, right_files, s, samples, sequence_type, single_files, t, variants, z, processes_process_id) FROM stdin;
\.


--
-- Data for Name: table_ion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY table_ion (ion_id, aa, fasta_file, fastq_file, filter_sequence, length, output, phred, projectname, qual, qual_file, seq_type, process_id) FROM stdin;
\.


--
-- Data for Name: table_processes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY table_processes (process_id, process_pid, process_next, process_cmd, process_end_time, process_log, process_name, process_start_time, process_status, process_type, process_type_id, project_name, report_path, report_server_path, user_id) FROM stdin;
\.


--
-- Data for Name: table_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY table_user (user_id, user_address, user_designation, user_email_id, user_institute_name, user_password, user_salt, user_dir, user_name) FROM stdin;
\.


--
-- Data for Name: table_user_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY table_user_reports (user_reports_id, date_creation, download_link, path_system, process_name, project_name, unique_name_for_multiple_process, user_id) FROM stdin;
\.


--
-- Name: table_admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY table_admin
    ADD CONSTRAINT table_admin_pkey PRIMARY KEY (admin_id);


--
-- Name: table_firstprogram_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY table_firstprogram
    ADD CONSTRAINT table_firstprogram_pkey PRIMARY KEY (tagletprocessid);


--
-- Name: table_four_five_four_qc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY table_four_five_four_qc
    ADD CONSTRAINT table_four_five_four_qc_pkey PRIMARY KEY (fffqc_id);


--
-- Name: table_illumina_qc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY table_illumina_qc
    ADD CONSTRAINT table_illumina_qc_pkey PRIMARY KEY (illumina_qc_id);


--
-- Name: table_ion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY table_ion
    ADD CONSTRAINT table_ion_pkey PRIMARY KEY (ion_id);


--
-- Name: table_processes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY table_processes
    ADD CONSTRAINT table_processes_pkey PRIMARY KEY (process_id);


--
-- Name: table_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY table_user
    ADD CONSTRAINT table_user_pkey PRIMARY KEY (user_id);


--
-- Name: table_user_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY table_user_reports
    ADD CONSTRAINT table_user_reports_pkey PRIMARY KEY (user_reports_id);


--
-- Name: uk_fbkygv5pbt68k4n452pxwsdj1; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY table_user
    ADD CONSTRAINT uk_fbkygv5pbt68k4n452pxwsdj1 UNIQUE (user_name);


--
-- Name: fk_4uakl990tyg0gdixk42nubgml; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY table_ion
    ADD CONSTRAINT fk_4uakl990tyg0gdixk42nubgml FOREIGN KEY (process_id) REFERENCES table_processes(process_id);


--
-- Name: fk_87titycyx8f4q2rdy12xeubf5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY table_illumina_qc
    ADD CONSTRAINT fk_87titycyx8f4q2rdy12xeubf5 FOREIGN KEY (processes_process_id) REFERENCES table_processes(process_id);


--
-- Name: fk_dffrdoe4y9bbmndhl4katdy6c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY table_processes
    ADD CONSTRAINT fk_dffrdoe4y9bbmndhl4katdy6c FOREIGN KEY (user_id) REFERENCES table_user(user_id);


--
-- Name: fk_h91ms07hm86twxc5k28abkxnv; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY table_firstprogram
    ADD CONSTRAINT fk_h91ms07hm86twxc5k28abkxnv FOREIGN KEY (process_id) REFERENCES table_processes(process_id);


--
-- Name: fk_i97mwqqsqm5ekdf183mt5emcv; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY table_fffqc_query_files
    ADD CONSTRAINT fk_i97mwqqsqm5ekdf183mt5emcv FOREIGN KEY (fffqc_id) REFERENCES table_four_five_four_qc(fffqc_id);


--
-- Name: fk_kb198iqqxvdshscg3g7oyqvxr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY table_user_reports
    ADD CONSTRAINT fk_kb198iqqxvdshscg3g7oyqvxr FOREIGN KEY (user_id) REFERENCES table_user(user_id);


--
-- Name: fk_qrpr3qjnivpen3d4x4dmd433i; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY table_four_five_four_qc
    ADD CONSTRAINT fk_qrpr3qjnivpen3d4x4dmd433i FOREIGN KEY (processes_process_id) REFERENCES table_processes(process_id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

