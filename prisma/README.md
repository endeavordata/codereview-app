## Database setup

Using an admin account:

(1) Create two groups, one for data platform -related use, and the other for application-related use.

```
create role data_users;
create role application_users;
```

(2) Similarly, create two schemas mirroring those roles, and add them to the search path:

```
create schema analytics;
create schema application;

set search_path to public,analytics,application;
```

(3) Grant permissions, limiting data users to read-only access for the application database.

```
grant all on schema analytics to group data_users;
grant usage on schema application to group data_users;
grant select on schema application to group data_users;
grant usage on schema information_schema to group data_users;

grant all on schema application to group application_users;
grant all on schema analytics to group application_users;
```

(4) Create production users and add them to appropriate roles

```
create user codereview_app;
grant application_users to codereview_app;

create user hightouch;
grant data_users to hightouch;
```
