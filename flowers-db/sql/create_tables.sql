create sequence user_id_seq
    as integer;

create table if not exists users
(
    id         integer                  default nextval('user_id_seq'::regclass) not null
    constraint user_pk
    primary key,
    login      varchar(32)                                                       not null,
    password   char(60)                                                          not null,
    name       varchar(60)                                                       not null,
    created_at timestamp with time zone default now()                            not null,
    email      varchar(320)                                                      not null
    );

alter sequence user_id_seq owned by users.id;

create unique index if not exists user_login_uindex
    on users (login);

create table if not exists greenhouses
(
    id         serial
    constraint greenhouses_pk
    primary key,
    created_at timestamp with time zone default now() not null
    );

create table if not exists roles
(
    id   serial
    constraint roles_pk
    primary key,
    role varchar(30) not null
    );

create table if not exists collection
(
    id              serial
    constraint collection_pk
    primary key,
    id_user         integer     not null
    constraint collection_users_id_fk
    references users
    on update cascade on delete cascade,
    id_greenhouse   integer     not null
    constraint collection_greenhouses_id_fk
    references greenhouses
    on update cascade on delete cascade,
    greenhouse_name varchar(50) not null,
    id_role         integer     not null
    constraint collection_roles_id_fk
    references roles
    on update restrict on delete restrict
    );

create unique index if not exists roles_role_uindex
    on roles (role);

create table if not exists plants_groups
(
    id      serial
    constraint plants_groups_pk
    primary key,
    "group" varchar(80) not null
    );

create table if not exists plants_species
(
    id              serial
    constraint plants_species_pk
    primary key,
    species         varchar(80) not null,
    id_plants_group integer     not null
    constraint plants_species_plants_groups_id_fk
    references plants_groups,
    water_interval  interval    not null
    );

create table if not exists plants
(
    id            serial
    constraint plants_pk
    primary key,
    id_species    integer                                not null
    constraint plants_plants_species_id_fk
    references plants_species,
    name          varchar(50)                            not null,
    created_at    timestamp with time zone default now() not null,
    id_greenhouse integer                                not null
    constraint plants_greenhouses_id_fk
    references greenhouses,
    last_water    timestamp with time zone default now() not null
    );

create unique index if not exists plants_species_species_uindex
    on plants_species (species);

create unique index if not exists plants_groups_group_uindex
    on plants_groups ("group");
