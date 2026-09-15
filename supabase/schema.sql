-- Run this migration in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Web Application',
  description text not null default '',
  full_description text not null default '',
  features jsonb not null default '[]'::jsonb,
  technologies jsonb not null default '[]'::jsonb,
  gallery jsonb not null default '[]'::jsonb,
  image_url text,
  live_url text,
  github_url text,
  sort_order integer not null default 0,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.projects add column if not exists full_description text not null default '';
alter table public.projects add column if not exists gallery jsonb not null default '[]'::jsonb;
alter table public.projects add column if not exists featured boolean not null default false;

alter table public.site_content enable row level security;
alter table public.projects enable row level security;

create policy "Published content is public" on public.site_content
  for select using (published = true);
create policy "Published projects are public" on public.projects
  for select using (published = true);

create policy "Admins manage content" on public.site_content
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));
create policy "Admins manage projects" on public.projects
  for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

insert into public.site_content (key, value, published) values
('hero', '{"name":"Mide","title":"Front-end Web Developer · AI & SaaS Builder · Certified Data Analyst","description":"I build modern digital products, AI-powered solutions, and data-driven applications that solve real problems.","primaryCta":"Hire me","secondaryCta":"View My Projects"}', true),
('about', '{"heading":"The person behind the pixels and systems.","location":"Ibadan, Nigeria"}', true),
('contact', '{"email":"Akinolaayomidedamilola@gmail.com","phone":"+2348134349499","location":"Ibadan, Nigeria","availability":"Open to freelance projects, collaborations, and new opportunities."}', true),
('socials', '{"linkedin":"https://linkedin.com/mide-akinola","github":"https://github.com/ayomi34","twitter":"https://x.com"}', true),
('testimonials', '{"heading":"What clients in Nigeria say","description":"Feedback from people and teams I have helped turn ideas into useful digital products.","region":"Nigeria","items":[]}', true),
('services', '{"items":[]}', true),
('footer', '{"brand":"Mide","copyright":"© 2026 Mide. All rights reserved."}', true),
('seo', '{"title":"Mide | Web Developer, AI & SaaS Builder","description":"Modern digital products, AI-powered solutions, and data-driven applications by Mide."}', true)
on conflict (key) do nothing;

insert into storage.buckets (id, name, public) values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "Public media is viewable" on storage.objects
  for select using (bucket_id = 'site-media');
create policy "Admins upload media" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'site-media' and exists (select 1 from public.admin_users where user_id = auth.uid())
  );
create policy "Admins update media" on storage.objects
  for update to authenticated using (
    bucket_id = 'site-media' and exists (select 1 from public.admin_users where user_id = auth.uid())
  );
create policy "Admins delete media" on storage.objects
  for delete to authenticated using (
    bucket_id = 'site-media' and exists (select 1 from public.admin_users where user_id = auth.uid())
  );

-- After creating an auth user, run:
-- insert into public.admin_users (user_id) values ('AUTH_USER_UUID');
