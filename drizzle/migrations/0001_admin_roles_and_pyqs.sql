create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles read" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.grant_owner_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if new.email_confirmed_at is not null and lower(new.email) = 'provashmanna10@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end; $$;
create trigger on_auth_user_created_grant_owner after insert on auth.users
for each row execute function public.grant_owner_admin();
create trigger on_auth_user_confirmed_grant_owner after update of email_confirmed_at on auth.users
for each row execute function public.grant_owner_admin();

insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users where lower(email) = 'provashmanna10@gmail.com' and email_confirmed_at is not null
on conflict do nothing;

create table public.pyqs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  course_code text,
  semester text,
  year int,
  file_path text not null,
  file_name text not null,
  uploaded_by uuid not null default auth.uid(),
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.pyqs to authenticated;
grant all on public.pyqs to service_role;
alter table public.pyqs enable row level security;
create policy "signed in read pyqs" on public.pyqs for select to authenticated using (true);
create policy "admin insert pyqs" on public.pyqs for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "admin update pyqs" on public.pyqs for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admin delete pyqs" on public.pyqs for delete to authenticated using (public.has_role(auth.uid(), 'admin'));