CREATE SCHEMA IF NOT EXISTS auth AUTHORIZATION postgres;

CREATE EXTENSION IF NOT EXISTS ltree;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Users Table
CREATE TABLE auth.users (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name text,
    last_name text,
    email text NOT NULL UNIQUE,
    hash_password text NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    role text CHECK (role IN ('member', 'committee')) NOT NULL
);

-- Sessions Table controls the logged-in user and their cookies
CREATE TABLE auth.sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id integer NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date_created timestamptz DEFAULT now() NOT NULL,
    last_active timestamptz DEFAULT now() NOT NULL,
    date_expired timestamptz DEFAULT (now() + interval '8 hour')
);

-- Password Resets Table
CREATE TABLE auth.password_resets (
    session_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id integer NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date_requested timestamptz DEFAULT now() NOT NULL,
    completed boolean NOT NULL DEFAULT false
);
