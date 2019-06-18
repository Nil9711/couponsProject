use project3;
INSERT INTO `companies` (`company_id`, `company_email`, `company_name`) VALUES ('1','Apple@icloud.com', 'Apple');
INSERT INTO `companies` (`company_email`, `company_name`) VALUES ('Google@gmail.com', 'Google');
INSERT INTO `project3`.`coupons`
(`coupon_id`,
`coupon_amount`,
`coupon_category`,
`coupon_description`,
`coupon_title`,
`coupon_end_date`,
`coupon_img`,
`coupon_price`,
`coupon_start_date`,
`company_company_id`)
VALUES
(1,1,3,'TITLE','DESCRIPTION','2019-06-20',null, 195,'2019-06-17',1);
INSERT INTO `project3`.`coupons`
(`coupon_id`,
`coupon_amount`,
`coupon_category`,
`coupon_description`,
`coupon_title`,
`coupon_end_date`,
`coupon_img`,
`coupon_price`,
`coupon_start_date`,
`company_company_id`)
VALUES
(2,1,5,'TITTLEEE','DESCRIPTION','2019-06-20',null, 200,'2019-06-17',1);
INSERT INTO `project3`.`users`
(`user_id`,
`user_name`,
`user_password`,
`user_type`,
`company_company_id`)
VALUES
(1,'nil','1','CUSTOMER',null);
INSERT INTO `project3`.`customers`
(`customer_first_name`,
`customer_last_name`,
`user_user_id`)
VALUES
('nil','golan',1);
INSERT INTO `project3`.`purchases`
(`purchase_id`,
`purchase_amount`,
`coupon_coupon_id`,
`customer_user_user_id`)
VALUES
(1,1,1,1);
INSERT INTO `project3`.`purchases`
(`purchase_id`,
`purchase_amount`,
`coupon_coupon_id`,
`customer_user_user_id`)
VALUES
(2,3,2,1);








