--
-- PostgreSQL database dump
--

-- Dumped from database version 10.9 (Ubuntu 10.9-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.9 (Ubuntu 10.9-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: blogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blogs (
    id integer NOT NULL,
    title character varying(128) NOT NULL,
    content character varying(128) NOT NULL,
    image_url character varying(128) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.blogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.blogs_id_seq OWNED BY public.blogs.id;


--
-- Name: useraccount; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.useraccount (
    id integer NOT NULL,
    username text NOT NULL,
    email character varying(255),
    password text NOT NULL,
    token text,
    joined_date timestamp without time zone
);


--
-- Name: useraccount_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.useraccount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: useraccount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.useraccount_id_seq OWNED BY public.useraccount.id;


--
-- Name: blogs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs ALTER COLUMN id SET DEFAULT nextval('public.blogs_id_seq'::regclass);


--
-- Name: useraccount id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.useraccount ALTER COLUMN id SET DEFAULT nextval('public.useraccount_id_seq'::regclass);


--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blogs (id, title, content, image_url, created_at, updated_at) FROM stdin;
2	adabnbnbn	dasd	adabnbnbn.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
3	adabnbnbn	dasd	adabnbnbn.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
4	adabnbnbn	dasd	adabnbnbn.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
5	adabnbnbn	dasd	adabnbnbn.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
6	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
7	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
8	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
9	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
10	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
11	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
12	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
13	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
14	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
15	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
16	undefined	dasdadad	undefined.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
17	asdasd	dasdadad	asdasd.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
18	asdasd	dasdadad	asdasd.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
19	eraserheads	dasdadad	eraserheads.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
20	eraserheadssss	dasdadad	eraserheadssss.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
21	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
22	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
23	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
24	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
25	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
26	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
27	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
28	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
29	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
30	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
31	kaliwete	dasdadad	kaliwete.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
32	kaliwete2	dasdadad	kaliwete2.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
33	kaliwete52	dasdadad	kaliwete52.jpeg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
34	cebu	javascript	https://res.cloudinary.com/dwsbpkgvr/image/upload/v1565765343/o7qsl7mmyw8nbqaaho0f.jpg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
35	cebu	javascript	https://res.cloudinary.com/dwsbpkgvr/image/upload/v1565766806/anrvemdxcbwim8m4nspb.jpg	2019-08-14 15:13:27.970909+08	2019-08-14 15:13:27.970909+08
36	cebu	javascript	https://res.cloudinary.com/dwsbpkgvr/image/upload/v1565772050/c8eiviudjaxslauomvgr.jpg	2019-08-14 16:40:50.748545+08	2019-08-14 16:40:50.748545+08
1	spider-man	far from home	https://i.imgur.com/jGGnBKH.jpg	2019-08-14 15:11:28.350849+08	2019-08-14 15:11:41.335189+08
37	cebu	javascript	https://res.cloudinary.com/dwsbpkgvr/image/upload/v1565929573/qxr9vvish9nknnb8xqr8.jpg	2019-08-16 12:26:13.765781+08	2019-08-16 12:26:13.765781+08
38	cebu	javascript	https://res.cloudinary.com/dwsbpkgvr/image/upload/v1566278392/ezen2yes7zq3czcxora8.jpg	2019-08-20 13:19:52.534901+08	2019-08-20 13:19:52.534901+08
39	cebu	javascript	https://res.cloudinary.com/dwsbpkgvr/image/upload/v1566278698/wa3rv4zoj3x94jjyuuz8.jpg	2019-08-20 13:24:59.27396+08	2019-08-20 13:24:59.27396+08
40	cebu	javascript	https://res.cloudinary.com/dwsbpkgvr/image/upload/v1566279972/ct6bqaoqoqs1vmsxvu4w.jpg	2019-08-20 13:46:12.370068+08	2019-08-20 13:46:12.370068+08
\.


--
-- Data for Name: useraccount; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.useraccount (id, username, email, password, token, joined_date) FROM stdin;
1	kangi1	kang@gmail.com	bakang	\N	\N
2		test@gmail	bakang123	\N	\N
3		test@gmail	bakang123	\N	\N
4		test@gmail	bakang123	\N	\N
5		test@gmail	bakang123	\N	\N
6		test@gmail	bakang123	\N	\N
7		test@gmail	bakang123	\N	\N
8		test@gmail	bakang123	\N	\N
9		test@gmail	bakang123	\N	\N
10		test@gmail	bakang123	\N	\N
11		test@gmail	bakang123	\N	\N
12		test@gmail	bakang123	\N	\N
13		test@gmail	bakang123	\N	\N
14		test@gmail	bakang123	\N	\N
15		test@gmail	$2b$10$bVnp4SYolAzvlHg8DgHhyOg7YKQAjRMlHYjG4i3u.q1XPKWAy.Omq	\N	\N
16		test@gmail	$2b$10$/Z1uckKtETtnrcBV3N4.9eJ8LUbJzfAgl7t2XxDRiVKqB.K02yG0i	\N	\N
17		test@gmail	$2b$10$DPJz6gtKbC13cDhYDLRSWO6lx1XjYuMgMG1rO.o07uAtCyoJ72WrW	\N	\N
18		test@gmail	$2b$10$n7jYohDniyqV9tECAzKWKuPIDYELTUdyd30KEEhkrp6qz2oFVLb02	\N	\N
19		test@gmail	$2b$10$jlHOHFRmsxC2BEPjhb0QxehwZ.02do8fyLrietabcH8nkuzca7oWC	\N	\N
20		test@gmail	$2b$10$g30YYVGvOIfCL.sgI1bc.uOcSsccyw7Ac68Krj.Py8s6l69SqpJ9O	\N	\N
21		test@gmail	$2b$10$mzvF80ZFuQIj8Jyd94wYieebXo9PrdhK32cljKsl4SdST8G5nhNS6	\N	\N
22		test@gmail	$2b$10$1okwAB7qpjsqjVT7EqjGm.Q4IWOt4QuD0B.U/6vgVWxYTDUyUE3x6	\N	\N
23		test23@gmail	$2b$10$1EU4IQyH30ix7iD5N2roD.UzILumrFfP4UTsirMpSdREpHvt.dbi6	\N	\N
24		test253@gmail	$2b$10$EemoMh9t0BACKElSDeNmR.D/Pt08r53JeksLoihtWaogAy.WwBQQO	\N	\N
25		kang89@gmail.com	$2b$10$75czD5qvAAYFn70BZf71z.JtDF8Gmn7cRxWRylRZJjx86cJRi1NKC	\N	\N
26		kang895@gmail.com	$2b$12$1EafP.fvg5q11FGVKcESR.JH6ekUdyoTrBNQCwIX.3OGiZu49iFQC	\N	\N
27		test778@gmail	$2b$12$CD18FFHhlNedt2vKJ/fGYOlPu5cmBH9/u4U0RpxxFWUs1LttLuL5C	\N	\N
28		test7789@gmail.com	$2b$12$U4JR0Ofe606YAbH1F3zz/ehOjXqHVKxGNoIZBNmbLRiOW8J.FZ64W	\N	\N
\.


--
-- Name: blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.blogs_id_seq', 40, true);


--
-- Name: useraccount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.useraccount_id_seq', 28, true);


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- Name: useraccount useraccount_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.useraccount
    ADD CONSTRAINT useraccount_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

