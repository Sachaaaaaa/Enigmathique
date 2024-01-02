CREATE TABLE PROFESSOR (
  id serial PRIMARY KEY,
  lastname varchar NOT NULL,
  firstname varchar NOT NULL,
  mail varchar NOT NULL UNIQUE,
  password varchar NOT NULL,
  date_created date NOT NULL DEFAULT CURRENT_DATE,
  date_updated date NOT NULL DEFAULT CURRENT_DATE
);