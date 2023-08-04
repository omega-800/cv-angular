-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;

DROP TABLE IF EXISTS career CASCADE;
DROP TABLE IF EXISTS career_skill CASCADE;
DROP TABLE IF EXISTS project_skill CASCADE;
DROP TABLE IF EXISTS project_author CASCADE;
DROP TABLE IF EXISTS skill CASCADE;
DROP TABLE IF EXISTS skillCategory CASCADE;
DROP TABLE IF EXISTS skillSubCategory CASCADE;
DROP TABLE IF EXISTS knowledge CASCADE;
DROP TABLE IF EXISTS activity CASCADE;
DROP TABLE IF EXISTS ability CASCADE;
DROP TABLE IF EXISTS operatingSystem CASCADE;
DROP TABLE IF EXISTS applicationType CASCADE;
DROP TABLE IF EXISTS applicationCategory CASCADE;
DROP TABLE IF EXISTS application CASCADE;
DROP TABLE IF EXISTS application_operatingSystem CASCADE;
DROP TABLE IF EXISTS project CASCADE;
DROP TABLE IF EXISTS hobby_hobbyCategory CASCADE;
DROP TABLE IF EXISTS hobby CASCADE;
DROP TABLE IF EXISTS hobbyCategory CASCADE;
DROP TABLE IF EXISTS person_country CASCADE;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS personCategory CASCADE;
DROP TABLE IF EXISTS organization CASCADE;
DROP TABLE IF EXISTS school_contactPoint CASCADE;
DROP TABLE IF EXISTS school CASCADE;
DROP TABLE IF EXISTS workplace_contactPoint CASCADE;
DROP TABLE IF EXISTS workplace CASCADE;
DROP TABLE IF EXISTS contactPoint CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS country_language CASCADE;
DROP TABLE IF EXISTS country CASCADE;
DROP TABLE IF EXISTS language CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS skill_skillSubCategory CASCADE;
DROP TABLE IF EXISTS applicationSubCategory CASCADE;
DROP TABLE IF EXISTS projectCategory CASCADE;
DROP TABLE IF EXISTS project_projectCategory CASCADE;
DROP TABLE IF EXISTS client CASCADE;
DROP TABLE IF EXISTS project_client CASCADE;

CREATE TABLE IF NOT EXISTS public.ability
(
    ability_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    thumbnail character varying COLLATE pg_catalog."default",
    image character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default",
    CONSTRAINT ability_pkey PRIMARY KEY (ability_id)
);

CREATE TABLE IF NOT EXISTS public.activity
(
    activity_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    thumbnail character varying COLLATE pg_catalog."default",
    image character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default",
    CONSTRAINT activity_pkey PRIMARY KEY (activity_id)
);

CREATE TABLE IF NOT EXISTS public.address
(
    address_id uuid NOT NULL DEFAULT gen_random_uuid(),
    street character varying COLLATE pg_catalog."default" NOT NULL,
    city character varying COLLATE pg_catalog."default" NOT NULL,
    zip smallint NOT NULL,
    country_id uuid NOT NULL,
    CONSTRAINT address_pkey PRIMARY KEY (address_id)
);

CREATE TABLE IF NOT EXISTS public.application
(
    application_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    thumbnail character varying COLLATE pg_catalog."default",
    image character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default",
    alternatename character varying COLLATE pg_catalog."default",
    alternatename_e character varying COLLATE pg_catalog."default",
    alternatename_r character varying COLLATE pg_catalog."default",
    keywords character varying COLLATE pg_catalog."default",
    keywords_e character varying COLLATE pg_catalog."default",
    keywords_r character varying COLLATE pg_catalog."default",
    version character varying COLLATE pg_catalog."default",
    applicationtype_id uuid,
    CONSTRAINT application_pkey PRIMARY KEY (application_id)
);

