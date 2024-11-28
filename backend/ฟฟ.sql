BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "users" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"user_name"	text,
	"password"	text,
	"email"	text,
	"profile"	text,
	"profile_background"	text,
	"first_name"	text,
	"last_name"	text,
	"age"	integer,
	"tel"	text,
	"status"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "message_boards" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"pic_news"	text,
	"text_header"	text,
	"describtion_news"	text,
	"user_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_users_message_board" FOREIGN KEY("user_id") REFERENCES "users"("id")
);
CREATE TABLE IF NOT EXISTS "product_types" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name_type"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "memberships" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"package_name"	text,
	"day"	integer,
	"pwa"	integer,
	"pea"	integer,
	"rental_fee"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "stores" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"pic_store"	text,
	"sub_pic_one"	text,
	"sub_pic_two"	text,
	"sub_pic_three"	text,
	"membership_id"	integer,
	"name_store"	text,
	"booking_date"	datetime,
	"last_day"	datetime,
	"describtion_store"	text,
	"status_store"	text,
	"user_id"	integer,
	"product_type_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_users_store" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_memberships_store" FOREIGN KEY("membership_id") REFERENCES "memberships"("id"),
	CONSTRAINT "fk_product_types_store" FOREIGN KEY("product_type_id") REFERENCES "product_types"("id")
);
CREATE TABLE IF NOT EXISTS "payment_stores" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"user_id"	integer,
	"store_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_users_payment_store" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_payment_stores_store" FOREIGN KEY("store_id") REFERENCES "stores"("id")
);
CREATE TABLE IF NOT EXISTS "receipts" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"date_receipt"	datetime,
	"describtion_bill"	text,
	"payment_store_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_payment_stores_receipt" FOREIGN KEY("payment_store_id") REFERENCES "payment_stores"("id")
);
CREATE TABLE IF NOT EXISTS "backup_stores" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"pic_store_backup"	text,
	"pic_one_backup"	text,
	"pic_two_backup"	text,
	"pic_three_backup"	text,
	"membership_backup"	integer,
	"name_backup"	text,
	"booking_backup"	datetime,
	"last_day_backup"	datetime,
	"describtion_store_b"	text,
	"user_id_b"	integer,
	"product_type_id_b"	integer,
	"store_id"	integer,
	CONSTRAINT "fk_stores_backup_store" FOREIGN KEY("store_id") REFERENCES "stores"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "history_stores" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"date_history"	datetime,
	"store_id"	integer,
	"user_id"	integer,
	CONSTRAINT "fk_users_history_store" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_stores_history_store" FOREIGN KEY("store_id") REFERENCES "stores"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "ratings" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"rating"	integer,
	"comment"	text,
	"store_id"	integer,
	"user_id"	integer,
	CONSTRAINT "fk_users_rating" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_stores_rating" FOREIGN KEY("store_id") REFERENCES "stores"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "service_requests" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"location"	text,
	"problem_describtion"	text,
	"request_date"	datetime,
	"status_service"	text,
	"user_id"	integer,
	"store_id"	integer,
	CONSTRAINT "fk_users_service_request" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_stores_service_request" FOREIGN KEY("store_id") REFERENCES "stores"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "history_equipments" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"date_equipment"	datetime,
	"service_request_id"	integer,
	"equipment_id"	integer,
	CONSTRAINT "fk_history_equipments_equipment" FOREIGN KEY("equipment_id") REFERENCES "service_requests"("id"),
	CONSTRAINT "fk_service_requests_history_equipment" FOREIGN KEY("service_request_id") REFERENCES "service_requests"("id"),
	CONSTRAINT "fk_equipment_history_equipment" FOREIGN KEY("equipment_id") REFERENCES "equipment"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "equipment" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name_equipment"	text,
	"category"	text,
	"quantity"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "status_parkings" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"status"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "membership_customers" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"first_name"	text,
	"last_name"	text,
	"dob"	datetime,
	"tel"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "users" VALUES (1,'2024-11-25 02:55:22.3263904+07:00','2024-11-25 02:55:22.3263904+07:00',NULL,'NobpasinTumdee','$2a$14$C2VtwA.zwHJUtzwJgKuyK.kJTzwF81HT5sue3/pndgVU9P79Z4Wum','B6506407@g.sut.ac.th','https://cache-igetweb-v2.mt108.info/uploads/images-cache/12677/product/dd87089fb03608d6fab36fa1204ce286_full.jpg','','Nobpasin','Tumdee',21,'','User');
