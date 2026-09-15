# CMS setup

This portfolio uses Supabase for authentication, database content, and project media.

## 1. Create the Supabase project

1. Create a project at https://supabase.com.
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql).
3. Open **Authentication > Users** and create the admin email/password account.
4. Copy that user UUID, then run this in SQL Editor:

```sql
insert into public.admin_users (user_id) values ('YOUR_AUTH_USER_UUID');
```

## 2. Configure the local app

Copy `.env.example` to `.env` and fill in the project values from **Project Settings > API**:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Restart the Vite server after changing `.env`.

## 3. Use the dashboard

Open `/admin` on the site. Sign in with the Supabase admin account.

The dashboard supports:

- Hero, About, Skills, Services, Contact, Social, Footer, and SEO JSON content
- Project creation, editing, deletion, publishing, and display order
- Live demo and GitHub URLs
- Project image uploads to the `site-media` Storage bucket
- Success/error notifications and delete confirmation

Only users added to `public.admin_users` can write content or upload media. Public visitors can read published content and projects through RLS policies.

## Notes

The current public components keep the local portfolio as a fallback when Supabase is not configured. Once the environment variables are present and rows are published, the public profile and Projects section load the CMS data automatically without a rebuild.