CREATE TABLE IF NOT EXISTS public.application_operatingsystem
(
    application_operatingsystem_id uuid NOT NULL DEFAULT gen_random_uuid(),
    operatingsystem_id uuid NOT NULL,
    application_id uuid NOT NULL,
    CONSTRAINT application_operatingsystem_pkey PRIMARY KEY (application_operatingsystem_id)
);

CREATE TABLE IF NOT EXISTS public.applicationtype
(
    applicationtype_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    CONSTRAINT applicationtype_pkey PRIMARY KEY (applicationtype_id)
);

CREATE TABLE IF NOT EXISTS public.career
(
    career_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default",
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    datefrom date NOT NULL,
    dateto date NOT NULL,
    pensum smallint NOT NULL,
    document character varying COLLATE pg_catalog."default",
    workplace_id uuid,
    school_id uuid,
    CONSTRAINT career_pkey PRIMARY KEY (career_id)
);

CREATE TABLE IF NOT EXISTS public.career_skill
(
    career_skill_id uuid NOT NULL DEFAULT gen_random_uuid(),
    skill_id uuid NOT NULL,
    career_id uuid NOT NULL,
    percent smallint NOT NULL,
    CONSTRAINT career_skill_pkey PRIMARY KEY (career_skill_id)
);

CREATE TABLE IF NOT EXISTS public.client
(
    client_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT client_pkey PRIMARY KEY (client_id)
);

CREATE TABLE IF NOT EXISTS public.contactpoint
(
    contactpoint_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    phone integer,
    email character varying COLLATE pg_catalog."default",
    CONSTRAINT contactpoint_pkey PRIMARY KEY (contactpoint_id)
);

CREATE TABLE IF NOT EXISTS public.country
(
    country_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    shortname character varying COLLATE pg_catalog."default",
    CONSTRAINT country_pkey PRIMARY KEY (country_id)
);

CREATE TABLE IF NOT EXISTS public.country_language
(
    country_language_id uuid NOT NULL DEFAULT gen_random_uuid(),
    language_id uuid NOT NULL,
    country_id uuid NOT NULL,
    CONSTRAINT country_language_pkey PRIMARY KEY (country_language_id)
);

CREATE TABLE IF NOT EXISTS public.knowledge
(
    knowledge_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    thumbnail character varying COLLATE pg_catalog."default",
    image character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default",
    CONSTRAINT knowledge_pkey PRIMARY KEY (knowledge_id)
);

CREATE TABLE IF NOT EXISTS public.language
(
    language_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    thumbnail character varying COLLATE pg_catalog."default",
    image character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default",
    shortname character varying COLLATE pg_catalog."default",
    CONSTRAINT language_pkey PRIMARY KEY (language_id)
);

CREATE TABLE IF NOT EXISTS public.operatingsystem
(
    operatingsystem_id uuid NOT NULL DEFAULT gen_random_uuid(),
    url character varying COLLATE pg_catalog."default",
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    CONSTRAINT operatingsystem_pkey PRIMARY KEY (operatingsystem_id)
);

CREATE TABLE IF NOT EXISTS public.person
(
    person_id uuid NOT NULL DEFAULT gen_random_uuid(),
    firstname character varying COLLATE pg_catalog."default" NOT NULL,
    lastname character varying COLLATE pg_catalog."default" NOT NULL,
    birthdate timestamp,
    birthplace character varying COLLATE pg_catalog."default",
    jobtitle character varying COLLATE pg_catalog."default",
    jobtitle_e character varying COLLATE pg_catalog."default",
    jobtitle_r character varying COLLATE pg_catalog."default",
    gender character(1) COLLATE pg_catalog."default",
    image character varying COLLATE pg_catalog."default",
    thumbnail character varying COLLATE pg_catalog."default",
    relation character varying COLLATE pg_catalog."default",
    relation_e character varying COLLATE pg_catalog."default",
    relation_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    github character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default",
    address_id uuid,
    workplace_id uuid,
    school_id uuid,
    personcategory_id uuid,
    contactpoint_id uuid,
    CONSTRAINT person_pkey PRIMARY KEY (person_id)
);

