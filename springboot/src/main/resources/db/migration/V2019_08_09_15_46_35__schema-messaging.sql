create table users
(
    id           varchar(64) not null primary key,
    username     varchar(50) not null unique,
    phone        varchar(15) not null unique,
    display_name varchar(50) not null,
    password     varchar(255),
    is_admin     boolean     not null default false
);

create table messages
(
    id           varchar(64) not null primary key,
    from_id      varchar(64) not null,
    to_id        varchar(64) not null,
    message      text,
    created_date datetime    not null default now(),
    seem_date    datetime
);

alter table messages
    add constraint fk_message_from_user_id foreign key (from_id)
        references users (id) on update cascade on delete cascade;

alter table messages
    add constraint fk_message_to_user_id foreign key (to_id)
        references users (id) on update cascade on delete cascade;

insert into users(id, username, phone, display_name, password, is_admin)
values (uuid(), 'dimasm93', '082117323434', 'Dimas Maryanto', '', true),
       (uuid(), 'myusuf', '085212434345', 'Muhamad Yusuf', '', false),
       (uuid(), 'abdul', '085212434342', 'Abdul', '', false),
       (uuid(), 'haris', '085212434346', 'Haris', '', false);
