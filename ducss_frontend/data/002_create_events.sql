CREATE SCHEMA IF NOT EXISTS events AUTHORIZATION doadmin;

-- Event Category Table
CREATE TABLE events.categories (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content text NOT NULL UNIQUE
);

-- Events Table
CREATE TABLE events.events (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL,
    start_date date NOT NULL,
    start_time time NOT NULL,
    end_date date,
    end_time time,
    location text NOT NULL,
    organizer_id integer REFERENCES auth.users(id) ON DELETE SET NULL,
    ticketed boolean NOT NULL DEFAULT FALSE,
    content text,
    banner_path text,
    date_created timestamptz DEFAULT now() NOT NULL,
    date_updated timestamptz DEFAULT now() NOT NULL,
    category_id integer REFERENCES events.categories(id) ON DELETE SET NULL
);

-- Event Attendees Table
CREATE TABLE events.attendees (
    event_id integer NOT NULL REFERENCES events.events(id) ON DELETE CASCADE,
    user_id integer NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    registered_at timestamptz NOT NULL DEFAULT NOW(),
    PRIMARY KEY (event_id, user_id)
);

-- Preset Event Categories
INSERT INTO events.categories (content) VALUES ('Social');
INSERT INTO events.categories (content) VALUES ('Workshop');
INSERT INTO events.categories (content) VALUES ('Competition');
INSERT INTO events.categories (content) VALUES ('Career');
INSERT INTO events.categories (content) VALUES ('Gaming');