CREATE TABLE IF NOT EXISTS public.person_country
(
    person_country uuid NOT NULL DEFAULT gen_random_uuid(),
    person_id uuid,
    country_id uuid,
    CONSTRAINT person_country_pkey PRIMARY KEY (person_country)
);

CREATE TABLE IF NOT EXISTS public.personcategory
(
    personcategory_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    CONSTRAINT personcategory_pkey PRIMARY KEY (personcategory_id)
);

CREATE TABLE IF NOT EXISTS public.project
(
    project_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default" NOT NULL,
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default",
    thumbnail character varying COLLATE pg_catalog."default",
    image character varying COLLATE pg_catalog."default",
    github character varying COLLATE pg_catalog."default",
    date date,
    relevance_it smallint,
    relevance_education smallint,
    relevance_art smallint,
    relevance_health smallint,
    client_id uuid,
    career_id uuid,
    CONSTRAINT project_pkey PRIMARY KEY (project_id)
);

CREATE TABLE IF NOT EXISTS public.project_author
(
    project_author_id uuid NOT NULL DEFAULT gen_random_uuid(),
    project_id uuid NOT NULL,
    author_id uuid NOT NULL,
    CONSTRAINT project_author_pkey PRIMARY KEY (project_author_id)
);

CREATE TABLE IF NOT EXISTS public.project_client
(
    project_client_id uuid NOT NULL DEFAULT gen_random_uuid(),
    project_id uuid NOT NULL,
    client_id uuid NOT NULL,
    CONSTRAINT project_client_pkey PRIMARY KEY (project_client_id)
);

CREATE TABLE IF NOT EXISTS public.project_skill
(
    project_skill_id uuid NOT NULL DEFAULT gen_random_uuid(),
    project_id uuid NOT NULL,
    skill_id uuid NOT NULL,
    CONSTRAINT project_skill_pkey PRIMARY KEY (project_skill_id)
);

CREATE TABLE IF NOT EXISTS public.school
(
    school_id uuid NOT NULL DEFAULT gen_random_uuid(),
    type character varying COLLATE pg_catalog."default",
    type_e character varying COLLATE pg_catalog."default",
    type_d character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    name character varying COLLATE pg_catalog."default",
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default",
    logo character varying COLLATE pg_catalog."default",
    image character varying COLLATE pg_catalog."default",
    address_id uuid NOT NULL,
    CONSTRAINT school_pkey PRIMARY KEY (school_id)
);

CREATE TABLE IF NOT EXISTS public.school_contactpoint
(
    school_contactpoint_id uuid NOT NULL DEFAULT gen_random_uuid(),
    contactpoint_id uuid NOT NULL,
    school_id uuid NOT NULL,
    CONSTRAINT school_contactpoint_pkey PRIMARY KEY (school_contactpoint_id)
);

CREATE TABLE IF NOT EXISTS public.skill
(
    skill_id uuid NOT NULL DEFAULT gen_random_uuid(),
    identifier character varying COLLATE pg_catalog."default" NOT NULL,
    hobby boolean NOT NULL,
    knowledgepercent smallint NOT NULL,
    proficiencylevel character varying COLLATE pg_catalog."default",
    proficiencylevel_e character varying COLLATE pg_catalog."default",
    proficiencylevel_r character varying COLLATE pg_catalog."default",
    yearsofexperience smallint,
    application_id uuid,
    language_id uuid,
    knowledge_id uuid,
    activity_id uuid,
    ability_id uuid,
    CONSTRAINT skill_pkey PRIMARY KEY (skill_id)
);

CREATE TABLE IF NOT EXISTS public.skill_skillsubcategory
(
    skill_skillsubcategory_id uuid NOT NULL DEFAULT gen_random_uuid(),
    skillsubcategory_id uuid NOT NULL,
    skill_id uuid NOT NULL,
    CONSTRAINT skill_skillsubcategory_pkey PRIMARY KEY (skill_skillsubcategory_id)
);

