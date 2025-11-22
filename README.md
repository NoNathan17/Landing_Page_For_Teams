# Team Landing Page Starter (Chakra + Neon + Axios)

## Quick start
1. Add your Neon connection string to `server/.env`:
   ```
   DATABASE_URL=postgresql://USER:PASSWORD@HOST/neondb?sslmode=require
   PORT=4000
   ```

2. Install deps from root:
   ```
   yarn
   ```

3. Run BOTH client + server with one command:
   ```
   yarn dev
   ```

Client: http://localhost:5173  
Server: http://localhost:4000

---

## Database setup (run on Neon)

Create schema + tables:

```sql
CREATE SCHEMA IF NOT EXISTS "Members";

CREATE TABLE IF NOT EXISTS "Members".roles (
  role_id   SERIAL PRIMARY KEY,
  role_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "Members".teams (
  team_id     SERIAL PRIMARY KEY,
  team_name   TEXT UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS "Members".members (
  member_id     SERIAL PRIMARY KEY,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  pronouns      TEXT,
  email         TEXT UNIQUE NOT NULL,
  phone_number  TEXT,
  year_of_study VARCHAR
);

CREATE TABLE IF NOT EXISTS "Members".member_team_roles (
  member_id INTEGER NOT NULL REFERENCES "Members".members(member_id) ON DELETE CASCADE,
  team_id   INTEGER NOT NULL REFERENCES "Members".teams(team_id) ON DELETE CASCADE,
  role_id   INTEGER NOT NULL REFERENCES "Members".roles(role_id),
  PRIMARY KEY (member_id, team_id)
);
```

Seed roles + example team/members (edit to your team):

```sql
INSERT INTO "Members".roles (role_name) VALUES
  ('Tech Lead'),
  ('Designer'),
  ('Developer')
ON CONFLICT (role_name) DO NOTHING;

INSERT INTO "Members".teams (team_name, description)
VALUES
  ('Team Polaris', 'We build tools that help students coordinate club events.')
ON CONFLICT (team_name) DO NOTHING;

INSERT INTO "Members".members
(first_name, last_name, pronouns, email, phone_number, year_of_study)
VALUES
  ('Avery', 'Nguyen', 'she/her', 'avery@uci.edu', NULL, '3rd year'),
  ('Jordan', 'Kim', 'he/him', 'jkim@uci.edu', NULL, '2nd year'),
  ('Sam', 'Patel', 'they/them', 'spatel@uci.edu', NULL, '4th year')
ON CONFLICT (email) DO NOTHING;

-- Link members to roles:
INSERT INTO "Members".member_team_roles (member_id, team_id, role_id)
SELECT m.member_id, t.team_id, r.role_id
FROM "Members".members m, "Members".teams t, "Members".roles r
WHERE m.email = 'avery@uci.edu'
  AND t.team_name = 'Team Polaris'
  AND r.role_name = 'Tech Lead'
ON CONFLICT DO NOTHING;

INSERT INTO "Members".member_team_roles (member_id, team_id, role_id)
SELECT m.member_id, t.team_id, r.role_id
FROM "Members".members m, "Members".teams t, "Members".roles r
WHERE m.email = 'jkim@uci.edu'
  AND t.team_name = 'Team Polaris'
  AND r.role_name = 'Designer'
ON CONFLICT DO NOTHING;

INSERT INTO "Members".member_team_roles (member_id, team_id, role_id)
SELECT m.member_id, t.team_id, r.role_id
FROM "Members".members m, "Members".teams t, "Members".roles r
WHERE m.email = 'spatel@uci.edu'
  AND t.team_name = 'Team Polaris'
  AND r.role_name = 'Developer'
ON CONFLICT DO NOTHING;
```

---

## Assignment requirements
Build a single-page landing site with:
- Hero section (team name + CTA)
- About section (mission)
- Project + Goals section
- 3 role sections with member cards:
  - Tech Leads
  - Designers
  - Developers
- Footer

Data must come from Neon via Axios call to `/api/team/<team-name>`.