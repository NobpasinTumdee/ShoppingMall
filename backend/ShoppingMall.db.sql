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
	CONSTRAINT "fk_product_types_store" FOREIGN KEY("product_type_id") REFERENCES "product_types"("id"),
	CONSTRAINT "fk_memberships_store" FOREIGN KEY("membership_id") REFERENCES "memberships"("id")
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
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_stores_backup_store" FOREIGN KEY("store_id") REFERENCES "stores"("id")
);
CREATE TABLE IF NOT EXISTS "history_stores" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"date_history"	datetime,
	"store_id"	integer,
	"user_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_stores_history_store" FOREIGN KEY("store_id") REFERENCES "stores"("id"),
	CONSTRAINT "fk_users_history_store" FOREIGN KEY("user_id") REFERENCES "users"("id")
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
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_stores_rating" FOREIGN KEY("store_id") REFERENCES "stores"("id"),
	CONSTRAINT "fk_users_rating" FOREIGN KEY("user_id") REFERENCES "users"("id")
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
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_stores_service_request" FOREIGN KEY("store_id") REFERENCES "stores"("id"),
	CONSTRAINT "fk_users_service_request" FOREIGN KEY("user_id") REFERENCES "users"("id")
);
CREATE TABLE IF NOT EXISTS "history_equipments" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"date_equipment"	datetime,
	"service_request_id"	integer,
	"equipment_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_history_equipments_equipment" FOREIGN KEY("equipment_id") REFERENCES "service_requests"("id"),
	CONSTRAINT "fk_service_requests_history_equipment" FOREIGN KEY("service_request_id") REFERENCES "service_requests"("id"),
	CONSTRAINT "fk_equipment_history_equipment" FOREIGN KEY("equipment_id") REFERENCES "equipment"("id")
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
CREATE TABLE IF NOT EXISTS "parking_cards" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"expiry_date"	datetime,
	"store_id"	integer,
	"status_parking_id"	integer,
	"membership_customer_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_parking_cards_store" FOREIGN KEY("store_id") REFERENCES "stores"("id"),
	CONSTRAINT "fk_status_parkings_parking_cards" FOREIGN KEY("status_parking_id") REFERENCES "status_parkings"("id"),
	CONSTRAINT "fk_parking_cards_membership_customer" FOREIGN KEY("membership_customer_id") REFERENCES "membership_customers"("id")
);
CREATE TABLE IF NOT EXISTS "parking_card_zones" (
	"parking_card_id"	integer,
	"parking_zone_id"	integer,
	"type_card"	text,
	"created_at"	datetime,
	"deleted_at"	datetime,
	PRIMARY KEY("parking_card_id","parking_zone_id")
);
CREATE TABLE IF NOT EXISTS "history_memberships" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"issue_date"	datetime,
	"expiry_date"	datetime,
	"membership_customer_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_membership_customers_history_membership" FOREIGN KEY("membership_customer_id") REFERENCES "membership_customers"("id")
);
CREATE TABLE IF NOT EXISTS "parking_zones" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"capacity"	integer,
	"available_zone"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "parking_fee_policies" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"free_hours"	real,
	"add_base_fee"	real,
	"time_increment"	datetime,
	"discount"	real,
	"lost_card"	real,
	"is_exempt"	numeric,
	"parking_card_zone_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_parking_fee_policies_parking_card_zone" FOREIGN KEY("parking_card_zone_id") REFERENCES "parking_card_zones"("parking_card_id")
);
CREATE TABLE IF NOT EXISTS "usage_cards" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"entry_time"	datetime,
	"exit_time"	datetime,
	"hourly_rate"	datetime,
	"fee"	real,
	"license_no"	text,
	"user_id"	integer,
	"parking_card_id"	integer,
	"parking_fee_policy_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_parking_cards_usage_card" FOREIGN KEY("parking_card_id") REFERENCES "parking_cards"("id"),
	CONSTRAINT "fk_users_usage_card" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_parking_fee_policies_usage_card" FOREIGN KEY("parking_fee_policy_id") REFERENCES "parking_fee_policies"("id")
);
CREATE TABLE IF NOT EXISTS "parking_payments" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"tax_id"	text,
	"payment_date"	datetime,
	"is_lost_card"	numeric,
	"is_paid"	numeric,
	"is_cash"	numeric,
	"usage_card_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_usage_cards_parking_payment" FOREIGN KEY("usage_card_id") REFERENCES "usage_cards"("id")
);
INSERT INTO "users" VALUES (1,'2024-11-25 01:20:30.838961+07:00','2024-11-25 01:20:30.838961+07:00',NULL,'NobpasinTumdee','$2a$14$XqQJ0SLWo4kufJt2KNl7eegl9l7U/QXvSghWw9ZYULSdDA0R.A8rK','B6506407@g.sut.ac.th','https://cache-igetweb-v2.mt108.info/uploads/images-cache/12677/product/dd87089fb03608d6fab36fa1204ce286_full.jpg','','Nobpasin','Tumdee',21,'','User');
INSERT INTO "users" VALUES (2,'2024-11-25 01:20:30.838961+07:00','2024-11-25 01:20:30.838961+07:00',NULL,'PorGz','$2a$14$XqQJ0SLWo4kufJt2KNl7eegl9l7U/QXvSghWw9ZYULSdDA0R.A8rK','PorGz@g.sut.ac.th','','','Por','Gz',21,'','User');
INSERT INTO "product_types" VALUES (1,'2024-11-25 01:20:30.8489671+07:00','2024-11-25 01:20:30.8489671+07:00',NULL,'A');
INSERT INTO "product_types" VALUES (2,'2024-11-25 01:20:30.8494848+07:00','2024-11-25 01:20:30.8494848+07:00',NULL,'B');
INSERT INTO "product_types" VALUES (3,'2024-11-25 01:20:30.8494848+07:00','2024-11-25 01:20:30.8494848+07:00',NULL,'C');
INSERT INTO "product_types" VALUES (4,'2024-11-25 01:20:30.8597305+07:00','2024-11-25 01:20:30.8597305+07:00',NULL,'D');
INSERT INTO "memberships" VALUES (1,'2024-11-25 01:20:30.8628353+07:00','2024-11-25 01:20:30.8628353+07:00',NULL,'Week',7,350,700,1050);
INSERT INTO "memberships" VALUES (2,'2024-11-25 01:20:30.8664619+07:00','2024-11-25 01:20:30.8664619+07:00',NULL,'Mount',30,1500,3000,3600);
INSERT INTO "memberships" VALUES (3,'2024-11-25 01:20:30.8695665+07:00','2024-11-25 01:20:30.8695665+07:00',NULL,'Year',365,18250,35600,36500);
INSERT INTO "stores" VALUES (1,'2024-11-25 01:20:30.8732008+07:00','2024-11-25 01:20:30.8732008+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro1','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (2,'2024-11-25 01:20:30.8764485+07:00','2024-11-25 01:20:30.8764485+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro2','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (3,'2024-11-25 01:20:30.8803029+07:00','2024-11-25 01:20:30.8803029+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro3','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (4,'2024-11-25 01:20:30.883482+07:00','2024-11-25 01:20:30.883482+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro4','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (5,'2024-11-25 01:20:30.8867731+07:00','2024-11-25 01:20:30.8867731+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro5','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (6,'2024-11-25 01:20:30.8905558+07:00','2024-11-25 01:20:30.8905558+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro6','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (7,'2024-11-25 01:20:30.8941449+07:00','2024-11-25 01:20:30.8941449+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro7','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (8,'2024-11-25 01:20:30.897503+07:00','2024-11-25 01:20:30.897503+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro8','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (9,'2024-11-25 01:20:30.9011854+07:00','2024-11-25 01:20:30.9011854+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro9','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (10,'2024-11-25 01:20:30.904954+07:00','2024-11-25 01:20:30.904954+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro10','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (11,'2024-11-25 01:20:30.9081616+07:00','2024-11-25 01:20:30.9081616+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro11','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (12,'2024-11-25 01:20:30.9119382+07:00','2024-11-25 01:20:30.9119382+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro12','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (13,'2024-11-25 01:20:30.915137+07:00','2024-11-25 01:20:30.915137+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro13','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (14,'2024-11-25 01:20:30.918446+07:00','2024-11-25 01:20:30.918446+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro14','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (15,'2024-11-25 01:20:30.9215291+07:00','2024-11-25 01:20:30.9215291+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro15','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (16,'2024-11-25 01:20:30.9253568+07:00','2024-11-25 01:20:30.9253568+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro16','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (17,'2024-11-25 01:20:30.9292503+07:00','2024-11-25 01:20:30.9292503+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro17','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (18,'2024-11-25 01:20:30.9325237+07:00','2024-11-25 01:20:30.9325237+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro18','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (19,'2024-11-25 01:20:30.9361165+07:00','2024-11-25 01:20:30.9361165+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro19','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (20,'2024-11-25 01:20:30.9397487+07:00','2024-11-25 01:20:30.9397487+07:00',NULL,'https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg','','','',1,'Unicro20','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,1);
INSERT INTO "stores" VALUES (21,'2024-11-25 01:20:30.9434236+07:00','2024-11-25 01:20:30.9434236+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro21','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (22,'2024-11-25 01:20:30.9466402+07:00','2024-11-25 01:20:30.9466402+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro22','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (23,'2024-11-25 01:20:30.9503705+07:00','2024-11-25 01:20:30.9503705+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro23','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (24,'2024-11-25 01:20:30.9536181+07:00','2024-11-25 01:20:30.9536181+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro24','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (25,'2024-11-25 01:20:30.9572983+07:00','2024-11-25 01:20:30.9572983+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro25','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (26,'2024-11-25 01:20:30.9604743+07:00','2024-11-25 01:20:30.9604743+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro26','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (27,'2024-11-25 01:20:30.9641406+07:00','2024-11-25 01:20:30.9641406+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro27','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (28,'2024-11-25 01:20:30.9676279+07:00','2024-11-25 01:20:30.9676279+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro28','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (29,'2024-11-25 01:20:30.9713238+07:00','2024-11-25 01:20:30.9713238+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro29','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (30,'2024-11-25 01:20:30.9745535+07:00','2024-11-25 01:20:30.9745535+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro30','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (31,'2024-11-25 01:20:30.9777242+07:00','2024-11-25 01:20:30.9777242+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro31','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (32,'2024-11-25 01:20:30.9816843+07:00','2024-11-25 01:20:30.9816843+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro32','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (33,'2024-11-25 01:20:30.9853547+07:00','2024-11-25 01:20:30.9853547+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro33','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (34,'2024-11-25 01:20:30.9889524+07:00','2024-11-25 01:20:30.9889524+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro34','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (35,'2024-11-25 01:20:30.9920766+07:00','2024-11-25 01:20:30.9920766+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro35','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (36,'2024-11-25 01:20:30.9958457+07:00','2024-11-25 01:20:30.9958457+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro36','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (37,'2024-11-25 01:20:30.9995363+07:00','2024-11-25 01:20:30.9995363+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro37','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (38,'2024-11-25 01:20:31.0035038+07:00','2024-11-25 01:20:31.0035038+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro38','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (39,'2024-11-25 01:20:31.0071616+07:00','2024-11-25 01:20:31.0071616+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro39','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (40,'2024-11-25 01:20:31.0106503+07:00','2024-11-25 01:20:31.0106503+07:00',NULL,'https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg','','','',2,'Unicro40','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,2);
INSERT INTO "stores" VALUES (41,'2024-11-25 01:20:31.0187669+07:00','2024-11-25 01:20:31.0187669+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro41','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (42,'2024-11-25 01:20:31.0225054+07:00','2024-11-25 01:20:31.0225054+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro42','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (43,'2024-11-25 01:20:31.0262182+07:00','2024-11-25 01:20:31.0262182+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro43','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (44,'2024-11-25 01:20:31.0299399+07:00','2024-11-25 01:20:31.0299399+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro44','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (45,'2024-11-25 01:20:31.033607+07:00','2024-11-25 01:20:31.033607+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro45','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (46,'2024-11-25 01:20:31.0405505+07:00','2024-11-25 01:20:31.0405505+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro46','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (47,'2024-11-25 01:20:31.0442631+07:00','2024-11-25 01:20:31.0442631+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro47','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (48,'2024-11-25 01:20:31.0483394+07:00','2024-11-25 01:20:31.0483394+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro48','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (49,'2024-11-25 01:20:31.05243+07:00','2024-11-25 01:20:31.05243+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro49','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (50,'2024-11-25 01:20:31.0572985+07:00','2024-11-25 01:20:31.0572985+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro50','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (51,'2024-11-25 01:20:31.0615596+07:00','2024-11-25 01:20:31.0615596+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro51','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (52,'2024-11-25 01:20:31.0657519+07:00','2024-11-25 01:20:31.0657519+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro52','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (53,'2024-11-25 01:20:31.0693933+07:00','2024-11-25 01:20:31.0693933+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro53','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (54,'2024-11-25 01:20:31.0722812+07:00','2024-11-25 01:20:31.0722812+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro54','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (55,'2024-11-25 01:20:31.0768063+07:00','2024-11-25 01:20:31.0768063+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro55','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (56,'2024-11-25 01:20:31.0793269+07:00','2024-11-25 01:20:31.0793269+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro56','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (57,'2024-11-25 01:20:31.0823386+07:00','2024-11-25 01:20:31.0823386+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro57','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (58,'2024-11-25 01:20:31.0862329+07:00','2024-11-25 01:20:31.0862329+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro58','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (59,'2024-11-25 01:20:31.0862329+07:00','2024-11-25 01:20:31.0862329+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro59','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (60,'2024-11-25 01:20:31.0946745+07:00','2024-11-25 01:20:31.0946745+07:00',NULL,'https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg','','','',3,'Unicro60','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,3);
INSERT INTO "stores" VALUES (61,'2024-11-25 01:20:31.0983491+07:00','2024-11-25 01:20:31.0983491+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro61','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (62,'2024-11-25 01:20:31.1019026+07:00','2024-11-25 01:20:31.1019026+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro62','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (63,'2024-11-25 01:20:31.1058108+07:00','2024-11-25 01:20:31.1058108+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro63','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (64,'2024-11-25 01:20:31.1100245+07:00','2024-11-25 01:20:31.1100245+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro64','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (65,'2024-11-25 01:20:31.1171203+07:00','2024-11-25 01:20:31.1171203+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro65','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (66,'2024-11-25 01:20:31.1243132+07:00','2024-11-25 01:20:31.1243132+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro66','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (67,'2024-11-25 01:20:31.1303236+07:00','2024-11-25 01:20:31.1303236+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro67','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (68,'2024-11-25 01:20:31.1355345+07:00','2024-11-25 01:20:31.1355345+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro68','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (69,'2024-11-25 01:20:31.1397335+07:00','2024-11-25 01:20:31.1397335+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro69','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (70,'2024-11-25 01:20:31.144209+07:00','2024-11-25 01:20:31.144209+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro70','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (71,'2024-11-25 01:20:31.1480114+07:00','2024-11-25 01:20:31.1480114+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro71','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (72,'2024-11-25 01:20:31.1518679+07:00','2024-11-25 01:20:31.1518679+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro72','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (73,'2024-11-25 01:20:31.1558129+07:00','2024-11-25 01:20:31.1558129+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro73','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (74,'2024-11-25 01:20:31.1596931+07:00','2024-11-25 01:20:31.1596931+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro74','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (75,'2024-11-25 01:20:31.1634925+07:00','2024-11-25 01:20:31.1634925+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro75','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (76,'2024-11-25 01:20:31.1672047+07:00','2024-11-25 01:20:31.1672047+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro76','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (77,'2024-11-25 01:20:31.171032+07:00','2024-11-25 01:20:31.171032+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro77','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (78,'2024-11-25 01:20:31.1757123+07:00','2024-11-25 01:20:31.1757123+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro78','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (79,'2024-11-25 01:20:31.1793762+07:00','2024-11-25 01:20:31.1793762+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro79','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "stores" VALUES (80,'2024-11-25 01:20:31.18314+07:00','2024-11-25 01:20:31.18314+07:00',NULL,'https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png','','','',3,'Unicro80','2024-11-25 01:20:30.8726808+07:00','2024-11-25 01:20:30.8726808+07:00','test Test test','inuse',1,4);
INSERT INTO "status_parkings" VALUES (1,'2024-11-25 01:20:31.1862856+07:00','2024-11-25 01:20:31.1862856+07:00',NULL,'Pending');
INSERT INTO "status_parkings" VALUES (2,'2024-11-25 01:20:31.1899877+07:00','2024-11-25 01:20:31.1899877+07:00',NULL,'Paid');
INSERT INTO "status_parkings" VALUES (3,'2024-11-25 01:20:31.1942157+07:00','2024-11-25 01:20:31.1942157+07:00',NULL,'Expired');
INSERT INTO "status_parkings" VALUES (4,'2024-11-25 01:20:31.1976756+07:00','2024-11-25 01:20:31.1976756+07:00',NULL,'Error');
INSERT INTO "status_parkings" VALUES (5,'2024-11-25 01:20:31.2013482+07:00','2024-11-25 01:20:31.2013482+07:00',NULL,'Un Used');
INSERT INTO "membership_customers" VALUES (1,'2024-11-25 01:20:31.2052364+07:00','2024-11-25 01:20:31.2052364+07:00',NULL,'Kittisorn','Ngandee','1998-05-23 00:00:00+00:00','0811981663');
INSERT INTO "membership_customers" VALUES (2,'2024-11-25 01:20:31.2087176+07:00','2024-11-25 01:20:31.2087176+07:00',NULL,'Pachnida','Wamakarn','1998-05-24 00:00:00+00:00','0811981664');
INSERT INTO "membership_customers" VALUES (3,'2024-11-25 01:20:31.2126483+07:00','2024-11-25 01:20:31.2126483+07:00',NULL,'Jedsadaporn','Pinjai','1998-05-25 00:00:00+00:00','0811981665');
INSERT INTO "membership_customers" VALUES (4,'2024-11-25 01:20:31.2163201+07:00','2024-11-25 01:20:31.2163201+07:00',NULL,'Tortakul','Subka','1998-05-26 00:00:00+00:00','0811981666');
INSERT INTO "membership_customers" VALUES (5,'2024-11-25 01:20:31.2204871+07:00','2024-11-25 01:20:31.2204871+07:00',NULL,'Jularat','Piangthaisong','1998-05-27 00:00:00+00:00','0811981667');
INSERT INTO "membership_customers" VALUES (6,'2024-11-25 01:20:31.2241826+07:00','2024-11-25 01:20:31.2241826+07:00',NULL,'Nattawut','Srisung','1998-05-28 00:00:00+00:00','0811981668');
INSERT INTO "membership_customers" VALUES (7,'2024-11-25 01:20:31.2282766+07:00','2024-11-25 01:20:31.2282766+07:00',NULL,'Sutthipong','Kittiwattanawong','1998-05-29 00:00:00+00:00','0811981669');
INSERT INTO "membership_customers" VALUES (8,'2024-11-25 01:20:31.2317612+07:00','2024-11-25 01:20:31.2317612+07:00',NULL,'Chayanon','Boonchud','1998-05-30 00:00:00+00:00','0811981670');
INSERT INTO "membership_customers" VALUES (9,'2024-11-25 01:20:31.2354185+07:00','2024-11-25 01:20:31.2354185+07:00',NULL,'Sakda','Rattanawong','1998-05-31 00:00:00+00:00','0811981671');
INSERT INTO "membership_customers" VALUES (10,'2024-11-25 01:20:31.2390095+07:00','2024-11-25 01:20:31.2390095+07:00',NULL,'Narissara','Sutthiwong','1998-06-01 00:00:00+00:00','0811981672');
INSERT INTO "parking_cards" VALUES (1,'2024-11-25 01:20:31.2898812+07:00','2024-11-25 01:20:31.2898812+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',1,5,0);
INSERT INTO "parking_cards" VALUES (2,'2024-11-25 01:20:31.2930528+07:00','2024-11-25 01:20:31.2930528+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',2,5,0);
INSERT INTO "parking_cards" VALUES (3,'2024-11-25 01:20:31.2969512+07:00','2024-11-25 01:20:31.2969512+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',3,5,0);
INSERT INTO "parking_cards" VALUES (4,'2024-11-25 01:20:31.3001311+07:00','2024-11-25 01:20:31.3001311+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',4,5,0);
INSERT INTO "parking_cards" VALUES (5,'2024-11-25 01:20:31.3039914+07:00','2024-11-25 01:20:31.3039914+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',5,5,0);
INSERT INTO "parking_cards" VALUES (6,'2024-11-25 01:20:31.3076965+07:00','2024-11-25 01:20:31.3076965+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',6,5,0);
INSERT INTO "parking_cards" VALUES (7,'2024-11-25 01:20:31.3114213+07:00','2024-11-25 01:20:31.3114213+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',7,5,0);
INSERT INTO "parking_cards" VALUES (8,'2024-11-25 01:20:31.3145944+07:00','2024-11-25 01:20:31.3145944+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',8,5,0);
INSERT INTO "parking_cards" VALUES (9,'2024-11-25 01:20:31.3181251+07:00','2024-11-25 01:20:31.3181251+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',9,5,0);
INSERT INTO "parking_cards" VALUES (10,'2024-11-25 01:20:31.3215763+07:00','2024-11-25 01:20:31.3215763+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',10,5,0);
INSERT INTO "parking_cards" VALUES (11,'2024-11-25 01:20:31.3235889+07:00','2024-11-25 01:20:31.3235889+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',11,5,0);
INSERT INTO "parking_cards" VALUES (12,'2024-11-25 01:20:31.3285254+07:00','2024-11-25 01:20:31.3285254+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',12,5,0);
INSERT INTO "parking_cards" VALUES (13,'2024-11-25 01:20:31.3285254+07:00','2024-11-25 01:20:31.3285254+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',13,5,0);
INSERT INTO "parking_cards" VALUES (14,'2024-11-25 01:20:31.3358362+07:00','2024-11-25 01:20:31.3358362+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',14,5,0);
INSERT INTO "parking_cards" VALUES (15,'2024-11-25 01:20:31.3389893+07:00','2024-11-25 01:20:31.3389893+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',15,5,0);
INSERT INTO "parking_cards" VALUES (16,'2024-11-25 01:20:31.3428702+07:00','2024-11-25 01:20:31.3428702+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',16,5,0);
INSERT INTO "parking_cards" VALUES (17,'2024-11-25 01:20:31.3465521+07:00','2024-11-25 01:20:31.3465521+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',17,5,0);
INSERT INTO "parking_cards" VALUES (18,'2024-11-25 01:20:31.3498139+07:00','2024-11-25 01:20:31.3498139+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',18,5,0);
INSERT INTO "parking_cards" VALUES (19,'2024-11-25 01:20:31.3540514+07:00','2024-11-25 01:20:31.3540514+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',19,5,0);
INSERT INTO "parking_cards" VALUES (20,'2024-11-25 01:20:31.357539+07:00','2024-11-25 01:20:31.357539+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',20,5,0);
INSERT INTO "parking_cards" VALUES (21,'2024-11-25 01:20:31.3612379+07:00','2024-11-25 01:20:31.3612379+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',21,5,0);
INSERT INTO "parking_cards" VALUES (22,'2024-11-25 01:20:31.3647728+07:00','2024-11-25 01:20:31.3647728+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',22,5,0);
INSERT INTO "parking_cards" VALUES (23,'2024-11-25 01:20:31.3684841+07:00','2024-11-25 01:20:31.3684841+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',23,5,0);
INSERT INTO "parking_cards" VALUES (24,'2024-11-25 01:20:31.3716294+07:00','2024-11-25 01:20:31.3716294+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',24,5,0);
INSERT INTO "parking_cards" VALUES (25,'2024-11-25 01:20:31.3753123+07:00','2024-11-25 01:20:31.3753123+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',25,5,0);
INSERT INTO "parking_cards" VALUES (26,'2024-11-25 01:20:31.3785857+07:00','2024-11-25 01:20:31.3785857+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',26,5,0);
INSERT INTO "parking_cards" VALUES (27,'2024-11-25 01:20:31.3823074+07:00','2024-11-25 01:20:31.3823074+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',27,5,0);
INSERT INTO "parking_cards" VALUES (28,'2024-11-25 01:20:31.3855658+07:00','2024-11-25 01:20:31.3855658+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',28,5,0);
INSERT INTO "parking_cards" VALUES (29,'2024-11-25 01:20:31.388728+07:00','2024-11-25 01:20:31.388728+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',29,5,0);
INSERT INTO "parking_cards" VALUES (30,'2024-11-25 01:20:31.3924943+07:00','2024-11-25 01:20:31.3924943+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',30,5,0);
INSERT INTO "parking_cards" VALUES (31,'2024-11-25 01:20:31.3961837+07:00','2024-11-25 01:20:31.3961837+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',31,5,0);
INSERT INTO "parking_cards" VALUES (32,'2024-11-25 01:20:31.3999703+07:00','2024-11-25 01:20:31.3999703+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',32,5,0);
INSERT INTO "parking_cards" VALUES (33,'2024-11-25 01:20:31.4031103+07:00','2024-11-25 01:20:31.4031103+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',33,5,0);
INSERT INTO "parking_cards" VALUES (34,'2024-11-25 01:20:31.4070782+07:00','2024-11-25 01:20:31.4070782+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',34,5,0);
INSERT INTO "parking_cards" VALUES (35,'2024-11-25 01:20:31.4070782+07:00','2024-11-25 01:20:31.4070782+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',35,5,0);
INSERT INTO "parking_cards" VALUES (36,'2024-11-25 01:20:31.414261+07:00','2024-11-25 01:20:31.414261+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',36,5,0);
INSERT INTO "parking_cards" VALUES (37,'2024-11-25 01:20:31.417408+07:00','2024-11-25 01:20:31.417408+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',37,5,0);
INSERT INTO "parking_cards" VALUES (38,'2024-11-25 01:20:31.4213343+07:00','2024-11-25 01:20:31.4213343+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',38,5,0);
INSERT INTO "parking_cards" VALUES (39,'2024-11-25 01:20:31.424721+07:00','2024-11-25 01:20:31.424721+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',39,5,0);
INSERT INTO "parking_cards" VALUES (40,'2024-11-25 01:20:31.4284949+07:00','2024-11-25 01:20:31.4284949+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',40,5,0);
INSERT INTO "parking_cards" VALUES (41,'2024-11-25 01:20:31.4322672+07:00','2024-11-25 01:20:31.4322672+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',41,5,0);
INSERT INTO "parking_cards" VALUES (42,'2024-11-25 01:20:31.4358614+07:00','2024-11-25 01:20:31.4358614+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',42,5,0);
INSERT INTO "parking_cards" VALUES (43,'2024-11-25 01:20:31.4396847+07:00','2024-11-25 01:20:31.4396847+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',43,5,0);
INSERT INTO "parking_cards" VALUES (44,'2024-11-25 01:20:31.4433191+07:00','2024-11-25 01:20:31.4433191+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',44,5,0);
INSERT INTO "parking_cards" VALUES (45,'2024-11-25 01:20:31.446513+07:00','2024-11-25 01:20:31.446513+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',45,5,0);
INSERT INTO "parking_cards" VALUES (46,'2024-11-25 01:20:31.450956+07:00','2024-11-25 01:20:31.450956+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',46,5,0);
INSERT INTO "parking_cards" VALUES (47,'2024-11-25 01:20:31.4545016+07:00','2024-11-25 01:20:31.4545016+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',47,5,0);
INSERT INTO "parking_cards" VALUES (48,'2024-11-25 01:20:31.4581883+07:00','2024-11-25 01:20:31.4581883+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',48,5,0);
INSERT INTO "parking_cards" VALUES (49,'2024-11-25 01:20:31.4614922+07:00','2024-11-25 01:20:31.4614922+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',49,5,0);
INSERT INTO "parking_cards" VALUES (50,'2024-11-25 01:20:31.4651615+07:00','2024-11-25 01:20:31.4651615+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',50,5,0);
INSERT INTO "parking_cards" VALUES (51,'2024-11-25 01:20:31.4690738+07:00','2024-11-25 01:20:31.4690738+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',51,5,0);
INSERT INTO "parking_cards" VALUES (52,'2024-11-25 01:20:31.4728001+07:00','2024-11-25 01:20:31.4728001+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',52,5,0);
INSERT INTO "parking_cards" VALUES (53,'2024-11-25 01:20:31.4759784+07:00','2024-11-25 01:20:31.4759784+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',53,5,0);
INSERT INTO "parking_cards" VALUES (54,'2024-11-25 01:20:31.4871504+07:00','2024-11-25 01:20:31.4871504+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',54,5,0);
INSERT INTO "parking_cards" VALUES (55,'2024-11-25 01:20:31.4983865+07:00','2024-11-25 01:20:31.4983865+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',55,5,0);
INSERT INTO "parking_cards" VALUES (56,'2024-11-25 01:20:31.5097303+07:00','2024-11-25 01:20:31.5097303+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',56,5,0);
INSERT INTO "parking_cards" VALUES (57,'2024-11-25 01:20:31.5208245+07:00','2024-11-25 01:20:31.5208245+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',57,5,0);
INSERT INTO "parking_cards" VALUES (58,'2024-11-25 01:20:31.5314268+07:00','2024-11-25 01:20:31.5314268+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',58,5,0);
INSERT INTO "parking_cards" VALUES (59,'2024-11-25 01:20:31.5425125+07:00','2024-11-25 01:20:31.5425125+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',59,5,0);
INSERT INTO "parking_cards" VALUES (60,'2024-11-25 01:20:31.5465555+07:00','2024-11-25 01:20:31.5465555+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',60,5,0);
INSERT INTO "parking_cards" VALUES (61,'2024-11-25 01:20:31.5502825+07:00','2024-11-25 01:20:31.5502825+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',61,5,0);
INSERT INTO "parking_cards" VALUES (62,'2024-11-25 01:20:31.5549705+07:00','2024-11-25 01:20:31.5549705+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',62,5,0);
INSERT INTO "parking_cards" VALUES (63,'2024-11-25 01:20:31.5593497+07:00','2024-11-25 01:20:31.5593497+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',63,5,0);
INSERT INTO "parking_cards" VALUES (64,'2024-11-25 01:20:31.5630356+07:00','2024-11-25 01:20:31.5630356+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',64,5,0);
INSERT INTO "parking_cards" VALUES (65,'2024-11-25 01:20:31.5662394+07:00','2024-11-25 01:20:31.5662394+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',65,5,0);
INSERT INTO "parking_cards" VALUES (66,'2024-11-25 01:20:31.5694078+07:00','2024-11-25 01:20:31.5694078+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',66,5,0);
INSERT INTO "parking_cards" VALUES (67,'2024-11-25 01:20:31.572856+07:00','2024-11-25 01:20:31.572856+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',67,5,0);
INSERT INTO "parking_cards" VALUES (68,'2024-11-25 01:20:31.5766457+07:00','2024-11-25 01:20:31.5766457+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',68,5,0);
INSERT INTO "parking_cards" VALUES (69,'2024-11-25 01:20:31.5797794+07:00','2024-11-25 01:20:31.5797794+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',69,5,0);
INSERT INTO "parking_cards" VALUES (70,'2024-11-25 01:20:31.5829445+07:00','2024-11-25 01:20:31.5829445+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',70,5,0);
INSERT INTO "parking_cards" VALUES (71,'2024-11-25 01:20:31.5866394+07:00','2024-11-25 01:20:31.5866394+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',71,5,0);
INSERT INTO "parking_cards" VALUES (72,'2024-11-25 01:20:31.5897862+07:00','2024-11-25 01:20:31.5897862+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',72,5,0);
INSERT INTO "parking_cards" VALUES (73,'2024-11-25 01:20:31.5934725+07:00','2024-11-25 01:20:31.5934725+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',73,5,0);
INSERT INTO "parking_cards" VALUES (74,'2024-11-25 01:20:31.5966555+07:00','2024-11-25 01:20:31.5966555+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',74,5,0);
INSERT INTO "parking_cards" VALUES (75,'2024-11-25 01:20:31.6004285+07:00','2024-11-25 01:20:31.6004285+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',75,5,0);
INSERT INTO "parking_cards" VALUES (76,'2024-11-25 01:20:31.6035868+07:00','2024-11-25 01:20:31.6035868+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',76,5,0);
INSERT INTO "parking_cards" VALUES (77,'2024-11-25 01:20:31.6072691+07:00','2024-11-25 01:20:31.6072691+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',77,5,0);
INSERT INTO "parking_cards" VALUES (78,'2024-11-25 01:20:31.6102773+07:00','2024-11-25 01:20:31.6102773+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',78,5,0);
INSERT INTO "parking_cards" VALUES (79,'2024-11-25 01:20:31.6137342+07:00','2024-11-25 01:20:31.6137342+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',79,5,0);
INSERT INTO "parking_cards" VALUES (80,'2024-11-25 01:20:31.6174353+07:00','2024-11-25 01:20:31.6174353+07:00',NULL,'2024-11-25 01:20:30.8726808+07:00',80,5,0);
INSERT INTO "parking_cards" VALUES (81,'2024-11-25 01:20:31.6218901+07:00','2024-11-25 01:20:31.6218901+07:00',NULL,'2025-01-01 00:00:00+00:00',0,5,1);
INSERT INTO "parking_cards" VALUES (82,'2024-11-25 01:20:31.6266593+07:00','2024-11-25 01:20:31.6266593+07:00',NULL,'2025-01-02 00:00:00+00:00',0,5,2);
INSERT INTO "parking_cards" VALUES (83,'2024-11-25 01:20:31.6286811+07:00','2024-11-25 01:20:31.6286811+07:00',NULL,'2025-01-03 00:00:00+00:00',0,5,3);
INSERT INTO "parking_cards" VALUES (84,'2024-11-25 01:20:31.6317159+07:00','2024-11-25 01:20:31.6317159+07:00',NULL,'2025-01-04 00:00:00+00:00',0,5,4);
INSERT INTO "parking_cards" VALUES (85,'2024-11-25 01:20:31.6317159+07:00','2024-11-25 01:20:31.6317159+07:00',NULL,'2025-01-05 00:00:00+00:00',0,5,5);
INSERT INTO "parking_cards" VALUES (86,'2024-11-25 01:20:31.6372516+07:00','2024-11-25 01:20:31.6372516+07:00',NULL,'2025-01-06 00:00:00+00:00',0,5,6);
INSERT INTO "parking_cards" VALUES (87,'2024-11-25 01:20:31.6417779+07:00','2024-11-25 01:20:31.6417779+07:00',NULL,'2025-01-07 00:00:00+00:00',0,5,7);
INSERT INTO "parking_cards" VALUES (88,'2024-11-25 01:20:31.6417779+07:00','2024-11-25 01:20:31.6417779+07:00',NULL,'2025-01-08 00:00:00+00:00',0,5,8);
INSERT INTO "parking_cards" VALUES (89,'2024-11-25 01:20:31.6503377+07:00','2024-11-25 01:20:31.6503377+07:00',NULL,'2025-01-09 00:00:00+00:00',0,5,9);
INSERT INTO "parking_cards" VALUES (90,'2024-11-25 01:20:31.6534913+07:00','2024-11-25 01:20:31.6534913+07:00',NULL,'2025-01-10 00:00:00+00:00',0,5,10);
INSERT INTO "parking_cards" VALUES (91,'2024-11-25 01:20:31.6571809+07:00','2024-11-25 01:20:31.6571809+07:00',NULL,'2025-11-25 01:20:31.6566524+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (92,'2024-11-25 01:20:31.66034+07:00','2024-11-25 01:20:31.66034+07:00',NULL,'2025-11-25 01:20:31.66034+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (93,'2024-11-25 01:20:31.6634934+07:00','2024-11-25 01:20:31.6634934+07:00',NULL,'2025-11-25 01:20:31.6634934+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (94,'2024-11-25 01:20:31.667187+07:00','2024-11-25 01:20:31.667187+07:00',NULL,'2025-11-25 01:20:31.6666594+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (95,'2024-11-25 01:20:31.6705461+07:00','2024-11-25 01:20:31.6705461+07:00',NULL,'2025-11-25 01:20:31.6687573+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (96,'2024-11-25 01:20:31.6737122+07:00','2024-11-25 01:20:31.6737122+07:00',NULL,'2025-11-25 01:20:31.6737122+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (97,'2024-11-25 01:20:31.676859+07:00','2024-11-25 01:20:31.676859+07:00',NULL,'2025-11-25 01:20:31.676859+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (98,'2024-11-25 01:20:31.6805397+07:00','2024-11-25 01:20:31.6805397+07:00',NULL,'2025-11-25 01:20:31.6805397+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (99,'2024-11-25 01:20:31.6836966+07:00','2024-11-25 01:20:31.6836966+07:00',NULL,'2025-11-25 01:20:31.6836966+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (100,'2024-11-25 01:20:31.6873836+07:00','2024-11-25 01:20:31.6873836+07:00',NULL,'2025-11-25 01:20:31.6868548+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (101,'2024-11-25 01:20:31.6923337+07:00','2024-11-25 01:20:31.6923337+07:00',NULL,'2025-11-25 01:20:31.6923337+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (102,'2024-11-25 01:20:31.6954472+07:00','2024-11-25 01:20:31.6954472+07:00',NULL,'2025-11-25 01:20:31.6954472+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (103,'2024-11-25 01:20:31.6991533+07:00','2024-11-25 01:20:31.6991533+07:00',NULL,'2025-11-25 01:20:31.6986183+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (104,'2024-11-25 01:20:31.7023243+07:00','2024-11-25 01:20:31.7023243+07:00',NULL,'2025-11-25 01:20:31.7023243+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (105,'2024-11-25 01:20:31.7054324+07:00','2024-11-25 01:20:31.7054324+07:00',NULL,'2025-11-25 01:20:31.7054324+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (106,'2024-11-25 01:20:31.7091012+07:00','2024-11-25 01:20:31.7091012+07:00',NULL,'2025-11-25 01:20:31.7091012+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (107,'2024-11-25 01:20:31.712485+07:00','2024-11-25 01:20:31.712485+07:00',NULL,'2025-11-25 01:20:31.712485+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (108,'2024-11-25 01:20:31.71563+07:00','2024-11-25 01:20:31.71563+07:00',NULL,'2025-11-25 01:20:31.71563+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (109,'2024-11-25 01:20:31.7187849+07:00','2024-11-25 01:20:31.7187849+07:00',NULL,'2025-11-25 01:20:31.7187849+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (110,'2024-11-25 01:20:31.7219565+07:00','2024-11-25 01:20:31.7219565+07:00',NULL,'2025-11-25 01:20:31.7219565+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (111,'2024-11-25 01:20:31.7256259+07:00','2024-11-25 01:20:31.7256259+07:00',NULL,'2025-11-25 01:20:31.7250978+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (112,'2024-11-25 01:20:31.7288121+07:00','2024-11-25 01:20:31.7288121+07:00',NULL,'2025-11-25 01:20:31.7288121+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (113,'2024-11-25 01:20:31.7319799+07:00','2024-11-25 01:20:31.7319799+07:00',NULL,'2025-11-25 01:20:31.7319799+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (114,'2024-11-25 01:20:31.7356848+07:00','2024-11-25 01:20:31.7356848+07:00',NULL,'2025-11-25 01:20:31.7351571+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (115,'2024-11-25 01:20:31.7388376+07:00','2024-11-25 01:20:31.7388376+07:00',NULL,'2025-11-25 01:20:31.7388376+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (116,'2024-11-25 01:20:31.7419882+07:00','2024-11-25 01:20:31.7419882+07:00',NULL,'2025-11-25 01:20:31.7419882+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (117,'2024-11-25 01:20:31.7460139+07:00','2024-11-25 01:20:31.7460139+07:00',NULL,'2025-11-25 01:20:31.7440618+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (118,'2024-11-25 01:20:31.7491452+07:00','2024-11-25 01:20:31.7491452+07:00',NULL,'2025-11-25 01:20:31.7491452+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (119,'2024-11-25 01:20:31.7526529+07:00','2024-11-25 01:20:31.7526529+07:00',NULL,'2025-11-25 01:20:31.7526529+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (120,'2024-11-25 01:20:31.7563523+07:00','2024-11-25 01:20:31.7563523+07:00',NULL,'2025-11-25 01:20:31.7558248+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (121,'2024-11-25 01:20:31.7595833+07:00','2024-11-25 01:20:31.7595833+07:00',NULL,'2025-11-25 01:20:31.7595833+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (122,'2024-11-25 01:20:31.7627463+07:00','2024-11-25 01:20:31.7627463+07:00',NULL,'2025-11-25 01:20:31.7627463+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (123,'2024-11-25 01:20:31.7664924+07:00','2024-11-25 01:20:31.7664924+07:00',NULL,'2025-11-25 01:20:31.7664924+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (124,'2024-11-25 01:20:31.7721265+07:00','2024-11-25 01:20:31.7721265+07:00',NULL,'2025-11-25 01:20:31.7721265+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (125,'2024-11-25 01:20:31.7796121+07:00','2024-11-25 01:20:31.7796121+07:00',NULL,'2025-11-25 01:20:31.7782135+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (126,'2024-11-25 01:20:31.7842014+07:00','2024-11-25 01:20:31.7842014+07:00',NULL,'2025-11-25 01:20:31.7831976+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (127,'2024-11-25 01:20:31.7880094+07:00','2024-11-25 01:20:31.7880094+07:00',NULL,'2025-11-25 01:20:31.7880094+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (128,'2024-11-25 01:20:31.7982598+07:00','2024-11-25 01:20:31.7982598+07:00',NULL,'2025-11-25 01:20:31.7980409+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (129,'2024-11-25 01:20:31.8012722+07:00','2024-11-25 01:20:31.8012722+07:00',NULL,'2025-11-25 01:20:31.8012722+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (130,'2024-11-25 01:20:31.8083484+07:00','2024-11-25 01:20:31.8083484+07:00',NULL,'2025-11-25 01:20:31.8082866+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (131,'2024-11-25 01:20:31.8083484+07:00','2024-11-25 01:20:31.8083484+07:00',NULL,'2025-11-25 01:20:31.8083484+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (132,'2024-11-25 01:20:31.8173594+07:00','2024-11-25 01:20:31.8173594+07:00',NULL,'2025-11-25 01:20:31.8173594+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (133,'2024-11-25 01:20:31.8208241+07:00','2024-11-25 01:20:31.8208241+07:00',NULL,'2025-11-25 01:20:31.8189235+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (134,'2024-11-25 01:20:31.8239753+07:00','2024-11-25 01:20:31.8239753+07:00',NULL,'2025-11-25 01:20:31.8239753+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (135,'2024-11-25 01:20:31.8271177+07:00','2024-11-25 01:20:31.8271177+07:00',NULL,'2025-11-25 01:20:31.8271177+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (136,'2024-11-25 01:20:31.8307983+07:00','2024-11-25 01:20:31.8307983+07:00',NULL,'2025-11-25 01:20:31.8307983+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (137,'2024-11-25 01:20:31.83398+07:00','2024-11-25 01:20:31.83398+07:00',NULL,'2025-11-25 01:20:31.83398+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (138,'2024-11-25 01:20:31.8371253+07:00','2024-11-25 01:20:31.8371253+07:00',NULL,'2025-11-25 01:20:31.8371253+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (139,'2024-11-25 01:20:31.8408127+07:00','2024-11-25 01:20:31.8408127+07:00',NULL,'2025-11-25 01:20:31.8402825+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (140,'2024-11-25 01:20:31.844002+07:00','2024-11-25 01:20:31.844002+07:00',NULL,'2025-11-25 01:20:31.8418434+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (141,'2024-11-25 01:20:31.8471503+07:00','2024-11-25 01:20:31.8471503+07:00',NULL,'2025-11-25 01:20:31.8471503+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (142,'2024-11-25 01:20:31.8503087+07:00','2024-11-25 01:20:31.8503087+07:00',NULL,'2025-11-25 01:20:31.8503087+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (143,'2024-11-25 01:20:31.853464+07:00','2024-11-25 01:20:31.853464+07:00',NULL,'2025-11-25 01:20:31.853464+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (144,'2024-11-25 01:20:31.8571421+07:00','2024-11-25 01:20:31.8571421+07:00',NULL,'2025-11-25 01:20:31.8571421+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (145,'2024-11-25 01:20:31.8603179+07:00','2024-11-25 01:20:31.8603179+07:00',NULL,'2025-11-25 01:20:31.8603179+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (146,'2024-11-25 01:20:31.8634783+07:00','2024-11-25 01:20:31.8634783+07:00',NULL,'2025-11-25 01:20:31.8634783+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (147,'2024-11-25 01:20:31.8670385+07:00','2024-11-25 01:20:31.8670385+07:00',NULL,'2025-11-25 01:20:31.8650637+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (148,'2024-11-25 01:20:31.8701752+07:00','2024-11-25 01:20:31.8701752+07:00',NULL,'2025-11-25 01:20:31.8701752+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (149,'2024-11-25 01:20:31.8733187+07:00','2024-11-25 01:20:31.8733187+07:00',NULL,'2025-11-25 01:20:31.8733187+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (150,'2024-11-25 01:20:31.8764982+07:00','2024-11-25 01:20:31.8764982+07:00',NULL,'2025-11-25 01:20:31.8764982+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (151,'2024-11-25 01:20:31.879673+07:00','2024-11-25 01:20:31.879673+07:00',NULL,'2025-11-25 01:20:31.879673+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (152,'2024-11-25 01:20:31.8828299+07:00','2024-11-25 01:20:31.8828299+07:00',NULL,'2025-11-25 01:20:31.8828299+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (153,'2024-11-25 01:20:31.8865191+07:00','2024-11-25 01:20:31.8865191+07:00',NULL,'2025-11-25 01:20:31.8865191+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (154,'2024-11-25 01:20:31.8898936+07:00','2024-11-25 01:20:31.8898936+07:00',NULL,'2025-11-25 01:20:31.8880866+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (155,'2024-11-25 01:20:31.8930395+07:00','2024-11-25 01:20:31.8930395+07:00',NULL,'2025-11-25 01:20:31.8930395+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (156,'2024-11-25 01:20:31.8962547+07:00','2024-11-25 01:20:31.8962547+07:00',NULL,'2025-11-25 01:20:31.8962547+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (157,'2024-11-25 01:20:31.899427+07:00','2024-11-25 01:20:31.899427+07:00',NULL,'2025-11-25 01:20:31.899427+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (158,'2024-11-25 01:20:31.9031292+07:00','2024-11-25 01:20:31.9031292+07:00',NULL,'2025-11-25 01:20:31.9031292+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (159,'2024-11-25 01:20:31.9067827+07:00','2024-11-25 01:20:31.9067827+07:00',NULL,'2025-11-25 01:20:31.9062464+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (160,'2024-11-25 01:20:31.910242+07:00','2024-11-25 01:20:31.910242+07:00',NULL,'2025-11-25 01:20:31.9083541+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (161,'2024-11-25 01:20:31.9139002+07:00','2024-11-25 01:20:31.9139002+07:00',NULL,'2025-11-25 01:20:31.9139002+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (162,'2024-11-25 01:20:31.9170746+07:00','2024-11-25 01:20:31.9170746+07:00',NULL,'2025-11-25 01:20:31.9170746+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (163,'2024-11-25 01:20:31.920734+07:00','2024-11-25 01:20:31.920734+07:00',NULL,'2025-11-25 01:20:31.920734+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (164,'2024-11-25 01:20:31.9244555+07:00','2024-11-25 01:20:31.9244555+07:00',NULL,'2025-11-25 01:20:31.9244555+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (165,'2024-11-25 01:20:31.9280951+07:00','2024-11-25 01:20:31.9280951+07:00',NULL,'2025-11-25 01:20:31.9280951+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (166,'2024-11-25 01:20:31.9317844+07:00','2024-11-25 01:20:31.9317844+07:00',NULL,'2025-11-25 01:20:31.9296474+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (167,'2024-11-25 01:20:31.9396417+07:00','2024-11-25 01:20:31.9396417+07:00',NULL,'2025-11-25 01:20:31.9396417+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (168,'2024-11-25 01:20:31.9434753+07:00','2024-11-25 01:20:31.9434753+07:00',NULL,'2025-11-25 01:20:31.9434753+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (169,'2024-11-25 01:20:31.946617+07:00','2024-11-25 01:20:31.946617+07:00',NULL,'2025-11-25 01:20:31.946617+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (170,'2024-11-25 01:20:31.9502996+07:00','2024-11-25 01:20:31.9502996+07:00',NULL,'2025-11-25 01:20:31.9502996+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (171,'2024-11-25 01:20:31.9540133+07:00','2024-11-25 01:20:31.9540133+07:00',NULL,'2025-11-25 01:20:31.9518604+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (172,'2024-11-25 01:20:31.9574225+07:00','2024-11-25 01:20:31.9574225+07:00',NULL,'2025-11-25 01:20:31.9574225+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (173,'2024-11-25 01:20:31.9615764+07:00','2024-11-25 01:20:31.9615764+07:00',NULL,'2025-11-25 01:20:31.9610639+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (174,'2024-11-25 01:20:31.964703+07:00','2024-11-25 01:20:31.964703+07:00',NULL,'2025-11-25 01:20:31.964703+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (175,'2024-11-25 01:20:31.9683862+07:00','2024-11-25 01:20:31.9683862+07:00',NULL,'2025-11-25 01:20:31.9683862+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (176,'2024-11-25 01:20:31.9720802+07:00','2024-11-25 01:20:31.9720802+07:00',NULL,'2025-11-25 01:20:31.971531+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (177,'2024-11-25 01:20:31.9755036+07:00','2024-11-25 01:20:31.9755036+07:00',NULL,'2025-11-25 01:20:31.9755036+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (178,'2024-11-25 01:20:31.9796329+07:00','2024-11-25 01:20:31.9796329+07:00',NULL,'2025-11-25 01:20:31.9770474+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (179,'2024-11-25 01:20:31.9830198+07:00','2024-11-25 01:20:31.9830198+07:00',NULL,'2025-11-25 01:20:31.9830198+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (180,'2024-11-25 01:20:31.9871847+07:00','2024-11-25 01:20:31.9871847+07:00',NULL,'2025-11-25 01:20:31.9866698+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (181,'2024-11-25 01:20:31.9908888+07:00','2024-11-25 01:20:31.9908888+07:00',NULL,'2025-11-25 01:20:31.9903561+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (182,'2024-11-25 01:20:31.9947506+07:00','2024-11-25 01:20:31.9947506+07:00',NULL,'2025-11-25 01:20:31.9941656+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (183,'2024-11-25 01:20:31.9984217+07:00','2024-11-25 01:20:31.9984217+07:00',NULL,'2025-11-25 01:20:31.9984217+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (184,'2024-11-25 01:20:32.0023061+07:00','2024-11-25 01:20:32.0023061+07:00',NULL,'2025-11-25 01:20:32.0021313+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (185,'2024-11-25 01:20:32.0059356+07:00','2024-11-25 01:20:32.0059356+07:00',NULL,'2025-11-25 01:20:32.0059356+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (186,'2024-11-25 01:20:32.0096539+07:00','2024-11-25 01:20:32.0096539+07:00',NULL,'2025-11-25 01:20:32.0096539+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (187,'2024-11-25 01:20:32.0126813+07:00','2024-11-25 01:20:32.0126813+07:00',NULL,'2025-11-25 01:20:32.0126813+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (188,'2024-11-25 01:20:32.0160402+07:00','2024-11-25 01:20:32.0160402+07:00',NULL,'2025-11-25 01:20:32.0160402+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (189,'2024-11-25 01:20:32.0209332+07:00','2024-11-25 01:20:32.0209332+07:00',NULL,'2025-11-25 01:20:32.0209332+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (190,'2024-11-25 01:20:32.0245548+07:00','2024-11-25 01:20:32.0245548+07:00',NULL,'2025-11-25 01:20:32.0245548+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (191,'2024-11-25 01:20:32.0282501+07:00','2024-11-25 01:20:32.0282501+07:00',NULL,'2025-11-25 01:20:32.0277225+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (192,'2024-11-25 01:20:32.0317414+07:00','2024-11-25 01:20:32.0317414+07:00',NULL,'2025-11-25 01:20:32.0317414+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (193,'2024-11-25 01:20:32.035424+07:00','2024-11-25 01:20:32.035424+07:00',NULL,'2025-11-25 01:20:32.035424+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (194,'2024-11-25 01:20:32.038903+07:00','2024-11-25 01:20:32.038903+07:00',NULL,'2025-11-25 01:20:32.038903+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (195,'2024-11-25 01:20:32.0432102+07:00','2024-11-25 01:20:32.0432102+07:00',NULL,'2025-11-25 01:20:32.0427027+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (196,'2024-11-25 01:20:32.0481602+07:00','2024-11-25 01:20:32.0481602+07:00',NULL,'2025-11-25 01:20:32.0476347+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (197,'2024-11-25 01:20:32.0529445+07:00','2024-11-25 01:20:32.0529445+07:00',NULL,'2025-11-25 01:20:32.0524144+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (198,'2024-11-25 01:20:32.058926+07:00','2024-11-25 01:20:32.058926+07:00',NULL,'2025-11-25 01:20:32.0584026+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (199,'2024-11-25 01:20:32.0635631+07:00','2024-11-25 01:20:32.0635631+07:00',NULL,'2025-11-25 01:20:32.0635631+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (200,'2024-11-25 01:20:32.0679258+07:00','2024-11-25 01:20:32.0679258+07:00',NULL,'2025-11-25 01:20:32.0679258+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (201,'2024-11-25 01:20:32.0714738+07:00','2024-11-25 01:20:32.0714738+07:00',NULL,'2025-11-25 01:20:32.0714738+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (202,'2024-11-25 01:20:32.0760469+07:00','2024-11-25 01:20:32.0760469+07:00',NULL,'2025-11-25 01:20:32.0750519+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (203,'2024-11-25 01:20:32.0798576+07:00','2024-11-25 01:20:32.0798576+07:00',NULL,'2025-11-25 01:20:32.0798576+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (204,'2024-11-25 01:20:32.08344+07:00','2024-11-25 01:20:32.08344+07:00',NULL,'2025-11-25 01:20:32.0813996+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (205,'2024-11-25 01:20:32.0870085+07:00','2024-11-25 01:20:32.0870085+07:00',NULL,'2025-11-25 01:20:32.0870085+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (206,'2024-11-25 01:20:32.0903528+07:00','2024-11-25 01:20:32.0903528+07:00',NULL,'2025-11-25 01:20:32.0903528+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (207,'2024-11-25 01:20:32.0941875+07:00','2024-11-25 01:20:32.0941875+07:00',NULL,'2025-11-25 01:20:32.0941875+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (208,'2024-11-25 01:20:32.0978613+07:00','2024-11-25 01:20:32.0978613+07:00',NULL,'2025-11-25 01:20:32.0973329+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (209,'2024-11-25 01:20:32.1014764+07:00','2024-11-25 01:20:32.1014764+07:00',NULL,'2025-11-25 01:20:32.1009451+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (210,'2024-11-25 01:20:32.1048507+07:00','2024-11-25 01:20:32.1048507+07:00',NULL,'2025-11-25 01:20:32.1048507+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (211,'2024-11-25 01:20:32.1083934+07:00','2024-11-25 01:20:32.1083934+07:00',NULL,'2025-11-25 01:20:32.1083934+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (212,'2024-11-25 01:20:32.1120803+07:00','2024-11-25 01:20:32.1120803+07:00',NULL,'2025-11-25 01:20:32.1120803+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (213,'2024-11-25 01:20:32.1162663+07:00','2024-11-25 01:20:32.1162663+07:00',NULL,'2025-11-25 01:20:32.1157365+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (214,'2024-11-25 01:20:32.120453+07:00','2024-11-25 01:20:32.120453+07:00',NULL,'2025-11-25 01:20:32.1199374+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (215,'2024-11-25 01:20:32.1240254+07:00','2024-11-25 01:20:32.1240254+07:00',NULL,'2025-11-25 01:20:32.1240254+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (216,'2024-11-25 01:20:32.1276874+07:00','2024-11-25 01:20:32.1276874+07:00',NULL,'2025-11-25 01:20:32.1276874+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (217,'2024-11-25 01:20:32.1313978+07:00','2024-11-25 01:20:32.1313978+07:00',NULL,'2025-11-25 01:20:32.1313978+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (218,'2024-11-25 01:20:32.1350943+07:00','2024-11-25 01:20:32.1350943+07:00',NULL,'2025-11-25 01:20:32.1350943+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (219,'2024-11-25 01:20:32.138739+07:00','2024-11-25 01:20:32.138739+07:00',NULL,'2025-11-25 01:20:32.138739+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (220,'2024-11-25 01:20:32.1425581+07:00','2024-11-25 01:20:32.1425581+07:00',NULL,'2025-11-25 01:20:32.1420408+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (221,'2024-11-25 01:20:32.1457104+07:00','2024-11-25 01:20:32.1457104+07:00',NULL,'2025-11-25 01:20:32.1457104+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (222,'2024-11-25 01:20:32.1495133+07:00','2024-11-25 01:20:32.1495133+07:00',NULL,'2025-11-25 01:20:32.1495133+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (223,'2024-11-25 01:20:32.1532486+07:00','2024-11-25 01:20:32.1532486+07:00',NULL,'2025-11-25 01:20:32.1527198+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (224,'2024-11-25 01:20:32.1569443+07:00','2024-11-25 01:20:32.1569443+07:00',NULL,'2025-11-25 01:20:32.1564176+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (225,'2024-11-25 01:20:32.1601182+07:00','2024-11-25 01:20:32.1601182+07:00',NULL,'2025-11-25 01:20:32.1601182+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (226,'2024-11-25 01:20:32.164029+07:00','2024-11-25 01:20:32.164029+07:00',NULL,'2025-11-25 01:20:32.1635017+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (227,'2024-11-25 01:20:32.1666109+07:00','2024-11-25 01:20:32.1666109+07:00',NULL,'2025-11-25 01:20:32.1666109+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (228,'2024-11-25 01:20:32.171383+07:00','2024-11-25 01:20:32.171383+07:00',NULL,'2025-11-25 01:20:32.171383+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (229,'2024-11-25 01:20:32.1750532+07:00','2024-11-25 01:20:32.1750532+07:00',NULL,'2025-11-25 01:20:32.1745259+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (230,'2024-11-25 01:20:32.1787303+07:00','2024-11-25 01:20:32.1787303+07:00',NULL,'2025-11-25 01:20:32.1787303+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (231,'2024-11-25 01:20:32.1831865+07:00','2024-11-25 01:20:32.1831865+07:00',NULL,'2025-11-25 01:20:32.1826703+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (232,'2024-11-25 01:20:32.1863056+07:00','2024-11-25 01:20:32.1863056+07:00',NULL,'2025-11-25 01:20:32.1863056+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (233,'2024-11-25 01:20:32.1906505+07:00','2024-11-25 01:20:32.1906505+07:00',NULL,'2025-11-25 01:20:32.1901305+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (234,'2024-11-25 01:20:32.1942049+07:00','2024-11-25 01:20:32.1942049+07:00',NULL,'2025-11-25 01:20:32.1942049+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (235,'2024-11-25 01:20:32.1982923+07:00','2024-11-25 01:20:32.1982923+07:00',NULL,'2025-11-25 01:20:32.1977699+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (236,'2024-11-25 01:20:32.2020273+07:00','2024-11-25 01:20:32.2020273+07:00',NULL,'2025-11-25 01:20:32.2014148+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (237,'2024-11-25 01:20:32.2058483+07:00','2024-11-25 01:20:32.2058483+07:00',NULL,'2025-11-25 01:20:32.2053173+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (238,'2024-11-25 01:20:32.2092152+07:00','2024-11-25 01:20:32.2092152+07:00',NULL,'2025-11-25 01:20:32.2092152+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (239,'2024-11-25 01:20:32.2135197+07:00','2024-11-25 01:20:32.2135197+07:00',NULL,'2025-11-25 01:20:32.2135197+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (240,'2024-11-25 01:20:32.2180559+07:00','2024-11-25 01:20:32.2180559+07:00',NULL,'2025-11-25 01:20:32.2175232+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (241,'2024-11-25 01:20:32.2225058+07:00','2024-11-25 01:20:32.2225058+07:00',NULL,'2025-11-25 01:20:32.221926+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (242,'2024-11-25 01:20:32.2261228+07:00','2024-11-25 01:20:32.2261228+07:00',NULL,'2025-11-25 01:20:32.2261228+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (243,'2024-11-25 01:20:32.2303619+07:00','2024-11-25 01:20:32.2303619+07:00',NULL,'2025-11-25 01:20:32.2298339+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (244,'2024-11-25 01:20:32.2340316+07:00','2024-11-25 01:20:32.2340316+07:00',NULL,'2025-11-25 01:20:32.2340316+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (245,'2024-11-25 01:20:32.2377589+07:00','2024-11-25 01:20:32.2377589+07:00',NULL,'2025-11-25 01:20:32.2377589+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (246,'2024-11-25 01:20:32.2414583+07:00','2024-11-25 01:20:32.2414583+07:00',NULL,'2025-11-25 01:20:32.2414583+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (247,'2024-11-25 01:20:32.2440049+07:00','2024-11-25 01:20:32.2440049+07:00',NULL,'2025-11-25 01:20:32.2440049+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (248,'2024-11-25 01:20:32.2490452+07:00','2024-11-25 01:20:32.2490452+07:00',NULL,'2025-11-25 01:20:32.2490452+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (249,'2024-11-25 01:20:32.2525572+07:00','2024-11-25 01:20:32.2525572+07:00',NULL,'2025-11-25 01:20:32.2525572+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (250,'2024-11-25 01:20:32.2561969+07:00','2024-11-25 01:20:32.2561969+07:00',NULL,'2025-11-25 01:20:32.2556843+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (251,'2024-11-25 01:20:32.260015+07:00','2024-11-25 01:20:32.260015+07:00',NULL,'2025-11-25 01:20:32.259308+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (252,'2024-11-25 01:20:32.2635157+07:00','2024-11-25 01:20:32.2635157+07:00',NULL,'2025-11-25 01:20:32.2635157+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (253,'2024-11-25 01:20:32.2670994+07:00','2024-11-25 01:20:32.2670994+07:00',NULL,'2025-11-25 01:20:32.2670994+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (254,'2024-11-25 01:20:32.2707852+07:00','2024-11-25 01:20:32.2707852+07:00',NULL,'2025-11-25 01:20:32.2702577+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (255,'2024-11-25 01:20:32.2743086+07:00','2024-11-25 01:20:32.2743086+07:00',NULL,'2025-11-25 01:20:32.2743086+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (256,'2024-11-25 01:20:32.2774256+07:00','2024-11-25 01:20:32.2774256+07:00',NULL,'2025-11-25 01:20:32.2774256+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (257,'2024-11-25 01:20:32.2817602+07:00','2024-11-25 01:20:32.2817602+07:00',NULL,'2025-11-25 01:20:32.2817602+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (258,'2024-11-25 01:20:32.2854325+07:00','2024-11-25 01:20:32.2854325+07:00',NULL,'2025-11-25 01:20:32.2849031+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (259,'2024-11-25 01:20:32.2888615+07:00','2024-11-25 01:20:32.2888615+07:00',NULL,'2025-11-25 01:20:32.2888615+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (260,'2024-11-25 01:20:32.292528+07:00','2024-11-25 01:20:32.292528+07:00',NULL,'2025-11-25 01:20:32.2919948+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (261,'2024-11-25 01:20:32.2959725+07:00','2024-11-25 01:20:32.2959725+07:00',NULL,'2025-11-25 01:20:32.2954597+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (262,'2024-11-25 01:20:32.2991638+07:00','2024-11-25 01:20:32.2991638+07:00',NULL,'2025-11-25 01:20:32.2991638+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (263,'2024-11-25 01:20:32.302928+07:00','2024-11-25 01:20:32.302928+07:00',NULL,'2025-11-25 01:20:32.302928+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (264,'2024-11-25 01:20:32.3066073+07:00','2024-11-25 01:20:32.3066073+07:00',NULL,'2025-11-25 01:20:32.3060796+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (265,'2024-11-25 01:20:32.3096973+07:00','2024-11-25 01:20:32.3096973+07:00',NULL,'2025-11-25 01:20:32.3096973+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (266,'2024-11-25 01:20:32.3112372+07:00','2024-11-25 01:20:32.3112372+07:00',NULL,'2025-11-25 01:20:32.3112372+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (267,'2024-11-25 01:20:32.3169427+07:00','2024-11-25 01:20:32.3169427+07:00',NULL,'2025-11-25 01:20:32.3169427+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (268,'2024-11-25 01:20:32.3200707+07:00','2024-11-25 01:20:32.3200707+07:00',NULL,'2025-11-25 01:20:32.3200707+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (269,'2024-11-25 01:20:32.3236561+07:00','2024-11-25 01:20:32.3236561+07:00',NULL,'2025-11-25 01:20:32.3236561+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (270,'2024-11-25 01:20:32.327331+07:00','2024-11-25 01:20:32.327331+07:00',NULL,'2025-11-25 01:20:32.3268016+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (271,'2024-11-25 01:20:32.3305814+07:00','2024-11-25 01:20:32.3305814+07:00',NULL,'2025-11-25 01:20:32.3305814+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (272,'2024-11-25 01:20:32.3342625+07:00','2024-11-25 01:20:32.3342625+07:00',NULL,'2025-11-25 01:20:32.333736+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (273,'2024-11-25 01:20:32.3379491+07:00','2024-11-25 01:20:32.3379491+07:00',NULL,'2025-11-25 01:20:32.3374214+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (274,'2024-11-25 01:20:32.3411186+07:00','2024-11-25 01:20:32.3411186+07:00',NULL,'2025-11-25 01:20:32.3411186+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (275,'2024-11-25 01:20:32.3445519+07:00','2024-11-25 01:20:32.3445519+07:00',NULL,'2025-11-25 01:20:32.3445519+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (276,'2024-11-25 01:20:32.3471035+07:00','2024-11-25 01:20:32.3471035+07:00',NULL,'2025-11-25 01:20:32.3471035+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (277,'2024-11-25 01:20:32.3500672+07:00','2024-11-25 01:20:32.3500672+07:00',NULL,'2025-11-25 01:20:32.3500672+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (278,'2024-11-25 01:20:32.3551316+07:00','2024-11-25 01:20:32.3551316+07:00',NULL,'2025-11-25 01:20:32.3551316+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (279,'2024-11-25 01:20:32.3588599+07:00','2024-11-25 01:20:32.3588599+07:00',NULL,'2025-11-25 01:20:32.3588599+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (280,'2024-11-25 01:20:32.3627611+07:00','2024-11-25 01:20:32.3627611+07:00',NULL,'2025-11-25 01:20:32.362557+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (281,'2024-11-25 01:20:32.3659954+07:00','2024-11-25 01:20:32.3659954+07:00',NULL,'2025-11-25 01:20:32.3659954+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (282,'2024-11-25 01:20:32.3696829+07:00','2024-11-25 01:20:32.3696829+07:00',NULL,'2025-11-25 01:20:32.3691577+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (283,'2024-11-25 01:20:32.3734689+07:00','2024-11-25 01:20:32.3734689+07:00',NULL,'2025-11-25 01:20:32.3734689+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (284,'2024-11-25 01:20:32.3771373+07:00','2024-11-25 01:20:32.3771373+07:00',NULL,'2025-11-25 01:20:32.3766044+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (285,'2024-11-25 01:20:32.3805068+07:00','2024-11-25 01:20:32.3805068+07:00',NULL,'2025-11-25 01:20:32.3805068+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (286,'2024-11-25 01:20:32.3841683+07:00','2024-11-25 01:20:32.3841683+07:00',NULL,'2025-11-25 01:20:32.3836541+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (287,'2024-11-25 01:20:32.3872385+07:00','2024-11-25 01:20:32.3872385+07:00',NULL,'2025-11-25 01:20:32.3872385+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (288,'2024-11-25 01:20:32.3915296+07:00','2024-11-25 01:20:32.3915296+07:00',NULL,'2025-11-25 01:20:32.3905224+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (289,'2024-11-25 01:20:32.3917953+07:00','2024-11-25 01:20:32.3917953+07:00',NULL,'2025-11-25 01:20:32.3917953+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (290,'2024-11-25 01:20:32.3985675+07:00','2024-11-25 01:20:32.3985675+07:00',NULL,'2025-11-25 01:20:32.3984653+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (291,'2024-11-25 01:20:32.3985675+07:00','2024-11-25 01:20:32.3985675+07:00',NULL,'2025-11-25 01:20:32.3985675+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (292,'2024-11-25 01:20:32.4048797+07:00','2024-11-25 01:20:32.4048797+07:00',NULL,'2025-11-25 01:20:32.4048797+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (293,'2024-11-25 01:20:32.4068878+07:00','2024-11-25 01:20:32.4068878+07:00',NULL,'2025-11-25 01:20:32.4068878+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (294,'2024-11-25 01:20:32.4118212+07:00','2024-11-25 01:20:32.4118212+07:00',NULL,'2025-11-25 01:20:32.4118212+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (295,'2024-11-25 01:20:32.4173285+07:00','2024-11-25 01:20:32.4173285+07:00',NULL,'2025-11-25 01:20:32.4173285+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (296,'2024-11-25 01:20:32.4209934+07:00','2024-11-25 01:20:32.4209934+07:00',NULL,'2025-11-25 01:20:32.4195638+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (297,'2024-11-25 01:20:32.4246649+07:00','2024-11-25 01:20:32.4246649+07:00',NULL,'2025-11-25 01:20:32.4241366+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (298,'2024-11-25 01:20:32.427877+07:00','2024-11-25 01:20:32.427877+07:00',NULL,'2025-11-25 01:20:32.427877+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (299,'2024-11-25 01:20:32.4315439+07:00','2024-11-25 01:20:32.4315439+07:00',NULL,'2025-11-25 01:20:32.4315439+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (300,'2024-11-25 01:20:32.4353489+07:00','2024-11-25 01:20:32.4353489+07:00',NULL,'2025-11-25 01:20:32.4348004+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (301,'2024-11-25 01:20:32.4390515+07:00','2024-11-25 01:20:32.4390515+07:00',NULL,'2025-11-25 01:20:32.4385244+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (302,'2024-11-25 01:20:32.4422259+07:00','2024-11-25 01:20:32.4422259+07:00',NULL,'2025-11-25 01:20:32.4422259+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (303,'2024-11-25 01:20:32.44606+07:00','2024-11-25 01:20:32.44606+07:00',NULL,'2025-11-25 01:20:32.4459214+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (304,'2024-11-25 01:20:32.4496252+07:00','2024-11-25 01:20:32.4496252+07:00',NULL,'2025-11-25 01:20:32.4481105+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (305,'2024-11-25 01:20:32.4527064+07:00','2024-11-25 01:20:32.4527064+07:00',NULL,'2025-11-25 01:20:32.4527064+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (306,'2024-11-25 01:20:32.4543815+07:00','2024-11-25 01:20:32.4543815+07:00',NULL,'2025-11-25 01:20:32.4543815+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (307,'2024-11-25 01:20:32.457893+07:00','2024-11-25 01:20:32.457893+07:00',NULL,'2025-11-25 01:20:32.457893+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (308,'2024-11-25 01:20:32.4612812+07:00','2024-11-25 01:20:32.4612812+07:00',NULL,'2025-11-25 01:20:32.4612812+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (309,'2024-11-25 01:20:32.4679549+07:00','2024-11-25 01:20:32.4679549+07:00',NULL,'2025-11-25 01:20:32.4679549+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (310,'2024-11-25 01:20:32.4714429+07:00','2024-11-25 01:20:32.4714429+07:00',NULL,'2025-11-25 01:20:32.4714429+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (311,'2024-11-25 01:20:32.4749345+07:00','2024-11-25 01:20:32.4749345+07:00',NULL,'2025-11-25 01:20:32.4749345+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (312,'2024-11-25 01:20:32.4785904+07:00','2024-11-25 01:20:32.4785904+07:00',NULL,'2025-11-25 01:20:32.4780659+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (313,'2024-11-25 01:20:32.4816816+07:00','2024-11-25 01:20:32.4816816+07:00',NULL,'2025-11-25 01:20:32.4816816+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (314,'2024-11-25 01:20:32.4853445+07:00','2024-11-25 01:20:32.4853445+07:00',NULL,'2025-11-25 01:20:32.4853445+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (315,'2024-11-25 01:20:32.4892711+07:00','2024-11-25 01:20:32.4892711+07:00',NULL,'2025-11-25 01:20:32.4887443+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (316,'2024-11-25 01:20:32.4924854+07:00','2024-11-25 01:20:32.4924854+07:00',NULL,'2025-11-25 01:20:32.4924854+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (317,'2024-11-25 01:20:32.4961129+07:00','2024-11-25 01:20:32.4961129+07:00',NULL,'2025-11-25 01:20:32.4955884+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (318,'2024-11-25 01:20:32.4986911+07:00','2024-11-25 01:20:32.4986911+07:00',NULL,'2025-11-25 01:20:32.4986911+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (319,'2024-11-25 01:20:32.5030786+07:00','2024-11-25 01:20:32.5030786+07:00',NULL,'2025-11-25 01:20:32.5020726+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (320,'2024-11-25 01:20:32.5030786+07:00','2024-11-25 01:20:32.5030786+07:00',NULL,'2025-11-25 01:20:32.5030786+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (321,'2024-11-25 01:20:32.5103474+07:00','2024-11-25 01:20:32.5103474+07:00',NULL,'2025-11-25 01:20:32.5103474+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (322,'2024-11-25 01:20:32.5140078+07:00','2024-11-25 01:20:32.5140078+07:00',NULL,'2025-11-25 01:20:32.5134797+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (323,'2024-11-25 01:20:32.5175668+07:00','2024-11-25 01:20:32.5175668+07:00',NULL,'2025-11-25 01:20:32.5170433+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (324,'2024-11-25 01:20:32.520854+07:00','2024-11-25 01:20:32.520854+07:00',NULL,'2025-11-25 01:20:32.520854+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (325,'2024-11-25 01:20:32.5246165+07:00','2024-11-25 01:20:32.5246165+07:00',NULL,'2025-11-25 01:20:32.5246165+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (326,'2024-11-25 01:20:32.5283233+07:00','2024-11-25 01:20:32.5283233+07:00',NULL,'2025-11-25 01:20:32.5277934+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (327,'2024-11-25 01:20:32.5318119+07:00','2024-11-25 01:20:32.5318119+07:00',NULL,'2025-11-25 01:20:32.5318119+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (328,'2024-11-25 01:20:32.5349569+07:00','2024-11-25 01:20:32.5349569+07:00',NULL,'2025-11-25 01:20:32.5349569+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (329,'2024-11-25 01:20:32.5386781+07:00','2024-11-25 01:20:32.5386781+07:00',NULL,'2025-11-25 01:20:32.5386781+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (330,'2024-11-25 01:20:32.5423616+07:00','2024-11-25 01:20:32.5423616+07:00',NULL,'2025-11-25 01:20:32.5423616+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (331,'2024-11-25 01:20:32.5459789+07:00','2024-11-25 01:20:32.5459789+07:00',NULL,'2025-11-25 01:20:32.5459789+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (332,'2024-11-25 01:20:32.5496609+07:00','2024-11-25 01:20:32.5496609+07:00',NULL,'2025-11-25 01:20:32.5491335+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (333,'2024-11-25 01:20:32.5531305+07:00','2024-11-25 01:20:32.5531305+07:00',NULL,'2025-11-25 01:20:32.5513085+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (334,'2024-11-25 01:20:32.5567616+07:00','2024-11-25 01:20:32.5567616+07:00',NULL,'2025-11-25 01:20:32.5562343+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (335,'2024-11-25 01:20:32.5601649+07:00','2024-11-25 01:20:32.5601649+07:00',NULL,'2025-11-25 01:20:32.5601649+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (336,'2024-11-25 01:20:32.5638486+07:00','2024-11-25 01:20:32.5638486+07:00',NULL,'2025-11-25 01:20:32.5633376+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (337,'2024-11-25 01:20:32.5677593+07:00','2024-11-25 01:20:32.5677593+07:00',NULL,'2025-11-25 01:20:32.5672409+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (338,'2024-11-25 01:20:32.570887+07:00','2024-11-25 01:20:32.570887+07:00',NULL,'2025-11-25 01:20:32.570887+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (339,'2024-11-25 01:20:32.5746684+07:00','2024-11-25 01:20:32.5746684+07:00',NULL,'2025-11-25 01:20:32.5746684+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (340,'2024-11-25 01:20:32.5785002+07:00','2024-11-25 01:20:32.5785002+07:00',NULL,'2025-11-25 01:20:32.5785002+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (341,'2024-11-25 01:20:32.5824017+07:00','2024-11-25 01:20:32.5824017+07:00',NULL,'2025-11-25 01:20:32.5824017+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (342,'2024-11-25 01:20:32.5861063+07:00','2024-11-25 01:20:32.5861063+07:00',NULL,'2025-11-25 01:20:32.5854702+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (343,'2024-11-25 01:20:32.5873954+07:00','2024-11-25 01:20:32.5873954+07:00',NULL,'2025-11-25 01:20:32.5873954+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (344,'2024-11-25 01:20:32.5929427+07:00','2024-11-25 01:20:32.5929427+07:00',NULL,'2025-11-25 01:20:32.5929427+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (345,'2024-11-25 01:20:32.5988371+07:00','2024-11-25 01:20:32.5988371+07:00',NULL,'2025-11-25 01:20:32.5988371+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (346,'2024-11-25 01:20:32.6024292+07:00','2024-11-25 01:20:32.6024292+07:00',NULL,'2025-11-25 01:20:32.6024292+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (347,'2024-11-25 01:20:32.6063053+07:00','2024-11-25 01:20:32.6063053+07:00',NULL,'2025-11-25 01:20:32.6057606+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (348,'2024-11-25 01:20:32.6103536+07:00','2024-11-25 01:20:32.6103536+07:00',NULL,'2025-11-25 01:20:32.6098485+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (349,'2024-11-25 01:20:32.6137678+07:00','2024-11-25 01:20:32.6137678+07:00',NULL,'2025-11-25 01:20:32.6137678+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (350,'2024-11-25 01:20:32.617449+07:00','2024-11-25 01:20:32.617449+07:00',NULL,'2025-11-25 01:20:32.617449+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (351,'2024-11-25 01:20:32.6211448+07:00','2024-11-25 01:20:32.6211448+07:00',NULL,'2025-11-25 01:20:32.6211448+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (352,'2024-11-25 01:20:32.6248824+07:00','2024-11-25 01:20:32.6248824+07:00',NULL,'2025-11-25 01:20:32.6247309+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (353,'2024-11-25 01:20:32.6282776+07:00','2024-11-25 01:20:32.6282776+07:00',NULL,'2025-11-25 01:20:32.6282776+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (354,'2024-11-25 01:20:32.6319836+07:00','2024-11-25 01:20:32.6319836+07:00',NULL,'2025-11-25 01:20:32.6319836+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (355,'2024-11-25 01:20:32.6352387+07:00','2024-11-25 01:20:32.6352387+07:00',NULL,'2025-11-25 01:20:32.6352387+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (356,'2024-11-25 01:20:32.6389364+07:00','2024-11-25 01:20:32.6389364+07:00',NULL,'2025-11-25 01:20:32.6389364+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (357,'2024-11-25 01:20:32.642317+07:00','2024-11-25 01:20:32.642317+07:00',NULL,'2025-11-25 01:20:32.642317+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (358,'2024-11-25 01:20:32.645984+07:00','2024-11-25 01:20:32.645984+07:00',NULL,'2025-11-25 01:20:32.645984+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (359,'2024-11-25 01:20:32.6495445+07:00','2024-11-25 01:20:32.6495445+07:00',NULL,'2025-11-25 01:20:32.6495445+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (360,'2024-11-25 01:20:32.6532047+07:00','2024-11-25 01:20:32.6532047+07:00',NULL,'2025-11-25 01:20:32.6532047+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (361,'2024-11-25 01:20:32.6568052+07:00','2024-11-25 01:20:32.6568052+07:00',NULL,'2025-11-25 01:20:32.6552714+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (362,'2024-11-25 01:20:32.659925+07:00','2024-11-25 01:20:32.659925+07:00',NULL,'2025-11-25 01:20:32.659925+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (363,'2024-11-25 01:20:32.6634009+07:00','2024-11-25 01:20:32.6634009+07:00',NULL,'2025-11-25 01:20:32.6634009+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (364,'2024-11-25 01:20:32.6670685+07:00','2024-11-25 01:20:32.6670685+07:00',NULL,'2025-11-25 01:20:32.6670685+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (365,'2024-11-25 01:20:32.6704203+07:00','2024-11-25 01:20:32.6704203+07:00',NULL,'2025-11-25 01:20:32.6704203+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (366,'2024-11-25 01:20:32.6741329+07:00','2024-11-25 01:20:32.6741329+07:00',NULL,'2025-11-25 01:20:32.6741329+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (367,'2024-11-25 01:20:32.6777959+07:00','2024-11-25 01:20:32.6777959+07:00',NULL,'2025-11-25 01:20:32.6777959+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (368,'2024-11-25 01:22:05.9222232+07:00','2024-11-25 01:22:05.9222232+07:00',NULL,'2025-11-25 01:22:05.9222232+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (369,'2024-11-25 01:22:05.9269159+07:00','2024-11-25 01:22:05.9269159+07:00',NULL,'2025-11-25 01:22:05.9269159+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (370,'2024-11-25 01:22:05.9312048+07:00','2024-11-25 01:22:05.9312048+07:00',NULL,'2025-11-25 01:22:05.9310989+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (371,'2024-11-25 01:22:05.934234+07:00','2024-11-25 01:22:05.934234+07:00',NULL,'2025-11-25 01:22:05.934234+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (372,'2024-11-25 01:22:05.9384754+07:00','2024-11-25 01:22:05.9384754+07:00',NULL,'2025-11-25 01:22:05.9384754+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (373,'2024-11-25 01:22:05.9419393+07:00','2024-11-25 01:22:05.9419393+07:00',NULL,'2025-11-25 01:22:05.9419393+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (374,'2024-11-25 01:22:05.9454674+07:00','2024-11-25 01:22:05.9454674+07:00',NULL,'2025-11-25 01:22:05.9454674+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (375,'2024-11-25 01:22:05.9494821+07:00','2024-11-25 01:22:05.9494821+07:00',NULL,'2025-11-25 01:22:05.9487312+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (376,'2024-11-25 01:22:05.95276+07:00','2024-11-25 01:22:05.95276+07:00',NULL,'2025-11-25 01:22:05.95276+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (377,'2024-11-25 01:22:05.9565397+07:00','2024-11-25 01:22:05.9565397+07:00',NULL,'2025-11-25 01:22:05.9565397+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (378,'2024-11-25 01:22:05.9596877+07:00','2024-11-25 01:22:05.9596877+07:00',NULL,'2025-11-25 01:22:05.9596877+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (379,'2024-11-25 01:22:05.963981+07:00','2024-11-25 01:22:05.963981+07:00',NULL,'2025-11-25 01:22:05.9637088+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (380,'2024-11-25 01:22:05.9671811+07:00','2024-11-25 01:22:05.9671811+07:00',NULL,'2025-11-25 01:22:05.9671811+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (381,'2024-11-25 01:22:05.9712123+07:00','2024-11-25 01:22:05.9712123+07:00',NULL,'2025-11-25 01:22:05.9706788+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (382,'2024-11-25 01:22:05.974978+07:00','2024-11-25 01:22:05.974978+07:00',NULL,'2025-11-25 01:22:05.974978+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (383,'2024-11-25 01:22:05.9788697+07:00','2024-11-25 01:22:05.9788697+07:00',NULL,'2025-11-25 01:22:05.9783306+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (384,'2024-11-25 01:22:05.9823356+07:00','2024-11-25 01:22:05.9823356+07:00',NULL,'2025-11-25 01:22:05.9818074+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (385,'2024-11-25 01:22:05.9857799+07:00','2024-11-25 01:22:05.9857799+07:00',NULL,'2025-11-25 01:22:05.9852436+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (386,'2024-11-25 01:22:05.9892642+07:00','2024-11-25 01:22:05.9892642+07:00',NULL,'2025-11-25 01:22:05.988737+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (387,'2024-11-25 01:22:05.9915828+07:00','2024-11-25 01:22:05.9915828+07:00',NULL,'2025-11-25 01:22:05.9915828+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (388,'2024-11-25 01:22:05.9957204+07:00','2024-11-25 01:22:05.9957204+07:00',NULL,'2025-11-25 01:22:05.9957204+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (389,'2024-11-25 01:22:05.9990367+07:00','2024-11-25 01:22:05.9990367+07:00',NULL,'2025-11-25 01:22:05.9990367+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (390,'2024-11-25 01:22:06.0033424+07:00','2024-11-25 01:22:06.0033424+07:00',NULL,'2025-11-25 01:22:06.0030893+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (391,'2024-11-25 01:22:06.0071741+07:00','2024-11-25 01:22:06.0071741+07:00',NULL,'2025-11-25 01:22:06.0066417+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (392,'2024-11-25 01:22:06.0103387+07:00','2024-11-25 01:22:06.0103387+07:00',NULL,'2025-11-25 01:22:06.0103387+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (393,'2024-11-25 01:22:06.0140903+07:00','2024-11-25 01:22:06.0140903+07:00',NULL,'2025-11-25 01:22:06.0140903+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (394,'2024-11-25 01:22:06.0177745+07:00','2024-11-25 01:22:06.0177745+07:00',NULL,'2025-11-25 01:22:06.0177745+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (395,'2024-11-25 01:22:06.0210835+07:00','2024-11-25 01:22:06.0210835+07:00',NULL,'2025-11-25 01:22:06.0210835+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (396,'2024-11-25 01:22:06.0247866+07:00','2024-11-25 01:22:06.0247866+07:00',NULL,'2025-11-25 01:22:06.0246667+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (397,'2024-11-25 01:22:06.0282335+07:00','2024-11-25 01:22:06.0282335+07:00',NULL,'2025-11-25 01:22:06.0282335+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (398,'2024-11-25 01:22:06.0318973+07:00','2024-11-25 01:22:06.0318973+07:00',NULL,'2025-11-25 01:22:06.0318973+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (399,'2024-11-25 01:22:06.0356228+07:00','2024-11-25 01:22:06.0356228+07:00',NULL,'2025-11-25 01:22:06.035104+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (400,'2024-11-25 01:22:06.0390801+07:00','2024-11-25 01:22:06.0390801+07:00',NULL,'2025-11-25 01:22:06.0390801+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (401,'2024-11-25 01:22:06.0423931+07:00','2024-11-25 01:22:06.0423931+07:00',NULL,'2025-11-25 01:22:06.0423931+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (402,'2024-11-25 01:22:06.0460247+07:00','2024-11-25 01:22:06.0460247+07:00',NULL,'2025-11-25 01:22:06.0460247+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (403,'2024-11-25 01:22:06.0493316+07:00','2024-11-25 01:22:06.0493316+07:00',NULL,'2025-11-25 01:22:06.0493316+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (404,'2024-11-25 01:22:06.0529127+07:00','2024-11-25 01:22:06.0529127+07:00',NULL,'2025-11-25 01:22:06.0529127+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (405,'2024-11-25 01:22:06.0573558+07:00','2024-11-25 01:22:06.0573558+07:00',NULL,'2025-11-25 01:22:06.0573558+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (406,'2024-11-25 01:22:06.0606668+07:00','2024-11-25 01:22:06.0606668+07:00',NULL,'2025-11-25 01:22:06.0606668+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (407,'2024-11-25 01:22:06.0662732+07:00','2024-11-25 01:22:06.0662732+07:00',NULL,'2025-11-25 01:22:06.0661722+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (408,'2024-11-25 01:22:06.0662732+07:00','2024-11-25 01:22:06.0662732+07:00',NULL,'2025-11-25 01:22:06.0662732+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (409,'2024-11-25 01:22:06.0763356+07:00','2024-11-25 01:22:06.0763356+07:00',NULL,'2025-11-25 01:22:06.0763356+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (410,'2024-11-25 01:22:06.0863408+07:00','2024-11-25 01:22:06.0863408+07:00',NULL,'2025-11-25 01:22:06.0863408+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (411,'2024-11-25 01:24:49.9097458+07:00','2024-11-25 01:24:49.9097458+07:00',NULL,'2025-11-25 01:24:49.9096603+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (412,'2024-11-25 01:24:49.9097458+07:00','2024-11-25 01:24:49.9097458+07:00',NULL,'2025-11-25 01:24:49.9097458+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (413,'2024-11-25 01:24:49.9160856+07:00','2024-11-25 01:24:49.9160856+07:00',NULL,'2025-11-25 01:24:49.9160856+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (414,'2024-11-25 01:24:49.9227636+07:00','2024-11-25 01:24:49.9227636+07:00',NULL,'2025-11-25 01:24:49.9225772+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (415,'2024-11-25 01:24:49.9266335+07:00','2024-11-25 01:24:49.9266335+07:00',NULL,'2025-11-25 01:24:49.9261059+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (416,'2024-11-25 01:24:49.9299839+07:00','2024-11-25 01:24:49.9299839+07:00',NULL,'2025-11-25 01:24:49.9299839+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (417,'2024-11-25 01:24:49.9341934+07:00','2024-11-25 01:24:49.9341934+07:00',NULL,'2025-11-25 01:24:49.9336775+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (418,'2024-11-25 01:24:49.9379951+07:00','2024-11-25 01:24:49.9379951+07:00',NULL,'2025-11-25 01:24:49.9374583+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (419,'2024-11-25 01:24:49.9411336+07:00','2024-11-25 01:24:49.9411336+07:00',NULL,'2025-11-25 01:24:49.9411336+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (420,'2024-11-25 01:24:49.9449123+07:00','2024-11-25 01:24:49.9449123+07:00',NULL,'2025-11-25 01:24:49.9449123+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (421,'2024-11-25 01:24:49.9485712+07:00','2024-11-25 01:24:49.9485712+07:00',NULL,'2025-11-25 01:24:49.9485712+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (422,'2024-11-25 01:24:49.9517338+07:00','2024-11-25 01:24:49.9517338+07:00',NULL,'2025-11-25 01:24:49.9517338+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (423,'2024-11-25 01:24:49.9547692+07:00','2024-11-25 01:24:49.9547692+07:00',NULL,'2025-11-25 01:24:49.9547692+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (424,'2024-11-25 01:24:49.9584188+07:00','2024-11-25 01:24:49.9584188+07:00',NULL,'2025-11-25 01:24:49.9584188+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (425,'2024-11-25 01:24:49.9633695+07:00','2024-11-25 01:24:49.9633695+07:00',NULL,'2025-11-25 01:24:49.9610338+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (426,'2024-11-25 01:24:49.9669356+07:00','2024-11-25 01:24:49.9669356+07:00',NULL,'2025-11-25 01:24:49.9669356+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (427,'2024-11-25 01:24:49.9706311+07:00','2024-11-25 01:24:49.9706311+07:00',NULL,'2025-11-25 01:24:49.9706311+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (428,'2024-11-25 01:24:49.9744473+07:00','2024-11-25 01:24:49.9744473+07:00',NULL,'2025-11-25 01:24:49.9738998+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (429,'2024-11-25 01:24:49.9781462+07:00','2024-11-25 01:24:49.9781462+07:00',NULL,'2025-11-25 01:24:49.977619+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (430,'2024-11-25 01:24:49.9814918+07:00','2024-11-25 01:24:49.9814918+07:00',NULL,'2025-11-25 01:24:49.9814918+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (431,'2024-11-25 01:24:49.9850434+07:00','2024-11-25 01:24:49.9850434+07:00',NULL,'2025-11-25 01:24:49.9850434+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (432,'2024-11-25 01:24:49.9886278+07:00','2024-11-25 01:24:49.9886278+07:00',NULL,'2025-11-25 01:24:49.9886278+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (433,'2024-11-25 01:24:49.9925242+07:00','2024-11-25 01:24:49.9925242+07:00',NULL,'2025-11-25 01:24:49.9925242+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (434,'2024-11-25 01:24:49.9954098+07:00','2024-11-25 01:24:49.9954098+07:00',NULL,'2025-11-25 01:24:49.9954098+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (435,'2024-11-25 01:24:49.9992752+07:00','2024-11-25 01:24:49.9992752+07:00',NULL,'2025-11-25 01:24:49.9992752+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (436,'2024-11-25 01:24:50.0007821+07:00','2024-11-25 01:24:50.0007821+07:00',NULL,'2025-11-25 01:24:50.0007821+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (437,'2024-11-25 01:24:50.0064052+07:00','2024-11-25 01:24:50.0064052+07:00',NULL,'2025-11-25 01:24:50.0064052+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (438,'2024-11-25 01:24:50.0114604+07:00','2024-11-25 01:24:50.0114604+07:00',NULL,'2025-11-25 01:24:50.0109175+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (439,'2024-11-25 01:24:50.0148243+07:00','2024-11-25 01:24:50.0148243+07:00',NULL,'2025-11-25 01:24:50.0148243+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (440,'2024-11-25 01:24:50.0184978+07:00','2024-11-25 01:24:50.0184978+07:00',NULL,'2025-11-25 01:24:50.0179705+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (441,'2024-11-25 01:24:50.0217333+07:00','2024-11-25 01:24:50.0217333+07:00',NULL,'2025-11-25 01:24:50.0217333+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (442,'2024-11-25 01:24:50.0254237+07:00','2024-11-25 01:24:50.0254237+07:00',NULL,'2025-11-25 01:24:50.0254237+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (443,'2024-11-25 01:24:50.0291226+07:00','2024-11-25 01:24:50.0291226+07:00',NULL,'2025-11-25 01:24:50.0291226+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (444,'2024-11-25 01:24:50.0336429+07:00','2024-11-25 01:24:50.0336429+07:00',NULL,'2025-11-25 01:24:50.0336429+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (445,'2024-11-25 01:24:50.0373041+07:00','2024-11-25 01:24:50.0373041+07:00',NULL,'2025-11-25 01:24:50.0373041+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (446,'2024-11-25 01:24:50.0409994+07:00','2024-11-25 01:24:50.0409994+07:00',NULL,'2025-11-25 01:24:50.0404641+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (447,'2024-11-25 01:24:50.044663+07:00','2024-11-25 01:24:50.044663+07:00',NULL,'2025-11-25 01:24:50.044663+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (448,'2024-11-25 01:24:50.0475638+07:00','2024-11-25 01:24:50.0475638+07:00',NULL,'2025-11-25 01:24:50.0475638+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (449,'2024-11-25 01:24:50.0488308+07:00','2024-11-25 01:24:50.0488308+07:00',NULL,'2025-11-25 01:24:50.0488308+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (450,'2024-11-25 01:24:50.0556021+07:00','2024-11-25 01:24:50.0556021+07:00',NULL,'2025-11-25 01:24:50.0556021+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (451,'2024-11-25 01:24:50.0592787+07:00','2024-11-25 01:24:50.0592787+07:00',NULL,'2025-11-25 01:24:50.0587504+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (452,'2024-11-25 01:24:50.0629516+07:00','2024-11-25 01:24:50.0629516+07:00',NULL,'2025-11-25 01:24:50.0624108+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (453,'2024-11-25 01:24:50.0666681+07:00','2024-11-25 01:24:50.0666681+07:00',NULL,'2025-11-25 01:24:50.0661048+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (454,'2024-11-25 01:24:50.07053+07:00','2024-11-25 01:24:50.07053+07:00',NULL,'2025-11-25 01:24:50.070015+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (455,'2024-11-25 01:24:50.0736882+07:00','2024-11-25 01:24:50.0736882+07:00',NULL,'2025-11-25 01:24:50.0736882+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (456,'2024-11-25 01:24:50.077321+07:00','2024-11-25 01:24:50.077321+07:00',NULL,'2025-11-25 01:24:50.077321+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (457,'2024-11-25 01:24:50.0810277+07:00','2024-11-25 01:24:50.0810277+07:00',NULL,'2025-11-25 01:24:50.080501+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (458,'2024-11-25 01:24:50.0836788+07:00','2024-11-25 01:24:50.0836788+07:00',NULL,'2025-11-25 01:24:50.0836788+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (459,'2024-11-25 01:24:50.0879278+07:00','2024-11-25 01:24:50.0879278+07:00',NULL,'2025-11-25 01:24:50.0857302+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (460,'2024-11-25 01:24:50.0912236+07:00','2024-11-25 01:24:50.0912236+07:00',NULL,'2025-11-25 01:24:50.0912236+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (461,'2024-11-25 01:24:50.0948945+07:00','2024-11-25 01:24:50.0948945+07:00',NULL,'2025-11-25 01:24:50.0943679+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (462,'2024-11-25 01:24:50.0981092+07:00','2024-11-25 01:24:50.0981092+07:00',NULL,'2025-11-25 01:24:50.0981092+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (463,'2024-11-25 01:24:50.1017892+07:00','2024-11-25 01:24:50.1017892+07:00',NULL,'2025-11-25 01:24:50.1017892+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (464,'2024-11-25 01:24:50.1056356+07:00','2024-11-25 01:24:50.1056356+07:00',NULL,'2025-11-25 01:24:50.1050984+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (465,'2024-11-25 01:24:50.108826+07:00','2024-11-25 01:24:50.108826+07:00',NULL,'2025-11-25 01:24:50.108826+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (466,'2024-11-25 01:24:50.1125161+07:00','2024-11-25 01:24:50.1125161+07:00',NULL,'2025-11-25 01:24:50.1125161+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (467,'2024-11-25 01:24:50.115676+07:00','2024-11-25 01:24:50.115676+07:00',NULL,'2025-11-25 01:24:50.115676+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (468,'2024-11-25 01:24:50.1199466+07:00','2024-11-25 01:24:50.1199466+07:00',NULL,'2025-11-25 01:24:50.1199466+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (469,'2024-11-25 01:24:50.1238971+07:00','2024-11-25 01:24:50.1238971+07:00',NULL,'2025-11-25 01:24:50.1238971+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (470,'2024-11-25 01:24:50.1253077+07:00','2024-11-25 01:24:50.1253077+07:00',NULL,'2025-11-25 01:24:50.1253077+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (471,'2024-11-25 01:24:50.1308389+07:00','2024-11-25 01:24:50.1308389+07:00',NULL,'2025-11-25 01:24:50.1308389+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (472,'2024-11-25 01:24:50.1322522+07:00','2024-11-25 01:24:50.1322522+07:00',NULL,'2025-11-25 01:24:50.1322522+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (473,'2024-11-25 01:24:50.1391726+07:00','2024-11-25 01:24:50.1391726+07:00',NULL,'2025-11-25 01:24:50.1391726+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (474,'2024-11-25 01:24:50.1427981+07:00','2024-11-25 01:24:50.1427981+07:00',NULL,'2025-11-25 01:24:50.1427981+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (475,'2024-11-25 01:24:50.1466072+07:00','2024-11-25 01:24:50.1466072+07:00',NULL,'2025-11-25 01:24:50.1460949+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (476,'2024-11-25 01:24:50.1502611+07:00','2024-11-25 01:24:50.1502611+07:00',NULL,'2025-11-25 01:24:50.1497367+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (477,'2024-11-25 01:24:50.1536736+07:00','2024-11-25 01:24:50.1536736+07:00',NULL,'2025-11-25 01:24:50.1531433+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (478,'2024-11-25 01:24:50.1573349+07:00','2024-11-25 01:24:50.1573349+07:00',NULL,'2025-11-25 01:24:50.1568215+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (479,'2024-11-25 01:24:50.1608682+07:00','2024-11-25 01:24:50.1608682+07:00',NULL,'2025-11-25 01:24:50.1608682+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (480,'2024-11-25 01:24:50.1644979+07:00','2024-11-25 01:24:50.1644979+07:00',NULL,'2025-11-25 01:24:50.1639735+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (481,'2024-11-25 01:24:50.1677005+07:00','2024-11-25 01:24:50.1677005+07:00',NULL,'2025-11-25 01:24:50.1677005+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (482,'2024-11-25 01:24:50.1713477+07:00','2024-11-25 01:24:50.1713477+07:00',NULL,'2025-11-25 01:24:50.1713477+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (483,'2024-11-25 01:24:50.1750336+07:00','2024-11-25 01:24:50.1750336+07:00',NULL,'2025-11-25 01:24:50.1750336+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (484,'2024-11-25 01:24:50.1786607+07:00','2024-11-25 01:24:50.1786607+07:00',NULL,'2025-11-25 01:24:50.1786607+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (485,'2024-11-25 01:24:50.1820659+07:00','2024-11-25 01:24:50.1820659+07:00',NULL,'2025-11-25 01:24:50.1820659+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (486,'2024-11-25 01:24:50.1857213+07:00','2024-11-25 01:24:50.1857213+07:00',NULL,'2025-11-25 01:24:50.1857213+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (487,'2024-11-25 01:24:50.188413+07:00','2024-11-25 01:24:50.188413+07:00',NULL,'2025-11-25 01:24:50.188413+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (488,'2024-11-25 01:24:50.1930298+07:00','2024-11-25 01:24:50.1930298+07:00',NULL,'2025-11-25 01:24:50.1930298+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (489,'2024-11-25 01:24:50.1943668+07:00','2024-11-25 01:24:50.1943668+07:00',NULL,'2025-11-25 01:24:50.1943668+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (490,'2024-11-25 01:24:50.200324+07:00','2024-11-25 01:24:50.200324+07:00',NULL,'2025-11-25 01:24:50.200324+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (491,'2024-11-25 01:24:50.2042643+07:00','2024-11-25 01:24:50.2042643+07:00',NULL,'2025-11-25 01:24:50.2042643+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (492,'2024-11-25 01:24:50.2082573+07:00','2024-11-25 01:24:50.2082573+07:00',NULL,'2025-11-25 01:24:50.2077401+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (493,'2024-11-25 01:24:50.2120445+07:00','2024-11-25 01:24:50.2120445+07:00',NULL,'2025-11-25 01:24:50.2115159+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (494,'2024-11-25 01:24:50.215665+07:00','2024-11-25 01:24:50.215665+07:00',NULL,'2025-11-25 01:24:50.2151474+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (495,'2024-11-25 01:24:50.2188167+07:00','2024-11-25 01:24:50.2188167+07:00',NULL,'2025-11-25 01:24:50.2188167+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (496,'2024-11-25 01:24:50.2227819+07:00','2024-11-25 01:24:50.2227819+07:00',NULL,'2025-11-25 01:24:50.2222696+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (497,'2024-11-25 01:24:50.226472+07:00','2024-11-25 01:24:50.226472+07:00',NULL,'2025-11-25 01:24:50.2259454+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (498,'2024-11-25 01:24:50.2299639+07:00','2024-11-25 01:24:50.2299639+07:00',NULL,'2025-11-25 01:24:50.2293593+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (499,'2024-11-25 01:24:50.2336199+07:00','2024-11-25 01:24:50.2336199+07:00',NULL,'2025-11-25 01:24:50.2336199+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (500,'2024-11-25 01:24:50.2375358+07:00','2024-11-25 01:24:50.2375358+07:00',NULL,'2025-11-25 01:24:50.2375358+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (501,'2024-11-25 01:24:50.240605+07:00','2024-11-25 01:24:50.240605+07:00',NULL,'2025-11-25 01:24:50.240605+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (502,'2024-11-25 01:24:50.2436616+07:00','2024-11-25 01:24:50.2436616+07:00',NULL,'2025-11-25 01:24:50.2436616+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (503,'2024-11-25 01:24:50.2476791+07:00','2024-11-25 01:24:50.2476791+07:00',NULL,'2025-11-25 01:24:50.2476791+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (504,'2024-11-25 01:24:50.2522423+07:00','2024-11-25 01:24:50.2522423+07:00',NULL,'2025-11-25 01:24:50.2522423+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (505,'2024-11-25 01:24:50.255881+07:00','2024-11-25 01:24:50.255881+07:00',NULL,'2025-11-25 01:24:50.25538+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (506,'2024-11-25 01:24:50.2597277+07:00','2024-11-25 01:24:50.2597277+07:00',NULL,'2025-11-25 01:24:50.2597277+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (507,'2024-11-25 01:24:50.2638397+07:00','2024-11-25 01:24:50.2638397+07:00',NULL,'2025-11-25 01:24:50.2633241+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (508,'2024-11-25 01:24:50.2670689+07:00','2024-11-25 01:24:50.2670689+07:00',NULL,'2025-11-25 01:24:50.2670689+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (509,'2024-11-25 01:24:50.2708941+07:00','2024-11-25 01:24:50.2708941+07:00',NULL,'2025-11-25 01:24:50.2702996+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (510,'2024-11-25 01:24:50.2740192+07:00','2024-11-25 01:24:50.2740192+07:00',NULL,'2025-11-25 01:24:50.2740192+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (511,'2024-11-25 01:24:50.2779194+07:00','2024-11-25 01:24:50.2779194+07:00',NULL,'2025-11-25 01:24:50.2779194+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (512,'2024-11-25 01:24:50.2810671+07:00','2024-11-25 01:24:50.2810671+07:00',NULL,'2025-11-25 01:24:50.2810671+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (513,'2024-11-25 01:24:50.2847689+07:00','2024-11-25 01:24:50.2847689+07:00',NULL,'2025-11-25 01:24:50.2847689+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (514,'2024-11-25 01:24:50.2892751+07:00','2024-11-25 01:24:50.2892751+07:00',NULL,'2025-11-25 01:24:50.2892751+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (515,'2024-11-25 01:24:50.2918521+07:00','2024-11-25 01:24:50.2918521+07:00',NULL,'2025-11-25 01:24:50.2918521+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (516,'2024-11-25 01:24:50.2985367+07:00','2024-11-25 01:24:50.2985367+07:00',NULL,'2025-11-25 01:24:50.2985367+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (517,'2024-11-25 01:24:50.2994019+07:00','2024-11-25 01:24:50.2994019+07:00',NULL,'2025-11-25 01:24:50.2994019+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (518,'2024-11-25 01:24:50.3054741+07:00','2024-11-25 01:24:50.3054741+07:00',NULL,'2025-11-25 01:24:50.3054741+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (519,'2024-11-25 01:24:50.3095265+07:00','2024-11-25 01:24:50.3095265+07:00',NULL,'2025-11-25 01:24:50.3095265+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (520,'2024-11-25 01:24:50.3133909+07:00','2024-11-25 01:24:50.3133909+07:00',NULL,'2025-11-25 01:24:50.3133909+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (521,'2024-11-25 01:24:50.3170518+07:00','2024-11-25 01:24:50.3170518+07:00',NULL,'2025-11-25 01:24:50.3149394+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (522,'2024-11-25 01:24:50.3210914+07:00','2024-11-25 01:24:50.3210914+07:00',NULL,'2025-11-25 01:24:50.3205324+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (523,'2024-11-25 01:24:50.3247758+07:00','2024-11-25 01:24:50.3247758+07:00',NULL,'2025-11-25 01:24:50.3247758+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (524,'2024-11-25 01:24:50.3284862+07:00','2024-11-25 01:24:50.3284862+07:00',NULL,'2025-11-25 01:24:50.3284862+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (525,'2024-11-25 01:24:50.3322406+07:00','2024-11-25 01:24:50.3322406+07:00',NULL,'2025-11-25 01:24:50.3322406+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (526,'2024-11-25 01:24:50.3359125+07:00','2024-11-25 01:24:50.3359125+07:00',NULL,'2025-11-25 01:24:50.3353846+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (527,'2024-11-25 01:24:50.339458+07:00','2024-11-25 01:24:50.339458+07:00',NULL,'2025-11-25 01:24:50.3391482+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (528,'2024-11-25 01:24:50.3428144+07:00','2024-11-25 01:24:50.3428144+07:00',NULL,'2025-11-25 01:24:50.3428144+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (529,'2024-11-25 01:24:50.3466446+07:00','2024-11-25 01:24:50.3466446+07:00',NULL,'2025-11-25 01:24:50.3463976+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (530,'2024-11-25 01:24:50.3498372+07:00','2024-11-25 01:24:50.3498372+07:00',NULL,'2025-11-25 01:24:50.3498372+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (531,'2024-11-25 01:24:50.3535829+07:00','2024-11-25 01:24:50.3535829+07:00',NULL,'2025-11-25 01:24:50.3535142+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (532,'2024-11-25 01:24:50.3567752+07:00','2024-11-25 01:24:50.3567752+07:00',NULL,'2025-11-25 01:24:50.3567752+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (533,'2024-11-25 01:24:50.3600847+07:00','2024-11-25 01:24:50.3600847+07:00',NULL,'2025-11-25 01:24:50.3600847+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (534,'2024-11-25 01:24:50.3638783+07:00','2024-11-25 01:24:50.3638783+07:00',NULL,'2025-11-25 01:24:50.3628596+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (535,'2024-11-25 01:24:50.3674592+07:00','2024-11-25 01:24:50.3674592+07:00',NULL,'2025-11-25 01:24:50.3674592+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (536,'2024-11-25 01:24:50.3704002+07:00','2024-11-25 01:24:50.3704002+07:00',NULL,'2025-11-25 01:24:50.3704002+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (537,'2024-11-25 01:24:50.374469+07:00','2024-11-25 01:24:50.374469+07:00',NULL,'2025-11-25 01:24:50.374469+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (538,'2024-11-25 01:24:50.3780262+07:00','2024-11-25 01:24:50.3780262+07:00',NULL,'2025-11-25 01:24:50.3770312+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (539,'2024-11-25 01:24:50.3813949+07:00','2024-11-25 01:24:50.3813949+07:00',NULL,'2025-11-25 01:24:50.381322+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (540,'2024-11-25 01:24:50.3849363+07:00','2024-11-25 01:24:50.3849363+07:00',NULL,'2025-11-25 01:24:50.384399+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (541,'2024-11-25 01:24:50.3883498+07:00','2024-11-25 01:24:50.3883498+07:00',NULL,'2025-11-25 01:24:50.3883498+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (542,'2024-11-25 01:24:50.3920516+07:00','2024-11-25 01:24:50.3920516+07:00',NULL,'2025-11-25 01:24:50.3915361+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (543,'2024-11-25 01:24:50.3952593+07:00','2024-11-25 01:24:50.3952593+07:00',NULL,'2025-11-25 01:24:50.3952593+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (544,'2024-11-25 01:24:50.3989622+07:00','2024-11-25 01:24:50.3989622+07:00',NULL,'2025-11-25 01:24:50.3984347+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (545,'2024-11-25 01:24:50.4021229+07:00','2024-11-25 01:24:50.4021229+07:00',NULL,'2025-11-25 01:24:50.4021229+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (546,'2024-11-25 01:24:50.4058069+07:00','2024-11-25 01:24:50.4058069+07:00',NULL,'2025-11-25 01:24:50.4036838+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (547,'2024-11-25 01:24:50.4091031+07:00','2024-11-25 01:24:50.4091031+07:00',NULL,'2025-11-25 01:24:50.4091031+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (548,'2024-11-25 01:24:50.4122717+07:00','2024-11-25 01:24:50.4122717+07:00',NULL,'2025-11-25 01:24:50.4122717+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (549,'2024-11-25 01:24:50.4161283+07:00','2024-11-25 01:24:50.4161283+07:00',NULL,'2025-11-25 01:24:50.415908+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (550,'2024-11-25 01:24:50.4198442+07:00','2024-11-25 01:24:50.4198442+07:00',NULL,'2025-11-25 01:24:50.4193161+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (551,'2024-11-25 01:24:50.423079+07:00','2024-11-25 01:24:50.423079+07:00',NULL,'2025-11-25 01:24:50.4225667+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (552,'2024-11-25 01:24:50.4270239+07:00','2024-11-25 01:24:50.4270239+07:00',NULL,'2025-11-25 01:24:50.426924+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (553,'2024-11-25 01:24:50.429602+07:00','2024-11-25 01:24:50.429602+07:00',NULL,'2025-11-25 01:24:50.429602+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (554,'2024-11-25 01:24:50.4341238+07:00','2024-11-25 01:24:50.4341238+07:00',NULL,'2025-11-25 01:24:50.4341238+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (555,'2024-11-25 01:24:50.4363757+07:00','2024-11-25 01:24:50.4363757+07:00',NULL,'2025-11-25 01:24:50.4363757+07:00',0,5,0);
INSERT INTO "parking_cards" VALUES (556,'2024-11-25 01:24:50.4394517+07:00','2024-11-25 01:24:50.4394517+07:00',NULL,'2025-11-25 01:24:50.4394517+07:00',0,5,0);
INSERT INTO "parking_card_zones" VALUES (1,3,'STORE','2024-11-25 01:20:32.6846824+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (1,1,'STORE','2024-11-25 01:20:32.687854+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (2,3,'STORE','2024-11-25 01:20:32.6912613+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (2,1,'STORE','2024-11-25 01:20:32.6964664+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (3,3,'STORE','2024-11-25 01:20:32.7001515+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (3,1,'STORE','2024-11-25 01:20:32.7037282+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (4,3,'STORE','2024-11-25 01:20:32.7074002+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (4,1,'STORE','2024-11-25 01:20:32.7104024+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (5,3,'STORE','2024-11-25 01:20:32.7135534+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (5,1,'STORE','2024-11-25 01:20:32.7173805+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (6,3,'STORE','2024-11-25 01:20:32.7208742+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (6,1,'STORE','2024-11-25 01:20:32.7238326+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (7,3,'STORE','2024-11-25 01:20:32.727669+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (7,1,'STORE','2024-11-25 01:20:32.730781+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (8,3,'STORE','2024-11-25 01:20:32.7343029+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (8,1,'STORE','2024-11-25 01:20:32.7374671+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (9,3,'STORE','2024-11-25 01:20:32.7414118+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (9,1,'STORE','2024-11-25 01:20:32.744656+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (10,3,'STORE','2024-11-25 01:20:32.7480534+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (10,1,'STORE','2024-11-25 01:20:32.7512511+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (11,3,'STORE','2024-11-25 01:20:32.7545392+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (11,1,'STORE','2024-11-25 01:20:32.7571134+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (12,3,'STORE','2024-11-25 01:20:32.761318+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (12,1,'STORE','2024-11-25 01:20:32.761318+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (13,3,'STORE','2024-11-25 01:20:32.7674633+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (13,1,'STORE','2024-11-25 01:20:32.7714581+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (14,3,'STORE','2024-11-25 01:20:32.7744626+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (14,1,'STORE','2024-11-25 01:20:32.7779009+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (15,3,'STORE','2024-11-25 01:20:32.7807846+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (15,1,'STORE','2024-11-25 01:20:32.7841676+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (16,3,'STORE','2024-11-25 01:20:32.7873408+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (16,1,'STORE','2024-11-25 01:20:32.7904941+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (17,3,'STORE','2024-11-25 01:20:32.7938736+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (17,1,'STORE','2024-11-25 01:20:32.7972492+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (18,3,'STORE','2024-11-25 01:20:32.8003082+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (18,1,'STORE','2024-11-25 01:20:32.8038275+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (19,3,'STORE','2024-11-25 01:20:32.8068671+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (19,1,'STORE','2024-11-25 01:20:32.80926+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (20,3,'STORE','2024-11-25 01:20:32.80926+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (20,1,'STORE','2024-11-25 01:20:32.8166342+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (21,3,'STORE','2024-11-25 01:20:32.8202456+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (21,1,'STORE','2024-11-25 01:20:32.8236054+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (22,3,'STORE','2024-11-25 01:20:32.8263074+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (22,1,'STORE','2024-11-25 01:20:32.8295828+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (23,3,'STORE','2024-11-25 01:20:32.8327182+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (23,1,'STORE','2024-11-25 01:20:32.8364638+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (24,3,'STORE','2024-11-25 01:20:32.8396274+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (24,1,'STORE','2024-11-25 01:20:32.8428649+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (25,3,'STORE','2024-11-25 01:20:32.8464135+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (25,1,'STORE','2024-11-25 01:20:32.8493788+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (26,3,'STORE','2024-11-25 01:20:32.8525128+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (26,1,'STORE','2024-11-25 01:20:32.8562407+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (27,3,'STORE','2024-11-25 01:20:32.8596684+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (27,1,'STORE','2024-11-25 01:20:32.8627961+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (28,3,'STORE','2024-11-25 01:20:32.8665111+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (28,1,'STORE','2024-11-25 01:20:32.8698392+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (29,3,'STORE','2024-11-25 01:20:32.8730588+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (29,1,'STORE','2024-11-25 01:20:32.8767135+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (30,3,'STORE','2024-11-25 01:20:32.8796133+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (30,1,'STORE','2024-11-25 01:20:32.8826397+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (31,3,'STORE','2024-11-25 01:20:32.8861869+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (31,1,'STORE','2024-11-25 01:20:32.8896946+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (32,3,'STORE','2024-11-25 01:20:32.893308+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (32,1,'STORE','2024-11-25 01:20:32.8962096+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (33,3,'STORE','2024-11-25 01:20:32.9000381+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (33,1,'STORE','2024-11-25 01:20:32.9032137+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (34,3,'STORE','2024-11-25 01:20:32.9063828+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (34,1,'STORE','2024-11-25 01:20:32.9096507+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (35,3,'STORE','2024-11-25 01:20:32.9128628+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (35,1,'STORE','2024-11-25 01:20:32.9159377+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (36,3,'STORE','2024-11-25 01:20:32.9189569+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (36,1,'STORE','2024-11-25 01:20:32.9219811+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (37,3,'STORE','2024-11-25 01:20:32.9253378+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (37,1,'STORE','2024-11-25 01:20:32.9292454+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (38,3,'STORE','2024-11-25 01:20:32.9322439+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (38,1,'STORE','2024-11-25 01:20:32.9358549+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (39,3,'STORE','2024-11-25 01:20:32.9391522+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (39,1,'STORE','2024-11-25 01:20:32.9424088+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (40,3,'STORE','2024-11-25 01:20:32.9462194+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (40,1,'STORE','2024-11-25 01:20:32.9495051+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (41,3,'STORE','2024-11-25 01:20:32.9531297+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (41,1,'STORE','2024-11-25 01:20:32.9564819+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (42,3,'STORE','2024-11-25 01:20:32.9598997+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (42,1,'STORE','2024-11-25 01:20:32.9633266+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (43,3,'STORE','2024-11-25 01:20:32.9665351+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (43,1,'STORE','2024-11-25 01:20:32.9697351+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (44,3,'STORE','2024-11-25 01:20:32.9733601+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (44,1,'STORE','2024-11-25 01:20:32.976701+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (45,3,'STORE','2024-11-25 01:20:32.97991+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (45,1,'STORE','2024-11-25 01:20:32.9828423+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (46,3,'STORE','2024-11-25 01:20:32.9865271+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (46,1,'STORE','2024-11-25 01:20:32.9896785+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (47,3,'STORE','2024-11-25 01:20:32.9928383+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (47,1,'STORE','2024-11-25 01:20:32.9960184+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (48,3,'STORE','2024-11-25 01:20:32.999652+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (48,1,'STORE','2024-11-25 01:20:33.0027635+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (49,3,'STORE','2024-11-25 01:20:33.0058551+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (49,1,'STORE','2024-11-25 01:20:33.0093857+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (50,3,'STORE','2024-11-25 01:20:33.0132872+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (50,1,'STORE','2024-11-25 01:20:33.0164851+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (51,3,'STORE','2024-11-25 01:20:33.0196582+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (51,1,'STORE','2024-11-25 01:20:33.0229679+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (52,3,'STORE','2024-11-25 01:20:33.0264196+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (52,1,'STORE','2024-11-25 01:20:33.0299511+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (53,3,'STORE','2024-11-25 01:20:33.0332296+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (53,1,'STORE','2024-11-25 01:20:33.0365811+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (54,3,'STORE','2024-11-25 01:20:33.040172+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (54,1,'STORE','2024-11-25 01:20:33.0443182+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (55,3,'STORE','2024-11-25 01:20:33.0487226+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (55,1,'STORE','2024-11-25 01:20:33.0524822+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (56,3,'STORE','2024-11-25 01:20:33.0570098+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (56,1,'STORE','2024-11-25 01:20:33.0606954+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (57,3,'STORE','2024-11-25 01:20:33.0640551+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (57,1,'STORE','2024-11-25 01:20:33.0665654+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (58,3,'STORE','2024-11-25 01:20:33.0665654+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (58,1,'STORE','2024-11-25 01:20:33.0741138+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (59,3,'STORE','2024-11-25 01:20:33.0772797+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (59,1,'STORE','2024-11-25 01:20:33.0804668+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (60,3,'STORE','2024-11-25 01:20:33.0836443+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (60,1,'STORE','2024-11-25 01:20:33.0867848+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (61,3,'STORE','2024-11-25 01:20:33.0899366+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (61,1,'STORE','2024-11-25 01:20:33.0931021+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (62,3,'STORE','2024-11-25 01:20:33.0967358+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (62,1,'STORE','2024-11-25 01:20:33.1000818+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (63,3,'STORE','2024-11-25 01:20:33.103256+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (63,1,'STORE','2024-11-25 01:20:33.1064955+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (64,3,'STORE','2024-11-25 01:20:33.1096618+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (64,1,'STORE','2024-11-25 01:20:33.1127307+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (65,3,'STORE','2024-11-25 01:20:33.1157755+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (65,1,'STORE','2024-11-25 01:20:33.1193959+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (66,3,'STORE','2024-11-25 01:20:33.1223442+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (66,1,'STORE','2024-11-25 01:20:33.1260598+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (67,3,'STORE','2024-11-25 01:20:33.1292094+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (67,1,'STORE','2024-11-25 01:20:33.1323658+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (68,3,'STORE','2024-11-25 01:20:33.135541+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (68,1,'STORE','2024-11-25 01:20:33.1391122+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (69,3,'STORE','2024-11-25 01:20:33.1422784+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (69,1,'STORE','2024-11-25 01:20:33.1454338+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (70,3,'STORE','2024-11-25 01:20:33.1486156+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (70,1,'STORE','2024-11-25 01:20:33.1517949+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (71,3,'STORE','2024-11-25 01:20:33.1549504+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (71,1,'STORE','2024-11-25 01:20:33.158155+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (72,3,'STORE','2024-11-25 01:20:33.1613049+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (72,1,'STORE','2024-11-25 01:20:33.1644608+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (73,3,'STORE','2024-11-25 01:20:33.1676525+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (73,1,'STORE','2024-11-25 01:20:33.1708006+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (74,3,'STORE','2024-11-25 01:20:33.1739696+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (74,1,'STORE','2024-11-25 01:20:33.177171+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (75,3,'STORE','2024-11-25 01:20:33.1803207+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (75,1,'STORE','2024-11-25 01:20:33.1834701+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (76,3,'STORE','2024-11-25 01:20:33.1866336+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (76,1,'STORE','2024-11-25 01:20:33.1892768+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (77,3,'STORE','2024-11-25 01:20:33.1923489+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (77,1,'STORE','2024-11-25 01:20:33.195384+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (78,3,'STORE','2024-11-25 01:20:33.195384+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (78,1,'STORE','2024-11-25 01:20:33.202393+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (79,3,'STORE','2024-11-25 01:20:33.2060591+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (79,1,'STORE','2024-11-25 01:20:33.2100371+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (80,3,'STORE','2024-11-25 01:20:33.2140744+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (80,1,'STORE','2024-11-25 01:20:33.2176246+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (81,2,'MEMBERSHIP','2024-11-25 01:20:33.2207999+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (81,1,'MEMBERSHIP','2024-11-25 01:20:33.2239674+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (82,2,'MEMBERSHIP','2024-11-25 01:20:33.2276469+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (82,1,'MEMBERSHIP','2024-11-25 01:20:33.230878+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (83,2,'MEMBERSHIP','2024-11-25 01:20:33.2340071+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (83,1,'MEMBERSHIP','2024-11-25 01:20:33.2376582+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (84,2,'MEMBERSHIP','2024-11-25 01:20:33.2408067+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (84,1,'MEMBERSHIP','2024-11-25 01:20:33.2434203+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (85,2,'MEMBERSHIP','2024-11-25 01:20:33.2449474+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (85,1,'MEMBERSHIP','2024-11-25 01:20:33.2479635+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (86,2,'MEMBERSHIP','2024-11-25 01:20:33.2534785+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (86,1,'MEMBERSHIP','2024-11-25 01:20:33.2534785+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (87,2,'MEMBERSHIP','2024-11-25 01:20:33.2575101+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (87,1,'MEMBERSHIP','2024-11-25 01:20:33.2635162+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (88,2,'MEMBERSHIP','2024-11-25 01:20:33.2667752+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (88,1,'MEMBERSHIP','2024-11-25 01:20:33.2698784+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (89,2,'MEMBERSHIP','2024-11-25 01:20:33.2729879+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (89,1,'MEMBERSHIP','2024-11-25 01:20:33.276278+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (90,2,'MEMBERSHIP','2024-11-25 01:20:33.279783+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (90,1,'MEMBERSHIP','2024-11-25 01:20:33.2828935+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (91,1,'GENERAL','2024-11-25 01:20:33.2863675+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (92,1,'GENERAL','2024-11-25 01:20:33.2895932+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (93,1,'GENERAL','2024-11-25 01:20:33.2933451+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (94,1,'GENERAL','2024-11-25 01:20:33.2959572+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (95,1,'GENERAL','2024-11-25 01:20:33.2996662+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (96,1,'GENERAL','2024-11-25 01:20:33.3028327+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (97,1,'GENERAL','2024-11-25 01:20:33.3058326+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (98,1,'GENERAL','2024-11-25 01:20:33.309173+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (99,1,'GENERAL','2024-11-25 01:20:33.3130339+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (100,1,'GENERAL','2024-11-25 01:20:33.3161981+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (101,1,'GENERAL','2024-11-25 01:20:33.3193898+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (102,1,'GENERAL','2024-11-25 01:20:33.3226015+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (103,1,'GENERAL','2024-11-25 01:20:33.3257902+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (104,1,'GENERAL','2024-11-25 01:20:33.32949+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (105,1,'GENERAL','2024-11-25 01:20:33.3326633+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (106,1,'GENERAL','2024-11-25 01:20:33.3364317+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (107,1,'GENERAL','2024-11-25 01:20:33.3397436+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (108,1,'GENERAL','2024-11-25 01:20:33.3429326+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (109,1,'GENERAL','2024-11-25 01:20:33.3460979+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (110,1,'GENERAL','2024-11-25 01:20:33.3493612+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (111,1,'GENERAL','2024-11-25 01:20:33.3525368+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (112,1,'GENERAL','2024-11-25 01:20:33.3557572+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (113,1,'GENERAL','2024-11-25 01:20:33.3592719+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (114,1,'GENERAL','2024-11-25 01:20:33.3624287+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (115,1,'GENERAL','2024-11-25 01:20:33.3656807+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (116,1,'GENERAL','2024-11-25 01:20:33.3688224+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (117,1,'GENERAL','2024-11-25 01:20:33.372237+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (118,1,'GENERAL','2024-11-25 01:20:33.3757225+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (119,1,'GENERAL','2024-11-25 01:20:33.3792482+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (120,1,'GENERAL','2024-11-25 01:20:33.3818433+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (121,1,'GENERAL','2024-11-25 01:20:33.3852228+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (122,1,'GENERAL','2024-11-25 01:20:33.3887329+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (123,1,'GENERAL','2024-11-25 01:20:33.3925718+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (124,1,'GENERAL','2024-11-25 01:20:33.3959741+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (125,1,'GENERAL','2024-11-25 01:20:33.39951+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (126,1,'GENERAL','2024-11-25 01:20:33.4015138+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (127,1,'GENERAL','2024-11-25 01:20:33.405361+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (128,1,'GENERAL','2024-11-25 01:20:33.408984+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (129,1,'GENERAL','2024-11-25 01:20:33.4121258+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (130,1,'GENERAL','2024-11-25 01:20:33.4158593+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (131,1,'GENERAL','2024-11-25 01:20:33.4188973+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (132,1,'GENERAL','2024-11-25 01:20:33.4221284+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (133,1,'GENERAL','2024-11-25 01:20:33.4256164+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (134,1,'GENERAL','2024-11-25 01:20:33.4287732+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (135,1,'GENERAL','2024-11-25 01:20:33.4326988+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (136,1,'GENERAL','2024-11-25 01:20:33.436127+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (137,1,'GENERAL','2024-11-25 01:20:33.4394601+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (138,1,'GENERAL','2024-11-25 01:20:33.4423248+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (139,1,'GENERAL','2024-11-25 01:20:33.446328+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (140,1,'GENERAL','2024-11-25 01:20:33.4496186+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (141,1,'GENERAL','2024-11-25 01:20:33.453049+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (142,1,'GENERAL','2024-11-25 01:20:33.455588+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (143,1,'GENERAL','2024-11-25 01:20:33.4598705+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (144,1,'GENERAL','2024-11-25 01:20:33.4631037+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (145,1,'GENERAL','2024-11-25 01:20:33.4663497+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (146,1,'GENERAL','2024-11-25 01:20:33.4697466+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (147,1,'GENERAL','2024-11-25 01:20:33.4730889+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (148,1,'GENERAL','2024-11-25 01:20:33.4761151+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (149,1,'GENERAL','2024-11-25 01:20:33.4792979+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (150,1,'GENERAL','2024-11-25 01:20:33.4828469+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (151,1,'GENERAL','2024-11-25 01:20:33.4864878+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (152,1,'GENERAL','2024-11-25 01:20:33.4898265+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (153,1,'GENERAL','2024-11-25 01:20:33.4933242+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (154,1,'GENERAL','2024-11-25 01:20:33.4965799+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (155,1,'GENERAL','2024-11-25 01:20:33.5000636+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (156,1,'GENERAL','2024-11-25 01:20:33.5035888+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (157,1,'GENERAL','2024-11-25 01:20:33.506748+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (158,1,'GENERAL','2024-11-25 01:20:33.5101472+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (159,1,'GENERAL','2024-11-25 01:20:33.5138349+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (160,1,'GENERAL','2024-11-25 01:20:33.517014+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (161,1,'GENERAL','2024-11-25 01:20:33.5201926+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (162,1,'GENERAL','2024-11-25 01:20:33.523785+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (163,1,'GENERAL','2024-11-25 01:20:33.5269333+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (164,1,'GENERAL','2024-11-25 01:20:33.5304135+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (165,1,'GENERAL','2024-11-25 01:20:33.5337574+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (166,1,'GENERAL','2024-11-25 01:20:33.537298+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (167,1,'GENERAL','2024-11-25 01:20:33.5404466+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (168,1,'GENERAL','2024-11-25 01:20:33.5442222+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (169,1,'GENERAL','2024-11-25 01:20:33.5473976+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (170,1,'GENERAL','2024-11-25 01:20:33.5507503+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (171,1,'GENERAL','2024-11-25 01:20:33.5543531+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (172,1,'GENERAL','2024-11-25 01:20:33.557647+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (173,1,'GENERAL','2024-11-25 01:20:33.5607478+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (174,1,'GENERAL','2024-11-25 01:20:33.5643239+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (175,1,'GENERAL','2024-11-25 01:20:33.5676045+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (176,1,'GENERAL','2024-11-25 01:20:33.5710908+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (177,1,'GENERAL','2024-11-25 01:20:33.574351+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (178,1,'GENERAL','2024-11-25 01:20:33.5779346+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (179,1,'GENERAL','2024-11-25 01:20:33.581156+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (180,1,'GENERAL','2024-11-25 01:20:33.584524+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (181,1,'GENERAL','2024-11-25 01:20:33.5875524+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (182,1,'GENERAL','2024-11-25 01:20:33.5911176+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (183,1,'GENERAL','2024-11-25 01:20:33.5944865+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (184,1,'GENERAL','2024-11-25 01:20:33.5978712+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (185,1,'GENERAL','2024-11-25 01:20:33.600894+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (186,1,'GENERAL','2024-11-25 01:20:33.6045572+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (187,1,'GENERAL','2024-11-25 01:20:33.6078928+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (188,1,'GENERAL','2024-11-25 01:20:33.6110249+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (189,1,'GENERAL','2024-11-25 01:20:33.6143066+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (190,1,'GENERAL','2024-11-25 01:20:33.6181157+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (191,1,'GENERAL','2024-11-25 01:20:33.6217651+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (192,1,'GENERAL','2024-11-25 01:20:33.6248022+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (193,1,'GENERAL','2024-11-25 01:20:33.6281467+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (194,1,'GENERAL','2024-11-25 01:20:33.6311601+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (195,1,'GENERAL','2024-11-25 01:20:33.6346419+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (196,1,'GENERAL','2024-11-25 01:20:33.6381469+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (197,1,'GENERAL','2024-11-25 01:20:33.640993+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (198,1,'GENERAL','2024-11-25 01:20:33.6448132+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (199,1,'GENERAL','2024-11-25 01:20:33.648031+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (200,1,'GENERAL','2024-11-25 01:20:33.6511918+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (201,1,'GENERAL','2024-11-25 01:20:33.6544209+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (202,1,'GENERAL','2024-11-25 01:20:33.6575947+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (203,1,'GENERAL','2024-11-25 01:20:33.6607641+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (204,1,'GENERAL','2024-11-25 01:20:33.663911+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (205,1,'GENERAL','2024-11-25 01:20:33.6674515+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (206,1,'GENERAL','2024-11-25 01:20:33.6705743+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (207,1,'GENERAL','2024-11-25 01:20:33.6737732+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (208,1,'GENERAL','2024-11-25 01:20:33.6769198+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (209,1,'GENERAL','2024-11-25 01:20:33.6801136+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (210,1,'GENERAL','2024-11-25 01:20:33.6832737+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (211,1,'GENERAL','2024-11-25 01:20:33.6864211+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (212,1,'GENERAL','2024-11-25 01:20:33.6895543+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (213,1,'GENERAL','2024-11-25 01:20:33.6927279+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (214,1,'GENERAL','2024-11-25 01:20:33.6958948+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (215,1,'GENERAL','2024-11-25 01:20:33.6990415+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (216,1,'GENERAL','2024-11-25 01:20:33.7022136+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (217,1,'GENERAL','2024-11-25 01:20:33.7053929+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (218,1,'GENERAL','2024-11-25 01:20:33.7085866+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (219,1,'GENERAL','2024-11-25 01:20:33.7119734+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (220,1,'GENERAL','2024-11-25 01:20:33.7151307+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (221,1,'GENERAL','2024-11-25 01:20:33.7182956+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (222,1,'GENERAL','2024-11-25 01:20:33.7214826+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (223,1,'GENERAL','2024-11-25 01:20:33.724668+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (224,1,'GENERAL','2024-11-25 01:20:33.7278271+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (225,1,'GENERAL','2024-11-25 01:20:33.7347761+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (226,1,'GENERAL','2024-11-25 01:20:33.7379435+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (227,1,'GENERAL','2024-11-25 01:20:33.7411079+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (228,1,'GENERAL','2024-11-25 01:20:33.7443163+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (229,1,'GENERAL','2024-11-25 01:20:33.7475003+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (230,1,'GENERAL','2024-11-25 01:20:33.7506823+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (231,1,'GENERAL','2024-11-25 01:20:33.7538253+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (232,1,'GENERAL','2024-11-25 01:20:33.7569866+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (233,1,'GENERAL','2024-11-25 01:20:33.7604269+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (234,1,'GENERAL','2024-11-25 01:20:33.7644506+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (235,1,'GENERAL','2024-11-25 01:20:33.7679891+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (236,1,'GENERAL','2024-11-25 01:20:33.7709957+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (237,1,'GENERAL','2024-11-25 01:20:33.774503+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (238,1,'GENERAL','2024-11-25 01:20:33.7775044+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (239,1,'GENERAL','2024-11-25 01:20:33.7814199+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (240,1,'GENERAL','2024-11-25 01:20:33.7845143+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (241,1,'GENERAL','2024-11-25 01:20:33.7876237+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (242,1,'GENERAL','2024-11-25 01:20:33.7907912+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (243,1,'GENERAL','2024-11-25 01:20:33.7942946+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (244,1,'GENERAL','2024-11-25 01:20:33.7971261+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (245,1,'GENERAL','2024-11-25 01:20:33.8006995+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (246,1,'GENERAL','2024-11-25 01:20:33.8039379+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (247,1,'GENERAL','2024-11-25 01:20:33.8072278+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (248,1,'GENERAL','2024-11-25 01:20:33.8103908+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (249,1,'GENERAL','2024-11-25 01:20:33.8130346+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (250,1,'GENERAL','2024-11-25 01:20:33.8166906+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (251,1,'GENERAL','2024-11-25 01:20:33.8198323+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (252,1,'GENERAL','2024-11-25 01:20:33.8231234+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (253,1,'GENERAL','2024-11-25 01:20:33.8263155+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (254,1,'GENERAL','2024-11-25 01:20:33.8295527+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (255,1,'GENERAL','2024-11-25 01:20:33.8326532+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (256,1,'GENERAL','2024-11-25 01:20:33.8359547+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (257,1,'GENERAL','2024-11-25 01:20:33.8384795+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (258,1,'GENERAL','2024-11-25 01:20:33.8418933+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (259,1,'GENERAL','2024-11-25 01:20:33.845894+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (260,1,'GENERAL','2024-11-25 01:20:33.8487757+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (261,1,'GENERAL','2024-11-25 01:20:33.8523263+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (262,1,'GENERAL','2024-11-25 01:20:33.8553669+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (263,1,'GENERAL','2024-11-25 01:20:33.8557321+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (264,1,'GENERAL','2024-11-25 01:20:33.8627383+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (265,1,'GENERAL','2024-11-25 01:20:33.8627383+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (266,1,'GENERAL','2024-11-25 01:20:33.8627383+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (267,1,'GENERAL','2024-11-25 01:20:33.8725352+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (268,1,'GENERAL','2024-11-25 01:20:33.8760475+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (269,1,'GENERAL','2024-11-25 01:20:33.8796725+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (270,1,'GENERAL','2024-11-25 01:20:33.8829014+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (271,1,'GENERAL','2024-11-25 01:20:33.886189+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (272,1,'GENERAL','2024-11-25 01:20:33.8894316+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (273,1,'GENERAL','2024-11-25 01:20:33.8925635+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (274,1,'GENERAL','2024-11-25 01:20:33.8957346+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (275,1,'GENERAL','2024-11-25 01:20:33.8990075+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (276,1,'GENERAL','2024-11-25 01:20:33.901578+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (277,1,'GENERAL','2024-11-25 01:20:33.9043765+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (278,1,'GENERAL','2024-11-25 01:20:33.9083223+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (279,1,'GENERAL','2024-11-25 01:20:33.9122513+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (280,1,'GENERAL','2024-11-25 01:20:33.915693+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (281,1,'GENERAL','2024-11-25 01:20:33.9187789+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (282,1,'GENERAL','2024-11-25 01:20:33.9219468+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (283,1,'GENERAL','2024-11-25 01:20:33.9251055+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (284,1,'GENERAL','2024-11-25 01:20:33.9284935+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (285,1,'GENERAL','2024-11-25 01:20:33.9319152+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (286,1,'GENERAL','2024-11-25 01:20:33.9358517+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (287,1,'GENERAL','2024-11-25 01:20:33.9391429+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (288,1,'GENERAL','2024-11-25 01:20:33.9421672+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (289,1,'GENERAL','2024-11-25 01:20:33.9464394+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (290,1,'GENERAL','2024-11-25 01:20:33.949786+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (291,1,'GENERAL','2024-11-25 01:20:33.9537337+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (292,1,'GENERAL','2024-11-25 01:20:33.9559874+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (293,1,'GENERAL','2024-11-25 01:20:33.9609289+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (294,1,'GENERAL','2024-11-25 01:20:33.9643302+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (295,1,'GENERAL','2024-11-25 01:20:33.967357+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (296,1,'GENERAL','2024-11-25 01:20:33.9712606+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (297,1,'GENERAL','2024-11-25 01:20:33.9743374+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (298,1,'GENERAL','2024-11-25 01:20:33.978313+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (299,1,'GENERAL','2024-11-25 01:20:33.9817688+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (300,1,'GENERAL','2024-11-25 01:20:33.9852242+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (301,1,'GENERAL','2024-11-25 01:20:33.9882002+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (302,1,'GENERAL','2024-11-25 01:20:33.991913+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (303,1,'GENERAL','2024-11-25 01:20:33.9951609+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (304,1,'GENERAL','2024-11-25 01:20:33.9985071+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (305,1,'GENERAL','2024-11-25 01:20:34.0021988+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (306,1,'GENERAL','2024-11-25 01:20:34.0055487+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (307,1,'GENERAL','2024-11-25 01:20:34.0090222+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (308,1,'GENERAL','2024-11-25 01:20:34.0117059+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (309,1,'GENERAL','2024-11-25 01:20:34.0154822+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (310,1,'GENERAL','2024-11-25 01:20:34.0172171+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (311,1,'GENERAL','2024-11-25 01:20:34.02243+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (312,1,'GENERAL','2024-11-25 01:20:34.0259119+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (313,1,'GENERAL','2024-11-25 01:20:34.0293396+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (314,1,'GENERAL','2024-11-25 01:20:34.0325475+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (315,1,'GENERAL','2024-11-25 01:20:34.0362419+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (316,1,'GENERAL','2024-11-25 01:20:34.0396714+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (317,1,'GENERAL','2024-11-25 01:20:34.0437416+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (318,1,'GENERAL','2024-11-25 01:20:34.0484735+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (319,1,'GENERAL','2024-11-25 01:20:34.0523824+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (320,1,'GENERAL','2024-11-25 01:20:34.0560438+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (321,1,'GENERAL','2024-11-25 01:20:34.0597128+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (322,1,'GENERAL','2024-11-25 01:20:34.0633797+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (323,1,'GENERAL','2024-11-25 01:20:34.0669591+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (324,1,'GENERAL','2024-11-25 01:20:34.0706129+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (325,1,'GENERAL','2024-11-25 01:20:34.0737915+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (326,1,'GENERAL','2024-11-25 01:20:34.0769608+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (327,1,'GENERAL','2024-11-25 01:20:34.0800884+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (328,1,'GENERAL','2024-11-25 01:20:34.0832556+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (329,1,'GENERAL','2024-11-25 01:20:34.0864062+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (330,1,'GENERAL','2024-11-25 01:20:34.0896224+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (331,1,'GENERAL','2024-11-25 01:20:34.0927169+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (332,1,'GENERAL','2024-11-25 01:20:34.0958492+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (333,1,'GENERAL','2024-11-25 01:20:34.0989355+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (334,1,'GENERAL','2024-11-25 01:20:34.1019518+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (335,1,'GENERAL','2024-11-25 01:20:34.1057135+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (336,1,'GENERAL','2024-11-25 01:20:34.1094249+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (337,1,'GENERAL','2024-11-25 01:20:34.1128345+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (338,1,'GENERAL','2024-11-25 01:20:34.1159223+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (339,1,'GENERAL','2024-11-25 01:20:34.1190831+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (340,1,'GENERAL','2024-11-25 01:20:34.1227237+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (341,1,'GENERAL','2024-11-25 01:20:34.1260374+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (342,1,'GENERAL','2024-11-25 01:20:34.1291687+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (343,1,'GENERAL','2024-11-25 01:20:34.1328205+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (344,1,'GENERAL','2024-11-25 01:20:34.1360556+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (345,1,'GENERAL','2024-11-25 01:20:34.1381385+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (346,1,'GENERAL','2024-11-25 01:20:34.1425244+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (347,1,'GENERAL','2024-11-25 01:20:34.1455283+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (348,1,'GENERAL','2024-11-25 01:20:34.1489986+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (349,1,'GENERAL','2024-11-25 01:20:34.1519982+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (350,1,'GENERAL','2024-11-25 01:20:34.1544084+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (351,1,'GENERAL','2024-11-25 01:20:34.1591273+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (352,1,'GENERAL','2024-11-25 01:20:34.162265+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (353,1,'GENERAL','2024-11-25 01:20:34.1654362+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (354,1,'GENERAL','2024-11-25 01:20:34.1685813+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (355,1,'GENERAL','2024-11-25 01:20:34.17174+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (356,1,'GENERAL','2024-11-25 01:20:34.1749218+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (357,1,'GENERAL','2024-11-25 01:20:34.1780959+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (358,1,'GENERAL','2024-11-25 01:20:34.1815742+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (359,1,'GENERAL','2024-11-25 01:20:34.1848401+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (360,1,'GENERAL','2024-11-25 01:20:34.187999+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (361,1,'GENERAL','2024-11-25 01:20:34.1911765+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (362,1,'GENERAL','2024-11-25 01:20:34.1938139+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (363,1,'GENERAL','2024-11-25 01:20:34.1978229+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (364,1,'GENERAL','2024-11-25 01:20:34.201459+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (365,1,'GENERAL','2024-11-25 01:20:34.2051657+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (366,1,'GENERAL','2024-11-25 01:20:34.2080637+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (367,1,'GENERAL','2024-11-25 01:20:34.2121505+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (368,1,'GENERAL','2024-11-25 01:22:06.1084639+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (369,1,'GENERAL','2024-11-25 01:22:06.1171295+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (370,1,'GENERAL','2024-11-25 01:22:06.1171295+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (371,1,'GENERAL','2024-11-25 01:22:06.1241888+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (372,1,'GENERAL','2024-11-25 01:22:06.1288712+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (373,1,'GENERAL','2024-11-25 01:22:06.1320348+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (374,1,'GENERAL','2024-11-25 01:22:06.1357297+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (375,1,'GENERAL','2024-11-25 01:22:06.1388685+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (376,1,'GENERAL','2024-11-25 01:22:06.1420139+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (377,1,'GENERAL','2024-11-25 01:22:06.1451978+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (378,1,'GENERAL','2024-11-25 01:22:06.1485749+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (379,1,'GENERAL','2024-11-25 01:22:06.1517067+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (380,1,'GENERAL','2024-11-25 01:22:06.1548754+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (381,1,'GENERAL','2024-11-25 01:22:06.158514+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (382,1,'GENERAL','2024-11-25 01:22:06.1619253+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (383,1,'GENERAL','2024-11-25 01:22:06.1652127+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (384,1,'GENERAL','2024-11-25 01:22:06.1683221+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (385,1,'GENERAL','2024-11-25 01:22:06.1717922+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (386,1,'GENERAL','2024-11-25 01:22:06.1748892+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (387,1,'GENERAL','2024-11-25 01:22:06.1779897+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (388,1,'GENERAL','2024-11-25 01:22:06.1816091+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (389,1,'GENERAL','2024-11-25 01:22:06.1847142+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (390,1,'GENERAL','2024-11-25 01:22:06.1878236+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (391,1,'GENERAL','2024-11-25 01:22:06.1909238+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (392,1,'GENERAL','2024-11-25 01:22:06.1945497+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (393,1,'GENERAL','2024-11-25 01:22:06.1976392+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (394,1,'GENERAL','2024-11-25 01:22:06.2012272+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (395,1,'GENERAL','2024-11-25 01:22:06.204357+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (396,1,'GENERAL','2024-11-25 01:22:06.2074515+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (397,1,'GENERAL','2024-11-25 01:22:06.2105699+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (398,1,'GENERAL','2024-11-25 01:22:06.213667+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (399,1,'GENERAL','2024-11-25 01:22:06.2173782+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (400,1,'GENERAL','2024-11-25 01:22:06.2209342+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (401,1,'GENERAL','2024-11-25 01:22:06.2240935+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (402,1,'GENERAL','2024-11-25 01:22:06.2272338+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (403,1,'GENERAL','2024-11-25 01:22:06.2303768+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (404,1,'GENERAL','2024-11-25 01:22:06.234094+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (405,1,'GENERAL','2024-11-25 01:22:06.2372805+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (406,1,'GENERAL','2024-11-25 01:22:06.2408987+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (407,1,'GENERAL','2024-11-25 01:22:06.2440694+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (408,1,'GENERAL','2024-11-25 01:22:06.2466898+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (409,1,'GENERAL','2024-11-25 01:22:06.2482175+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (410,1,'GENERAL','2024-11-25 01:22:06.2512381+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (411,1,'GENERAL','2024-11-25 01:24:50.4689126+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (412,1,'GENERAL','2024-11-25 01:24:50.4727959+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (413,1,'GENERAL','2024-11-25 01:24:50.477102+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (414,1,'GENERAL','2024-11-25 01:24:50.4802713+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (415,1,'GENERAL','2024-11-25 01:24:50.4834406+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (416,1,'GENERAL','2024-11-25 01:24:50.4870877+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (417,1,'GENERAL','2024-11-25 01:24:50.4896969+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (418,1,'GENERAL','2024-11-25 01:24:50.4922562+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (419,1,'GENERAL','2024-11-25 01:24:50.4967427+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (420,1,'GENERAL','2024-11-25 01:24:50.5003335+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (421,1,'GENERAL','2024-11-25 01:24:50.5039483+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (422,1,'GENERAL','2024-11-25 01:24:50.5075051+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (423,1,'GENERAL','2024-11-25 01:24:50.5112044+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (424,1,'GENERAL','2024-11-25 01:24:50.5147022+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (425,1,'GENERAL','2024-11-25 01:24:50.5179014+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (426,1,'GENERAL','2024-11-25 01:24:50.5219204+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (427,1,'GENERAL','2024-11-25 01:24:50.5252463+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (428,1,'GENERAL','2024-11-25 01:24:50.5286082+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (429,1,'GENERAL','2024-11-25 01:24:50.5323108+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (430,1,'GENERAL','2024-11-25 01:24:50.535532+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (431,1,'GENERAL','2024-11-25 01:24:50.539226+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (432,1,'GENERAL','2024-11-25 01:24:50.5426637+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (433,1,'GENERAL','2024-11-25 01:24:50.5457943+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (434,1,'GENERAL','2024-11-25 01:24:50.5494767+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (435,1,'GENERAL','2024-11-25 01:24:50.5526363+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (436,1,'GENERAL','2024-11-25 01:24:50.5564068+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (437,1,'GENERAL','2024-11-25 01:24:50.5595091+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (438,1,'GENERAL','2024-11-25 01:24:50.5629179+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (439,1,'GENERAL','2024-11-25 01:24:50.5666269+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (440,1,'GENERAL','2024-11-25 01:24:50.569295+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (441,1,'GENERAL','2024-11-25 01:24:50.5718897+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (442,1,'GENERAL','2024-11-25 01:24:50.577025+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (443,1,'GENERAL','2024-11-25 01:24:50.5801656+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (444,1,'GENERAL','2024-11-25 01:24:50.5840453+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (445,1,'GENERAL','2024-11-25 01:24:50.5872835+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (446,1,'GENERAL','2024-11-25 01:24:50.5909332+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (447,1,'GENERAL','2024-11-25 01:24:50.5946114+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (448,1,'GENERAL','2024-11-25 01:24:50.5981924+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (449,1,'GENERAL','2024-11-25 01:24:50.6013449+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (450,1,'GENERAL','2024-11-25 01:24:50.6048416+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (451,1,'GENERAL','2024-11-25 01:24:50.6085367+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (452,1,'GENERAL','2024-11-25 01:24:50.6120904+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (453,1,'GENERAL','2024-11-25 01:24:50.6152313+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (454,1,'GENERAL','2024-11-25 01:24:50.6190612+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (455,1,'GENERAL','2024-11-25 01:24:50.6222171+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (456,1,'GENERAL','2024-11-25 01:24:50.6259664+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (457,1,'GENERAL','2024-11-25 01:24:50.6291093+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (458,1,'GENERAL','2024-11-25 01:24:50.6329276+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (459,1,'GENERAL','2024-11-25 01:24:50.6366113+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (460,1,'GENERAL','2024-11-25 01:24:50.6400938+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (461,1,'GENERAL','2024-11-25 01:24:50.6432219+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (462,1,'GENERAL','2024-11-25 01:24:50.6467314+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (463,1,'GENERAL','2024-11-25 01:24:50.6502308+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (464,1,'GENERAL','2024-11-25 01:24:50.6538653+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (465,1,'GENERAL','2024-11-25 01:24:50.6571036+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (466,1,'GENERAL','2024-11-25 01:24:50.6608075+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (467,1,'GENERAL','2024-11-25 01:24:50.6643295+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (468,1,'GENERAL','2024-11-25 01:24:50.6670026+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (469,1,'GENERAL','2024-11-25 01:24:50.6708872+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (470,1,'GENERAL','2024-11-25 01:24:50.6748139+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (471,1,'GENERAL','2024-11-25 01:24:50.6782411+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (472,1,'GENERAL','2024-11-25 01:24:50.6830691+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (473,1,'GENERAL','2024-11-25 01:24:50.6866656+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (474,1,'GENERAL','2024-11-25 01:24:50.689891+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (475,1,'GENERAL','2024-11-25 01:24:50.6933599+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (476,1,'GENERAL','2024-11-25 01:24:50.6970191+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (477,1,'GENERAL','2024-11-25 01:24:50.7003354+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (478,1,'GENERAL','2024-11-25 01:24:50.704188+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (479,1,'GENERAL','2024-11-25 01:24:50.7077335+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (480,1,'GENERAL','2024-11-25 01:24:50.7118275+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (481,1,'GENERAL','2024-11-25 01:24:50.7152243+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (482,1,'GENERAL','2024-11-25 01:24:50.7189173+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (483,1,'GENERAL','2024-11-25 01:24:50.7225925+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (484,1,'GENERAL','2024-11-25 01:24:50.7258319+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (485,1,'GENERAL','2024-11-25 01:24:50.7296175+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (486,1,'GENERAL','2024-11-25 01:24:50.7334334+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (487,1,'GENERAL','2024-11-25 01:24:50.7373398+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (488,1,'GENERAL','2024-11-25 01:24:50.7410365+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (489,1,'GENERAL','2024-11-25 01:24:50.7445307+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (490,1,'GENERAL','2024-11-25 01:24:50.7478865+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (491,1,'GENERAL','2024-11-25 01:24:50.752012+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (492,1,'GENERAL','2024-11-25 01:24:50.755822+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (493,1,'GENERAL','2024-11-25 01:24:50.7595753+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (494,1,'GENERAL','2024-11-25 01:24:50.7627765+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (495,1,'GENERAL','2024-11-25 01:24:50.7665903+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (496,1,'GENERAL','2024-11-25 01:24:50.7697509+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (497,1,'GENERAL','2024-11-25 01:24:50.7736726+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (498,1,'GENERAL','2024-11-25 01:24:50.7774138+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (499,1,'GENERAL','2024-11-25 01:24:50.7809441+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (500,1,'GENERAL','2024-11-25 01:24:50.7847885+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (501,1,'GENERAL','2024-11-25 01:24:50.7884326+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (502,1,'GENERAL','2024-11-25 01:24:50.7919289+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (503,1,'GENERAL','2024-11-25 01:24:50.7955709+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (504,1,'GENERAL','2024-11-25 01:24:50.7993276+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (505,1,'GENERAL','2024-11-25 01:24:50.8029957+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (506,1,'GENERAL','2024-11-25 01:24:50.8063756+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (507,1,'GENERAL','2024-11-25 01:24:50.8100789+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (508,1,'GENERAL','2024-11-25 01:24:50.8134186+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (509,1,'GENERAL','2024-11-25 01:24:50.8174789+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (510,1,'GENERAL','2024-11-25 01:24:50.8214143+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (511,1,'GENERAL','2024-11-25 01:24:50.8245393+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (512,1,'GENERAL','2024-11-25 01:24:50.8277137+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (513,1,'GENERAL','2024-11-25 01:24:50.8322267+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (514,1,'GENERAL','2024-11-25 01:24:50.8359478+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (515,1,'GENERAL','2024-11-25 01:24:50.8397157+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (516,1,'GENERAL','2024-11-25 01:24:50.8432743+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (517,1,'GENERAL','2024-11-25 01:24:50.8471267+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (518,1,'GENERAL','2024-11-25 01:24:50.8505326+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (519,1,'GENERAL','2024-11-25 01:24:50.854106+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (520,1,'GENERAL','2024-11-25 01:24:50.8576594+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (521,1,'GENERAL','2024-11-25 01:24:50.8614426+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (522,1,'GENERAL','2024-11-25 01:24:50.8644898+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (523,1,'GENERAL','2024-11-25 01:24:50.8682377+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (524,1,'GENERAL','2024-11-25 01:24:50.8697463+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (525,1,'GENERAL','2024-11-25 01:24:50.8751432+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (526,1,'GENERAL','2024-11-25 01:24:50.8751432+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (527,1,'GENERAL','2024-11-25 01:24:50.8822828+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (528,1,'GENERAL','2024-11-25 01:24:50.8860166+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (529,1,'GENERAL','2024-11-25 01:24:50.8892242+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (530,1,'GENERAL','2024-11-25 01:24:50.8928944+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (531,1,'GENERAL','2024-11-25 01:24:50.8961383+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (532,1,'GENERAL','2024-11-25 01:24:50.899841+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (533,1,'GENERAL','2024-11-25 01:24:50.9030622+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (534,1,'GENERAL','2024-11-25 01:24:50.9066212+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (535,1,'GENERAL','2024-11-25 01:24:50.9100019+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (536,1,'GENERAL','2024-11-25 01:24:50.9132207+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (537,1,'GENERAL','2024-11-25 01:24:50.917015+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (538,1,'GENERAL','2024-11-25 01:24:50.9201626+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (539,1,'GENERAL','2024-11-25 01:24:50.9234815+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (540,1,'GENERAL','2024-11-25 01:24:50.9273249+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (541,1,'GENERAL','2024-11-25 01:24:50.9304283+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (542,1,'GENERAL','2024-11-25 01:24:50.9341183+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (543,1,'GENERAL','2024-11-25 01:24:50.9373046+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (544,1,'GENERAL','2024-11-25 01:24:50.9409845+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (545,1,'GENERAL','2024-11-25 01:24:50.9443137+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (546,1,'GENERAL','2024-11-25 01:24:50.9479812+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (547,1,'GENERAL','2024-11-25 01:24:50.951253+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (548,1,'GENERAL','2024-11-25 01:24:50.9543798+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (549,1,'GENERAL','2024-11-25 01:24:50.9581149+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (550,1,'GENERAL','2024-11-25 01:24:50.9617948+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (551,1,'GENERAL','2024-11-25 01:24:50.9650208+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (552,1,'GENERAL','2024-11-25 01:24:50.9686726+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (553,1,'GENERAL','2024-11-25 01:24:50.9719756+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (554,1,'GENERAL','2024-11-25 01:24:50.975668+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (555,1,'GENERAL','2024-11-25 01:24:50.9789831+07:00',NULL);
INSERT INTO "parking_card_zones" VALUES (556,1,'GENERAL','2024-11-25 01:24:50.9830686+07:00',NULL);
INSERT INTO "history_memberships" VALUES (1,'2024-11-25 01:20:31.2429034+07:00','2024-11-25 01:20:31.2429034+07:00',NULL,'2004-01-01 00:00:00+00:00','2025-01-01 00:00:00+00:00',1);
INSERT INTO "history_memberships" VALUES (2,'2024-11-25 01:20:31.2462399+07:00','2024-11-25 01:20:31.2462399+07:00',NULL,'2004-01-02 00:00:00+00:00','2025-01-02 00:00:00+00:00',2);
INSERT INTO "history_memberships" VALUES (3,'2024-11-25 01:20:31.249946+07:00','2024-11-25 01:20:31.249946+07:00',NULL,'2004-01-03 00:00:00+00:00','2025-01-03 00:00:00+00:00',3);
INSERT INTO "history_memberships" VALUES (4,'2024-11-25 01:20:31.2527073+07:00','2024-11-25 01:20:31.2527073+07:00',NULL,'2004-01-04 00:00:00+00:00','2025-01-04 00:00:00+00:00',4);
INSERT INTO "history_memberships" VALUES (5,'2024-11-25 01:20:31.2542251+07:00','2024-11-25 01:20:31.2542251+07:00',NULL,'2004-01-05 00:00:00+00:00','2025-01-05 00:00:00+00:00',5);
INSERT INTO "history_memberships" VALUES (6,'2024-11-25 01:20:31.2590622+07:00','2024-11-25 01:20:31.2590622+07:00',NULL,'2004-01-06 00:00:00+00:00','2025-01-06 00:00:00+00:00',6);
INSERT INTO "history_memberships" VALUES (7,'2024-11-25 01:20:31.263108+07:00','2024-11-25 01:20:31.263108+07:00',NULL,'2004-01-07 00:00:00+00:00','2025-01-07 00:00:00+00:00',7);
INSERT INTO "history_memberships" VALUES (8,'2024-11-25 01:20:31.2670973+07:00','2024-11-25 01:20:31.2670973+07:00',NULL,'2004-01-08 00:00:00+00:00','2025-01-08 00:00:00+00:00',8);
INSERT INTO "history_memberships" VALUES (9,'2024-11-25 01:20:31.2708028+07:00','2024-11-25 01:20:31.2708028+07:00',NULL,'2004-01-09 00:00:00+00:00','2025-01-09 00:00:00+00:00',9);
INSERT INTO "history_memberships" VALUES (10,'2024-11-25 01:20:31.2739841+07:00','2024-11-25 01:20:31.2739841+07:00',NULL,'2004-01-10 00:00:00+00:00','2025-01-10 00:00:00+00:00',10);
INSERT INTO "parking_zones" VALUES (1,'2024-11-25 01:20:31.2777108+07:00','2024-11-25 01:20:31.2777108+07:00',NULL,'GENERAL',500,500);
INSERT INTO "parking_zones" VALUES (2,'2024-11-25 01:20:31.2814601+07:00','2024-11-25 01:20:31.2814601+07:00',NULL,'VIP',150,150);
INSERT INTO "parking_zones" VALUES (3,'2024-11-25 01:20:31.285506+07:00','2024-11-25 01:20:31.285506+07:00',NULL,'STORE',150,150);
INSERT INTO "parking_fee_policies" VALUES (1,'2024-11-25 01:20:34.2151528+07:00','2024-11-25 01:20:34.2151528+07:00',NULL,3.0,20.0,'2024-11-25 01:20:34.2151528+07:00',0.0,50.0,0,1);
INSERT INTO "parking_fee_policies" VALUES (2,'2024-11-25 01:20:34.2177076+07:00','2024-11-25 01:20:34.2177076+07:00',NULL,4.0,20.0,'2024-11-25 01:20:34.2151528+07:00',20.0,50.0,0,2);
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
CREATE INDEX IF NOT EXISTS "idx_parking_cards_deleted_at" ON "parking_cards" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_history_memberships_deleted_at" ON "history_memberships" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_parking_zones_deleted_at" ON "parking_zones" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_parking_fee_policies_deleted_at" ON "parking_fee_policies" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_usage_cards_deleted_at" ON "usage_cards" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_parking_payments_deleted_at" ON "parking_payments" (
	"deleted_at"
);
COMMIT;