CREATE TABLE IF NOT EXISTS public.skillcategory
(
    skillcategory_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    percent smallint NOT NULL,
    CONSTRAINT skillcategory_pkey PRIMARY KEY (skillcategory_id)
);

CREATE TABLE IF NOT EXISTS public.skillsubcategory
(
    skillsubcategory_id uuid NOT NULL DEFAULT gen_random_uuid(),
    skillcategory_id uuid NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    CONSTRAINT skillsubcategory_pkey PRIMARY KEY (skillsubcategory_id)
);

CREATE TABLE IF NOT EXISTS public.workplace
(
    workplace_id uuid NOT NULL DEFAULT gen_random_uuid(),
    legalname character varying COLLATE pg_catalog."default",
    foundingdate date,
    founder character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    description_e character varying COLLATE pg_catalog."default",
    description_r character varying COLLATE pg_catalog."default",
    name character varying COLLATE pg_catalog."default",
    name_e character varying COLLATE pg_catalog."default",
    name_r character varying COLLATE pg_catalog."default",
    url character varying COLLATE pg_catalog."default",
    logo character varying COLLATE pg_catalog."default",
    image character varying COLLATE pg_catalog."default",
    address_id uuid NOT NULL,
    CONSTRAINT workplace_pkey PRIMARY KEY (workplace_id)
);

CREATE TABLE IF NOT EXISTS public.workplace_contactpoint
(
    workplace_contactpoint_id uuid NOT NULL DEFAULT gen_random_uuid(),
    contactpoint_id uuid NOT NULL,
    workplace_id uuid NOT NULL,
    CONSTRAINT workplace_contactpoint_pkey PRIMARY KEY (workplace_contactpoint_id)
);

