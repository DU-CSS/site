-- Make new org(anization) schema for society organization (members, committee, committee roles, etc.)
CREATE SCHEMA IF NOT EXISTS org AUTHORIZATION doadmin;

-- Move members from auth schema to org(anization)
ALTER TABLE auth.members
SET SCHEMA org;

-- Create Committee Roles Table in org
CREATE TABLE org.committee_roles (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text UNIQUE NOT NULL,
    executive boolean NOT NULL DEFAULT FALSE
);

-- Create Committee Table in org
CREATE TABLE org.committee (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id integer NOT NULL REFERENCES org.members(id),
    role_id integer NOT NULL REFERENCES org.committee_roles(id),
    start_year integer NOT NULL,
    end_year integer NOT NULL
);