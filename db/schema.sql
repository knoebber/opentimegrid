-- Users
create table if not exists users
(
    id              serial
        constraint users_pk
            primary key,
    username        varchar(64) not null,
    email           varchar(255),
    email_confirmed boolean default false not null,
    created_at      timestamp default LOCALTIMESTAMP not null,
    updated_at      timestamp default LOCALTIMESTAMP not null
);

create unique index if not exists users_email_uindex
    on users (email);

create unique index if not exists users_username_uindex
    on users (username);
