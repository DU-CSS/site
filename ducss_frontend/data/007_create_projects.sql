CREATE SCHEMA IF NOT EXISTS comp AUTHORIZATION doadmin;

-- Create Projects Table in comp
CREATE TABLE comp.projects (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date_submitted timestamptz DEFAULT now() NOT NULL,
    title text NOT NULL,
    overview text NOT NULL,
    repo_link text,
    demo_path text,
    featured boolean
);

-- Create Committee Table in comp
CREATE TABLE comp.project_contributors (
    project_id integer NOT NULL REFERENCES comp.projects(id) ON DELETE CASCADE,
    user_id integer NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, user_id)
);