INSERT INTO "users" VALUES (2,'2024-11-25 02:55:22.3343998+07:00','2024-11-25 02:55:22.3343998+07:00',NULL,'PorGz','$2a$14$C2VtwA.zwHJUtzwJgKuyK.kJTzwF81HT5sue3/pndgVU9P79Z4Wum','PorGz@g.sut.ac.th','','','Por','Gz',21,'','User');
INSERT INTO "product_types" VALUES (1,'2024-11-25 02:55:22.3399192+07:00','2024-11-25 02:55:22.3399192+07:00',NULL,'A');
INSERT INTO "product_types" VALUES (2,'2024-11-25 02:55:22.3494779+07:00','2024-11-25 02:55:22.3494779+07:00',NULL,'B');
INSERT INTO "product_types" VALUES (3,'2024-11-25 02:55:22.3557931+07:00','2024-11-25 02:55:22.3557931+07:00',NULL,'C');
INSERT INTO "product_types" VALUES (4,'2024-11-25 02:55:22.3620818+07:00','2024-11-25 02:55:22.3620818+07:00',NULL,'D');
INSERT INTO "memberships" VALUES (1,'2024-11-25 02:55:22.3687573+07:00','2024-11-25 02:55:22.3687573+07:00',NULL,'Week',7,350,700,1050);
INSERT INTO "memberships" VALUES (2,'2024-11-25 02:55:22.375025+07:00','2024-11-25 02:55:22.375025+07:00',NULL,'Mount',30,1500,3000,3600);
INSERT INTO "memberships" VALUES (3,'2024-11-25 02:55:22.3813121+07:00','2024-11-25 02:55:22.3813121+07:00',NULL,'Year',365,18250,35600,36500);
INSERT INTO "stores" VALUES (1,'2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro1','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (2,'2024-11-25 02:55:22.3937688+07:00','2024-11-25 02:55:22.3937688+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro2','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (3,'2024-11-25 02:55:22.4000693+07:00','2024-11-25 02:55:22.4000693+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro3','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (4,'2024-11-25 02:55:22.4066371+07:00','2024-11-25 02:55:22.4066371+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro4','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (5,'2024-11-25 02:55:22.4131465+07:00','2024-11-25 02:55:22.4131465+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro5','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (6,'2024-11-25 02:55:22.4199668+07:00','2024-11-25 02:55:22.4199668+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro6','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (7,'2024-11-25 02:55:22.4250344+07:00','2024-11-25 02:55:22.4250344+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro7','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (8,'2024-11-25 02:55:22.4322095+07:00','2024-11-25 02:55:22.4322095+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro8','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (9,'2024-11-25 02:55:22.4385139+07:00','2024-11-25 02:55:22.4385139+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro9','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (10,'2024-11-25 02:55:22.4447678+07:00','2024-11-25 02:55:22.4447678+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro10','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (11,'2024-11-25 02:55:22.4579262+07:00','2024-11-25 02:55:22.4579262+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro11','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (12,'2024-11-25 02:55:22.4639264+07:00','2024-11-25 02:55:22.4639264+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro12','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (13,'2024-11-25 02:55:22.4704503+07:00','2024-11-25 02:55:22.4704503+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro13','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (14,'2024-11-25 02:55:22.4765335+07:00','2024-11-25 02:55:22.4765335+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro14','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (15,'2024-11-25 02:55:22.4825976+07:00','2024-11-25 02:55:22.4825976+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro15','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (16,'2024-11-25 02:55:22.4882385+07:00','2024-11-25 02:55:22.4882385+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro16','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (17,'2024-11-25 02:55:22.4944969+07:00','2024-11-25 02:55:22.4944969+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro17','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (18,'2024-11-25 02:55:22.5005323+07:00','2024-11-25 02:55:22.5005323+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro18','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (19,'2024-11-25 02:55:22.5070785+07:00','2024-11-25 02:55:22.5070785+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro19','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (20,'2024-11-25 02:55:22.5131664+07:00','2024-11-25 02:55:22.5131664+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro20','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (21,'2024-11-25 02:55:22.519356+07:00','2024-11-25 02:55:22.519356+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro21','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (22,'2024-11-25 02:55:22.5257319+07:00','2024-11-25 02:55:22.5257319+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro22','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (23,'2024-11-25 02:55:22.5321996+07:00','2024-11-25 02:55:22.5321996+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro23','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (24,'2024-11-25 02:55:22.538737+07:00','2024-11-25 02:55:22.538737+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro24','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (25,'2024-11-25 02:55:22.5449892+07:00','2024-11-25 02:55:22.5449892+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro25','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (26,'2024-11-25 02:55:22.5514742+07:00','2024-11-25 02:55:22.5514742+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro26','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (27,'2024-11-25 02:55:22.55777+07:00','2024-11-25 02:55:22.55777+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro27','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (28,'2024-11-25 02:55:22.5635798+07:00','2024-11-25 02:55:22.5635798+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro28','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (29,'2024-11-25 02:55:22.5699664+07:00','2024-11-25 02:55:22.5699664+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro29','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (30,'2024-11-25 02:55:22.5763775+07:00','2024-11-25 02:55:22.5763775+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro30','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (31,'2024-11-25 02:55:22.582162+07:00','2024-11-25 02:55:22.582162+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro31','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (32,'2024-11-25 02:55:22.588188+07:00','2024-11-25 02:55:22.588188+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro32','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (33,'2024-11-25 02:55:22.5946976+07:00','2024-11-25 02:55:22.5946976+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro33','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (34,'2024-11-25 02:55:22.6005431+07:00','2024-11-25 02:55:22.6005431+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro34','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (35,'2024-11-25 02:55:22.6073899+07:00','2024-11-25 02:55:22.6073899+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro35','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (36,'2024-11-25 02:55:22.614039+07:00','2024-11-25 02:55:22.614039+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro36','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (37,'2024-11-25 02:55:22.6201692+07:00','2024-11-25 02:55:22.6201692+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro37','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (38,'2024-11-25 02:55:22.626053+07:00','2024-11-25 02:55:22.626053+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro38','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (39,'2024-11-25 02:55:22.6324528+07:00','2024-11-25 02:55:22.6324528+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro39','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (40,'2024-11-25 02:55:22.6383793+07:00','2024-11-25 02:55:22.6383793+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro40','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (41,'2024-11-25 02:55:22.6445853+07:00','2024-11-25 02:55:22.6445853+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro41','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (42,'2024-11-25 02:55:22.6506581+07:00','2024-11-25 02:55:22.6506581+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro42','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (43,'2024-11-25 02:55:22.6564856+07:00','2024-11-25 02:55:22.6564856+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro43','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (44,'2024-11-25 02:55:22.6622927+07:00','2024-11-25 02:55:22.6622927+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro44','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (45,'2024-11-25 02:55:22.6686877+07:00','2024-11-25 02:55:22.6686877+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro45','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (46,'2024-11-25 02:55:22.6729735+07:00','2024-11-25 02:55:22.6729735+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro46','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (47,'2024-11-25 02:55:22.6779036+07:00','2024-11-25 02:55:22.6779036+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro47','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (48,'2024-11-25 02:55:22.684786+07:00','2024-11-25 02:55:22.684786+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro48','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (49,'2024-11-25 02:55:22.6926394+07:00','2024-11-25 02:55:22.6926394+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro49','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (50,'2024-11-25 02:55:22.6987116+07:00','2024-11-25 02:55:22.6987116+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro50','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (51,'2024-11-25 02:55:22.7045305+07:00','2024-11-25 02:55:22.7045305+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro51','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (52,'2024-11-25 02:55:22.7108759+07:00','2024-11-25 02:55:22.7108759+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro52','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (53,'2024-11-25 02:55:22.7168471+07:00','2024-11-25 02:55:22.7168471+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro53','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (54,'2024-11-25 02:55:22.7228976+07:00','2024-11-25 02:55:22.7228976+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro54','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (55,'2024-11-25 02:55:22.7292662+07:00','2024-11-25 02:55:22.7292662+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro55','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (56,'2024-11-25 02:55:22.735546+07:00','2024-11-25 02:55:22.735546+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro56','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (57,'2024-11-25 02:55:22.7414782+07:00','2024-11-25 02:55:22.7414782+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro57','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (58,'2024-11-25 02:55:22.7476396+07:00','2024-11-25 02:55:22.7476396+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro58','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (59,'2024-11-25 02:55:22.7540401+07:00','2024-11-25 02:55:22.7540401+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro59','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (60,'2024-11-25 02:55:22.7614938+07:00','2024-11-25 02:55:22.7614938+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro60','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (61,'2024-11-25 02:55:22.7682615+07:00','2024-11-25 02:55:22.7682615+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro61','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (62,'2024-11-25 02:55:22.7749701+07:00','2024-11-25 02:55:22.7749701+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro62','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (63,'2024-11-25 02:55:22.7822931+07:00','2024-11-25 02:55:22.7822931+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro63','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (64,'2024-11-25 02:55:22.7888312+07:00','2024-11-25 02:55:22.7888312+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro64','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (65,'2024-11-25 02:55:22.7956236+07:00','2024-11-25 02:55:22.7956236+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro65','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (66,'2024-11-25 02:55:22.8028012+07:00','2024-11-25 02:55:22.8028012+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro66','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (67,'2024-11-25 02:55:22.8097616+07:00','2024-11-25 02:55:22.8097616+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro67','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (68,'2024-11-25 02:55:22.8170459+07:00','2024-11-25 02:55:22.8170459+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro68','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (69,'2024-11-25 02:55:22.8243054+07:00','2024-11-25 02:55:22.8243054+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro69','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (70,'2024-11-25 02:55:22.8306252+07:00','2024-11-25 02:55:22.8306252+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro70','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (71,'2024-11-25 02:55:22.8369981+07:00','2024-11-25 02:55:22.8369981+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro71','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (72,'2024-11-25 02:55:22.8429318+07:00','2024-11-25 02:55:22.8429318+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro72','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (73,'2024-11-25 02:55:22.8493978+07:00','2024-11-25 02:55:22.8493978+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro73','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (74,'2024-11-25 02:55:22.8554914+07:00','2024-11-25 02:55:22.8554914+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro74','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (75,'2024-11-25 02:55:22.8616047+07:00','2024-11-25 02:55:22.8616047+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro75','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (76,'2024-11-25 02:55:22.8675228+07:00','2024-11-25 02:55:22.8675228+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro76','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (77,'2024-11-25 02:55:22.8739931+07:00','2024-11-25 02:55:22.8739931+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro77','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (78,'2024-11-25 02:55:22.8797973+07:00','2024-11-25 02:55:22.8797973+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro78','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (79,'2024-11-25 02:55:22.8859183+07:00','2024-11-25 02:55:22.8859183+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro79','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (80,'2024-11-25 02:55:22.8920371+07:00','2024-11-25 02:55:22.8920371+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro80','2024-11-25 02:55:22.3875367+07:00','2024-11-25 02:55:22.3875367+07:00','test Test test','inuse',1,4);
INSERT INTO "status_parkings" VALUES (1,'2024-11-25 02:55:22.8984465+07:00','2024-11-25 02:55:22.8984465+07:00',NULL,'Pending');
INSERT INTO "status_parkings" VALUES (2,'2024-11-25 02:55:22.9021744+07:00','2024-11-25 02:55:22.9021744+07:00',NULL,'Paid');
INSERT INTO "status_parkings" VALUES (3,'2024-11-25 02:55:22.910559+07:00','2024-11-25 02:55:22.910559+07:00',NULL,'Expired');
INSERT INTO "status_parkings" VALUES (4,'2024-11-25 02:55:22.9167649+07:00','2024-11-25 02:55:22.9167649+07:00',NULL,'Error');
INSERT INTO "status_parkings" VALUES (5,'2024-11-25 02:55:22.922464+07:00','2024-11-25 02:55:22.922464+07:00',NULL,'Un Used');
INSERT INTO "membership_customers" VALUES (1,'2024-11-25 02:55:22.9289049+07:00','2024-11-25 02:55:22.9289049+07:00',NULL,'Kittisorn','Ngandee','1998-05-23 00:00:00+00:00','0811981663');
INSERT INTO "membership_customers" VALUES (2,'2024-11-25 02:55:22.9350884+07:00','2024-11-25 02:55:22.9350884+07:00',NULL,'Pachnida','Wamakarn','1998-05-24 00:00:00+00:00','0811981664');
INSERT INTO "membership_customers" VALUES (3,'2024-11-25 02:55:22.9415376+07:00','2024-11-25 02:55:22.9415376+07:00',NULL,'Jedsadaporn','Pinjai','1998-05-25 00:00:00+00:00','0811981665');
INSERT INTO "membership_customers" VALUES (4,'2024-11-25 02:55:22.9483474+07:00','2024-11-25 02:55:22.9483474+07:00',NULL,'Tortakul','Subka','1998-05-26 00:00:00+00:00','0811981666');
INSERT INTO "membership_customers" VALUES (5,'2024-11-25 02:55:22.9545519+07:00','2024-11-25 02:55:22.9545519+07:00',NULL,'Jularat','Piangthaisong','1998-05-27 00:00:00+00:00','0811981667');
INSERT INTO "membership_customers" VALUES (6,'2024-11-25 02:55:22.9611089+07:00','2024-11-25 02:55:22.9611089+07:00',NULL,'Nattawut','Srisung','1998-05-28 00:00:00+00:00','0811981668');
INSERT INTO "membership_customers" VALUES (7,'2024-11-25 02:55:22.9677923+07:00','2024-11-25 02:55:22.9677923+07:00',NULL,'Sutthipong','Kittiwattanawong','1998-05-29 00:00:00+00:00','0811981669');
INSERT INTO "membership_customers" VALUES (8,'2024-11-25 02:55:22.9732818+07:00','2024-11-25 02:55:22.9732818+07:00',NULL,'Chayanon','Boonchud','1998-05-30 00:00:00+00:00','0811981670');
INSERT INTO "membership_customers" VALUES (9,'2024-11-25 02:55:22.9764687+07:00','2024-11-25 02:55:22.9764687+07:00',NULL,'Sakda','Rattanawong','1998-05-31 00:00:00+00:00','0811981671');
INSERT INTO "membership_customers" VALUES (10,'2024-11-25 02:55:22.9860512+07:00','2024-11-25 02:55:22.9860512+07:00',NULL,'Narissara','Sutthiwong','1998-06-01 00:00:00+00:00','0811981672');
CREATE INDEX IF NOT EXISTS "idx_users_deleted_at" ON "users" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_message_boards_deleted_at" ON "message_boards" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_product_types_deleted_at" ON "product_types" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_memberships_deleted_at" ON "memberships" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_stores_deleted_at" ON "stores" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_payment_stores_deleted_at" ON "payment_stores" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_receipts_deleted_at" ON "receipts" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_backup_stores_deleted_at" ON "backup_stores" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_history_stores_deleted_at" ON "history_stores" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_ratings_deleted_at" ON "ratings" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_service_requests_deleted_at" ON "service_requests" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_history_equipments_deleted_at" ON "history_equipments" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_equipment_deleted_at" ON "equipment" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_status_parkings_deleted_at" ON "status_parkings" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_membership_customers_deleted_at" ON "membership_customers" (
	"deleted_at"
);
COMMIT;
