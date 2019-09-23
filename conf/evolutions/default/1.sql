# --- !Ups

-- Tabela: category
CREATE TABLE "category" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT NOT NULL
);

-- Tabela: order
CREATE TABLE "order" (id integer NOT NULL PRIMARY KEY AUTOINCREMENT, user_id int, address STRING, amount INTEGER);

-- Tabela: ordered_product
CREATE TABLE "ordered_product" (
    "id" integer not null primary key autoincrement,
    "order_id" integer,
    "product_id" integer,
    "quantity" integer,
    foreign key ("order_id") references "order"("id")
    foreign key ("product_id") references "product"("id")
);

-- Tabela: product
CREATE TABLE "product" (
	"id"	integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	varchar NOT NULL,
	"description"	TEXT NOT NULL,
	"category"	int NOT NULL,
	"price"	INTEGER NOT NULL,
	FOREIGN KEY("category") REFERENCES "category"("id")
);

-- Tabela: user
CREATE TABLE user (id INTEGER PRIMARY KEY, name VARCHAR, surname VARCHAR, email VARCHAR, idProvider VARCHAR);

# --- !Downs

drop table "product";
drop table "category";
drop table "order";
drop table "ordered_product";
drop table "user";