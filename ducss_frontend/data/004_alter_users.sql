-- Remove current auto gen way to get user id
ALTER TABLE auth.users
ALTER COLUMN id
DROP IDENTITY IF EXISTS;

-- Make user id reference member id instead
ALTER TABLE auth.users
ADD CONSTRAINT users_id_fk_is_members_id
FOREIGN KEY (id)
REFERENCES auth.members(id)
ON DELETE CASCADE;

--Drop columns from User Table
ALTER TABLE auth.users
DROP first_name,
DROP last_name,
DROP email,
DROP role;

-- Members Table
--    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--    first_name text NOT NULL,
--    last_name text NOT NULL,
--    email text NOT NULL UNIQUE

-- Users Table
--    id integer PRIMARY KEY REFERENCES auth.members(id),
--    hash_password text NOT NULL,
--    created_at timestamptz DEFAULT now()