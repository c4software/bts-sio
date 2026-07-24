create table video
(
    id      int auto_increment,
    name    text        null,
    videoId varchar(30) null,
    constraint video_id_uindex unique (id)
);

alter table video
    add primary key (id);