-- Create Project Stages Table in comp
CREATE TABLE comp.project_stages (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text UNIQUE NOT NULL
);

-- Add stage_id Column to Projects Table
ALTER TABLE comp.projects
ADD COLUMN stage_id integer DEFAULT 1 -- default 1 'archived'
REFERENCES comp.project_stages(id) ON DELETE SET DEFAULT;

-- Preset Project Stages
INSERT INTO comp.project_stages (title) VALUES ('Archived');
INSERT INTO comp.project_stages (title) VALUES ('Unstaged');
INSERT INTO comp.project_stages (title) VALUES ('Staged');
INSERT INTO comp.project_stages (title) VALUES ('Published');