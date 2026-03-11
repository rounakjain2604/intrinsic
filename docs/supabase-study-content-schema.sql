-- Topic -> Learning Module -> LOS relational schema
-- Apply this in Supabase SQL Editor when you are ready to move the
-- storage-backed study pipeline into first-class Postgres tables.

create table if not exists topics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists learning_modules (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references topics(id) on delete cascade,
  slug text not null,
  title text not null,
  sort_order integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (topic_id, slug)
);

create table if not exists learning_outcome_statements (
  id uuid primary key default gen_random_uuid(),
  learning_module_id uuid not null references learning_modules(id) on delete cascade,
  slug text not null,
  title text not null,
  source_file_name text,
  source_storage_path text,
  parsed_storage_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (learning_module_id, slug)
);

create table if not exists los_sections (
  id uuid primary key default gen_random_uuid(),
  los_id uuid not null references learning_outcome_statements(id) on delete cascade,
  section_key text not null,
  section_label text not null,
  body_markdown text not null default '',
  sort_order integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (los_id, section_key)
);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists topics_updated_at on topics;
create trigger topics_updated_at
before update on topics
for each row execute function update_updated_at();

drop trigger if exists learning_modules_updated_at on learning_modules;
create trigger learning_modules_updated_at
before update on learning_modules
for each row execute function update_updated_at();

drop trigger if exists learning_outcome_statements_updated_at on learning_outcome_statements;
create trigger learning_outcome_statements_updated_at
before update on learning_outcome_statements
for each row execute function update_updated_at();

drop trigger if exists los_sections_updated_at on los_sections;
create trigger los_sections_updated_at
before update on los_sections
for each row execute function update_updated_at();