ALTER TABLE IF EXISTS public.address
    ADD CONSTRAINT address_country_id_fkey FOREIGN KEY (country_id)
    REFERENCES public.country (country_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.application
    ADD CONSTRAINT application_applicationtype_id_fkey FOREIGN KEY (applicationtype_id)
    REFERENCES public.applicationtype (applicationtype_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.application_operatingsystem
    ADD CONSTRAINT application_operatingsystem_application_id_fkey FOREIGN KEY (application_id)
    REFERENCES public.application (application_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.application_operatingsystem
    ADD CONSTRAINT application_operatingsystem_operatingsystem_id_fkey FOREIGN KEY (operatingsystem_id)
    REFERENCES public.operatingsystem (operatingsystem_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.career
    ADD CONSTRAINT career_school_id_fkey FOREIGN KEY (school_id)
    REFERENCES public.school (school_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.career
    ADD CONSTRAINT career_workplace_id_fkey FOREIGN KEY (workplace_id)
    REFERENCES public.workplace (workplace_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.career_skill
    ADD CONSTRAINT career_skill_career_id_fkey FOREIGN KEY (career_id)
    REFERENCES public.career (career_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.career_skill
    ADD CONSTRAINT career_skill_skill_id_fkey FOREIGN KEY (skill_id)
    REFERENCES public.skill (skill_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.country_language
    ADD CONSTRAINT country_language_country_id_fkey FOREIGN KEY (country_id)
    REFERENCES public.country (country_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.country_language
    ADD CONSTRAINT country_language_language_id_fkey FOREIGN KEY (language_id)
    REFERENCES public.language (language_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.person
    ADD CONSTRAINT person_address_id_fkey FOREIGN KEY (address_id)
    REFERENCES public.address (address_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.person
    ADD CONSTRAINT person_contactpoint_id_fkey FOREIGN KEY (contactpoint_id)
    REFERENCES public.contactpoint (contactpoint_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.person
    ADD CONSTRAINT person_personcategory_id_fkey FOREIGN KEY (personcategory_id)
    REFERENCES public.personcategory (personcategory_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.person
    ADD CONSTRAINT person_school_id_fkey FOREIGN KEY (school_id)
    REFERENCES public.school (school_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.person
    ADD CONSTRAINT person_workplace_id_fkey FOREIGN KEY (workplace_id)
    REFERENCES public.workplace (workplace_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.person_country
    ADD CONSTRAINT person_country_country_id_fkey FOREIGN KEY (country_id)
    REFERENCES public.country (country_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.person_country
    ADD CONSTRAINT person_country_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES public.person (person_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.project
    ADD CONSTRAINT project_career_id_fkey FOREIGN KEY (career_id)
    REFERENCES public.career (career_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.project
    ADD CONSTRAINT project_client_id_fkey FOREIGN KEY (client_id)
    REFERENCES public.person (person_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.project_author
    ADD CONSTRAINT project_author_author_id_fkey FOREIGN KEY (author_id)
    REFERENCES public.person (person_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.project_author
    ADD CONSTRAINT project_author_project_id_fkey FOREIGN KEY (project_id)
    REFERENCES public.project (project_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.project_client
    ADD CONSTRAINT project_client_client_id_fkey FOREIGN KEY (client_id)
    REFERENCES public.client (client_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.project_client
    ADD CONSTRAINT project_client_project_id_fkey FOREIGN KEY (project_id)
    REFERENCES public.project (project_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.project_skill
    ADD CONSTRAINT project_skill_project_id_fkey FOREIGN KEY (project_id)
    REFERENCES public.project (project_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.project_skill
    ADD CONSTRAINT project_skill_skill_id_fkey FOREIGN KEY (skill_id)
    REFERENCES public.skill (skill_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.school
    ADD CONSTRAINT school_address_id_fkey FOREIGN KEY (address_id)
    REFERENCES public.address (address_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.school_contactpoint
    ADD CONSTRAINT school_contactpoint_contactpoint_id_fkey FOREIGN KEY (contactpoint_id)
    REFERENCES public.contactpoint (contactpoint_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.school_contactpoint
    ADD CONSTRAINT school_contactpoint_school_id_fkey FOREIGN KEY (school_id)
    REFERENCES public.school (school_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.skill
    ADD CONSTRAINT skill_ability_id_fkey FOREIGN KEY (ability_id)
    REFERENCES public.ability (ability_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.skill
    ADD CONSTRAINT skill_activity_id_fkey FOREIGN KEY (activity_id)
    REFERENCES public.activity (activity_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.skill
    ADD CONSTRAINT skill_application_id_fkey FOREIGN KEY (application_id)
    REFERENCES public.application (application_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.skill
    ADD CONSTRAINT skill_knowledge_id_fkey FOREIGN KEY (knowledge_id)
    REFERENCES public.knowledge (knowledge_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.skill
    ADD CONSTRAINT skill_language_id_fkey FOREIGN KEY (language_id)
    REFERENCES public.language (language_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.skill_skillsubcategory
    ADD CONSTRAINT skill_skillsubcategory_skill_id_fkey FOREIGN KEY (skill_id)
    REFERENCES public.skill (skill_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.skill_skillsubcategory
    ADD CONSTRAINT skill_skillsubcategory_skillsubcategory_id_fkey FOREIGN KEY (skillsubcategory_id)
    REFERENCES public.skillsubcategory (skillsubcategory_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.skillsubcategory
    ADD CONSTRAINT skillsubcategory_skillcategory_id_fkey FOREIGN KEY (skillcategory_id)
    REFERENCES public.skillcategory (skillcategory_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.workplace
    ADD CONSTRAINT workplace_address_id_fkey FOREIGN KEY (address_id)
    REFERENCES public.address (address_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.workplace_contactpoint
    ADD CONSTRAINT workplace_contactpoint_contactpoint_id_fkey FOREIGN KEY (contactpoint_id)
    REFERENCES public.contactpoint (contactpoint_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.workplace_contactpoint
    ADD CONSTRAINT workplace_contactpoint_workplace_id_fkey FOREIGN KEY (workplace_id)
    REFERENCES public.workplace (workplace_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;