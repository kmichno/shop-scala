# --- !Ups

create table "category" (
  "id" integer not null primary key autoincrement,
  "name" varchar not null
);

create table "product" (
  "id" integer not null primary key autoincrement,
  "name" varchar not null,
  "description" text not null,
  category int not null,
  foreign key(category) references category(id)
);

CREATE TABLE "order" (
    "id" integer not null primary key autoincrement,
    "user_id" int
--     foreign key ("userId") references "people"("id")
);

CREATE TABLE "ordered_product" (
    "id" integer not null primary key autoincrement,
    "order_id" integer,
    "product_id" integer,
    "quantity" integer,
    foreign key ("order_id") references "order"("id")
    foreign key ("product_id") references "product"("id")
);

# --- !Downs

drop table "product";
drop table "category";