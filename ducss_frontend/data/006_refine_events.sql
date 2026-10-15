-- Make events.events.organizer_id change foreign key source
-- from auth.users to org.members

ALTER TABLE events.events
ALTER COLUMN organizer_id DROP NOT NULL,
DROP CONSTRAINT events_organizer_id_fkey,
ADD CONSTRAINT events_organizer_id_members_fkey
FOREIGN KEY (organizer_id)
REFERENCES org.members(id)
ON DELETE SET NULL;

-- Add events.events.poster_alt
ALTER TABLE events.events
ADD COLUMN poster_alt text;

-- Rename events.events.banner_path to poster_src
ALTER TABLE events.events
RENAME COLUMN banner_path TO poster_src;

-- Change events.categories.content to title
ALTER TABLE events.categories
RENAME COLUMN content TO title;