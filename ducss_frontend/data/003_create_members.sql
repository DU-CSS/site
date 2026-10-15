-- Create Members Table
CREATE TABLE auth.members (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL UNIQUE
);

-- Copy User Table into Member Table
INSERT INTO auth.members (id, first_name, last_name, email)
OVERRIDING SYSTEM VALUE
SELECT id, first_name, last_name, email
FROM auth.users;

-- Make sure Members Table can't generate conflicting new IDs
SELECT setval(
    pg_get_serial_sequence('auth.members', 'id'),
    COALESCE((SELECT MAX(id) FROM auth.members), 1),
    EXISTS (SELECT 1 FROM auth.members)
);