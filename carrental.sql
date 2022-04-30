SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `carRental` DEFAULT CHARACTER SET utf8 ;
USE `carRental` ;

-- -----------------------------------------------------
-- Table `carRental`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carRental`.`customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `mobileNo` char(10) NOT NULL,
  PRIMARY KEY (`customer_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carRental`.`carType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carRental`.`carType` (
  `carTypeId` TINYINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`carTypeId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carRental`.`car`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carRental`.`car` (
  `car_ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `fuel_type` VARCHAR(45) NOT NULL,
  `carType` TINYINT NOT NULL,
  `transmission` VARCHAR(45) NOT NULL,
  `base_price` DECIMAL(9,2) NOT NULL,
  `seats` TINYINT NOT NULL,
  PRIMARY KEY (`car_ID`),
  INDEX `fk_car_carType1_idx` (`carType` ASC) VISIBLE,
  CONSTRAINT `fk_car_carType1`
    FOREIGN KEY (`carType`)
    REFERENCES `carRental`.`carType` (`carTypeId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carRental`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carRental`.`location` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `location_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carRental`.`rent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carRental`.`rent` (
  `rent_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `location_id` INT NOT NULL,
  `car_ID` INT NOT NULL,
  `pickupDate` DATETIME NOT NULL,
  `dropDate` DATETIME NOT NULL,
  PRIMARY KEY (`rent_id`),
  INDEX `fk_rent_location1_idx` (`location_id` ASC) VISIBLE,
  INDEX `fk_rent_car1_idx` (`car_ID` ASC) VISIBLE,
  CONSTRAINT `fk_rent_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `carRental`.`customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_rent_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `carRental`.`location` (`location_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_rent_car1`
    FOREIGN KEY (`car_ID`)
    REFERENCES `carRental`.`car` (`car_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carRental`.`carAvl`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carRental`.`carAvl` (
  `location_id` INT NOT NULL,
  `car_ID` INT NOT NULL,
  `totalCars` INT NOT NULL,
  `currentAvl` INT NOT NULL,
  PRIMARY KEY (`location_id`, `car_ID`),
  INDEX `fk_carAvl_location1_idx` (`location_id` ASC) VISIBLE,
  INDEX `fk_carAvl_car1_idx` (`car_ID` ASC) VISIBLE,
  CONSTRAINT `fk_carAvl_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `carRental`.`location` (`location_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_carAvl_car1`
    FOREIGN KEY (`car_ID`)
    REFERENCES `carRental`.`car` (`car_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carRental`.`carStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carRental`.`carStatus` (
  `statusId` TINYINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`statusId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carRental`.`rentDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carRental`.`rentDetails` (
  `rent_id` INT NOT NULL,
  `statusId` TINYINT NOT NULL,
  `total_rental_cost` DECIMAL(9,2) NOT NULL,
  `total_payment` DECIMAL(9,2) NOT NULL,
  `trxnID` INT NULL,
  INDEX `fk_rentDetails_rent1_idx` (`rent_id` ASC) VISIBLE,
  PRIMARY KEY (`rent_id`),
  INDEX `fk_rentDetails_carStatus1_idx` (`statusId` ASC) VISIBLE,
  CONSTRAINT `fk_rentDetails_rent1`
    FOREIGN KEY (`rent_id`)
    REFERENCES `carRental`.`rent` (`rent_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rentDetails_carStatus1`
    FOREIGN KEY (`statusId`)
    REFERENCES `carRental`.`carStatus` (`statusId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carRental`.`waitList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carRental`.`waitList` (
  `rent_id` INT NOT NULL,
  `carAvl` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`rent_id`),
  CONSTRAINT `fk_waitList_rent1`
    FOREIGN KEY (`rent_id`)
    REFERENCES `carRental`.`rent` (`rent_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Procedure `carRental`.`putCustomer`
-- -----------------------------------------------------
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `putCustomer`(
	f_name VARCHAR(50),
    l_name VARCHAR(50),
    emailId VARCHAR(255),
    city_p VARCHAR(45),
    mobile CHAR(10)
)
BEGIN
	set transaction isolation level serializable;
    START transaction;
	INSERT INTO customer (first_name,last_name,email,city,mobileNo)
	SELECT * FROM (SELECT f_name,l_name,emailId,city_p,mobile) AS temp
	WHERE NOT EXISTS (
		SELECT email,mobileNo 
        FROM customer 
        WHERE email = emailId AND mobile = mobileNo
	) LIMIT 1;
    if @@error_count != 0 then
		ROLLBACK;
        SIGNAL SQLSTATE '22003' 
			SET MESSAGE_TEXT = 'No cars available';
	else
		commit;
    end if;
END$$
DELIMITER ;

-- -----------------------------------------------------
-- Procedure `carRental`.`search_car`
-- -----------------------------------------------------
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `search_car`(
	car_type VARCHAR(45),
    fuel_type VARCHAR(45),
    transmission VARCHAR(45),
    seats TINYINT,
    location VARCHAR(45)
)
BEGIN
	DECLARE locId INTEGER;
    set transaction isolation level repeatable read;
    start transaction;
    SELECT location_id INTO locId 
    FROM location WHERE location_name = location;
	IF car_type IS NOT NULL THEN
    SELECT *
    FROM caravl
    WHERE car_ID IN (
		SELECT car_ID
        FROM car c
        JOIN cartype ct ON (c.carType = ct.carTypeId)
        WHERE ct.name = car_type AND
        c.fuel_type = IFNULL(fuel_type,c.fuel_type) AND
		c.transmission = IFNULL(transmission,c.transmission) AND
		c.seats = IFNULL(seats,c.seats)
       ) AND location_id=locId;
	ELSE
    SELECT *
    FROM caravl
    WHERE car_ID IN (
		SELECT car_ID
		FROM car c
		WHERE c.fuel_type = IFNULL(fuel_type,c.fuel_type) AND
		c.transmission = IFNULL(transmission,c.transmission) AND
		c.seats = IFNULL(seats,c.seats)
        ) AND location_id=locId;
	END IF;
    commit;
END$$
DELIMITER ;

-- -----------------------------------------------------
-- Procedure `carRental`.`display_car_details`
-- -----------------------------------------------------
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `display_car_details`(
	car_ID INT
)
BEGIN
	SELECT car_ID,c.name,fuel_type,ct.name as carType,transmission,base_price,seats
    FROM car c
    JOIN cartype ct ON(c.carType = ct.carTypeId)
    WHERE c.car_ID = car_ID;
END$$
DELIMITER ;

-- -----------------------------------------------------
-- Procedure `carRental`.`rental_cost`
-- -----------------------------------------------------
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rental_cost`(
	carID INTEGER,
    pickupDt datetime,
    dropDt datetime,
    OUT weekdays_charges DECIMAL(9,2),
    OUT weekends_charges DECIMAL(9,2),
    OUT cost DECIMAL (9,2)
)
BEGIN
    DECLARE total_num_of_days INTEGER;
    DECLARE num_of_weekdays INTEGER;
    DECLARE num_of_weekends INTEGER;
    DECLARE base_p DECIMAL(6,2);
    DECLARE temp INTEGER;
    DECLARE tempdt DATETIME;
    DECLARE midnight INTEGER;
    set transaction isolation level repeatable read;
    start transaction;
    SET midnight = 24;
    SET num_of_weekends = 0;
    SET num_of_weekdays = 0;
    SET tempdt = pickupDt;
    SELECT base_price INTO base_p
    FROM car WHERE car_ID = carID;
    SET total_num_of_days = DATEDIFF(dropDt,pickupDt);
    if total_num_of_days=0 THEN 
		if EXTRACT(day from pickupDt)=EXTRACT(day from dropDt) THEN
			SET temp = DAYOFWEEK(pickupDt); 
			IF temp = 1 OR temp=7 
				THEN SET num_of_weekends = num_of_weekends + 1;
			ELSE SET num_of_weekdays = num_of_weekdays+1;
			END IF;
		else 
			if midnight-EXTRACT(HOUR FROM pickupDt)>EXTRACT(HOUR FROM dropDt) THEN
				SET temp = DAYOFWEEK(pickupDt); 
				IF temp = 1 OR temp=7 
					THEN SET num_of_weekends = num_of_weekends + 1;
				ELSE SET num_of_weekdays = num_of_weekdays+1;
				END IF;
			else
				SET temp = DAYOFWEEK(dropDt); 
				IF temp = 1 OR temp=7 
					THEN SET num_of_weekends = num_of_weekends + 1;
				ELSE SET num_of_weekdays = num_of_weekdays+1;
				END IF;
			end if;
		end if;
	else
		calc_weekdays: LOOP
			SET temp = DAYOFWEEK(tempdt); 
			IF temp = 1 OR temp=7 
				THEN SET num_of_weekends = num_of_weekends + 1;
			ELSE SET num_of_weekdays = num_of_weekdays+1;
			END IF;
			SET tempdt = DATE_ADD(tempdt, INTERVAL 1 DAY);
			SET total_num_of_days = total_num_of_days-1;
			IF total_num_of_days = 0
				THEN LEAVE calc_weekdays;
			END IF;
		END LOOP calc_weekdays;
	end if;
    SET weekdays_charges = num_of_weekdays*base_p;
    SET weekends_charges = num_of_weekends*base_p*1.5;
    SET cost = weekdays_charges+weekends_charges;
    commit;
END$$
DELIMITER ;

-- -----------------------------------------------------
-- Procedure `carRental`.`booking`
-- -----------------------------------------------------
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `booking`(
	cust_id INT,
    location VARCHAR(45),
    carid INT,
    pickupDt DATETIME,
    dropDt DATETIME,
    rental_cost DECIMAL(9,2)
)
BEGIN
	DECLARE zeroornot INTEGER;
    DECLARE rent_id INTEGER;
    DECLARE trxnid INTEGER;
    DECLARE loc_id INTEGER;
    DECLARE currAvl INTEGER;
    set transaction isolation level serializable;
    START transaction;
    SELECT location_id INTO loc_id 
    FROM location WHERE location_name = location;
    select exists(select 1 from rent) into zeroornot;
    IF zeroornot = 0 THEN
		INSERT INTO rent
        VALUES(10000,cust_id,loc_id,carid,pickupDt,dropDt);
        SET @rent_id = 10000;
	ELSE
		INSERT INTO rent(customer_id,location_id,car_id,pickupDate,dropDate)
		VALUES(cust_id,loc_id,carid,pickupDt,dropDt);
		SELECT last_insert_id() INTO rent_id;
	END if;
    SELECT FLOOR(rand()*10000) into trxnid;
	INSERT INTO rentDetails
	VALUES(rent_id,4,rental_cost,rental_cost,trxnid);
    SELECT currentAvl INTO currAvl
    FROM caravl WHERE location_id = loc_id AND car_id = carid;
    if(currAvl>0) then
		UPDATE caravl
		set currentAvl = currentAvl-1
		WHERE location_id = loc_id AND car_id = carid;
        commit;
	else
		ROLLBACK;
        SIGNAL SQLSTATE '22003' 
			SET MESSAGE_TEXT = 'No cars available';
	end if;
END$$
DELIMITER ;

-- -----------------------------------------------------
-- Procedure `carRental`.`waitlistAdd`
-- -----------------------------------------------------
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `waitlistAdd`(
	cust_id INT,
    location VARCHAR(45),
    carid INT,
    pickupDt DATETIME,
    dropDt DATETIME,
    rental_cost DECIMAL(9,2)
)
BEGIN
	DECLARE zeroornot INTEGER;
    DECLARE rent_id INTEGER;
    DECLARE loc_id INTEGER;
    set transaction isolation level serializable;
    START transaction;
    SELECT location_id INTO loc_id 
    FROM location WHERE location_name = location;
    select exists(select 1 from rent) into zeroornot;
    IF zeroornot = 0 THEN
		INSERT INTO rent
        VALUES(10000,cust_id,loc_id,carid,pickupDt,dropDt);
        SET @rent_id = 10000;
	ELSE
		INSERT INTO rent(customer_id,location_id,car_id,pickupDate,dropDate)
		VALUES(cust_id,loc_id,carid,pickupDt,dropDt);
		SELECT last_insert_id() INTO rent_id;
	end if;
    INSERT INTO waitList
	VALUES(rent_id,"No");
	INSERT INTO rentdetails
	VALUES(rent_id,3,rental_cost,0,null);
    commit;
END$$
DELIMITER ;

-- -----------------------------------------------------
-- Procedure `carRental`.`getWaitlist_for_custid`
-- -----------------------------------------------------
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getWaitlist_for_custid`(
	cust_id INT
)
BEGIN
	START TRANSACTION;
	SELECT (SELECT location_name FROM location WHERE location_id = r.location_id) as location, 
		(SELECT name from car WHERE car_ID = r.car_ID) as car,
    pickupDate, dropDate, carAvl
	FROM rent r
	RIGHT JOIN waitlist USING (rent_id)
	WHERE customer_id = cust_id;
    COMMIT;
END$$
DELIMITER ;

-- -----------------------------------------------------
-- Function `carRental`.`getCustId`
-- -----------------------------------------------------
DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `getCustId`(
	email VARCHAR(255),
    mobile CHAR(10)
) RETURNS int
    READS SQL DATA
BEGIN
	DECLARE custId INTEGER;
    SELECT customer_id INTO custId
    FROM customer c
    WHERE c.email = email AND c.mobileNo = mobile;
	RETURN custId;
END$$
DELIMITER ;

-- -----------------------------------------------------
-- Function `carRental`.`car_available_at_location`
-- -----------------------------------------------------
DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `car_available_at_location`(	
	loc VARCHAR(45),
    carid INTEGER
) RETURNS int
    READS SQL DATA
BEGIN
	DECLARE num_of_cars_curAvl INTEGER;
    DECLARE loc_id INTEGER;
    SELECT location_id INTO loc_id
    FROM location l
    WHERE l.location_name = loc;
	SELECT currentAvl INTO num_of_cars_curAvl
    FROM caravl ca
    WHERE ca.location_id = loc_id AND
		ca.car_id = carid;
	RETURN num_of_cars_curAvl;
END$$
DELIMITER ;

-- -----------------------------------------------------
-- Data Insert
-- -----------------------------------------------------

-- -----------------------------------------------------
-- carType
-- -----------------------------------------------------
INSERT INTO carType
VALUES (1,"HatchBack"), (2,"Sedan"), (3,"SUV"), (4,"Mini SUV");

-- -----------------------------------------------------
-- Location
-- -----------------------------------------------------
INSERT INTO location
VALUES (10,"New Delhi"), (11,"Mumbai"),(12,"Chennai"),(13,"Kolkata"),(14,"Mysore"),(15,"Bangalore"),
		(16,"Pune"),(17,"Agra"),(18,"Trivandrum"),(19,"Comibatore"),(20,"Ahemadabad");
        
-- -----------------------------------------------------
-- Car
-- -----------------------------------------------------
INSERT INTO car
VALUES (100, "Suzuki Swift","Petrol",1,"Manual",2799.00,5),
(101,"Hyundai Eon","Petrol",1,"Manual",2497.00,5), 
(102,"Ford Aspire","Diesel",2,"Manual",2748.00,5),
(103,"Hyundai Creta","Petrol",3,"Manual",2497.00,7),
(104,"Renault Triber","Petrol",3,"Automatic",3245.00,7),
(105,"Suzuki Celerio","Petrol",4,"Automatic",2789.00,6),
(106,"Suzuki Presso","Petrol",4,"Manual",2045.00,6),
(107,"Suzuki Ertiga","Diesel",3,"Manual",3297.00,7),
(108,"Renault Kwid","Petrol",1,"Automatic",1578.00,5),
(109,"Datson Go","Petrol",1,"Automatic",1597.00,5),
(110,"Honda WRV","Diesel",2,"Manual",1897.00,6);

-- -----------------------------------------------------
-- caravl
-- -----------------------------------------------------
INSERT INTO caravl
VALUES (10,100,3,3),(10,102,2,2),(10,107,2,2),
 (11,101,2,2),(11,104,3,3),(11,108,4,4),
 (12,107,3,3),(12,108,2,2),(12,109,3,3),
 (13,104,3,3),(13,101,3,3),(13,103,2,2),
 (14,109,1,1),(14,110,2,2),(14,102,3,3),
 (15,105,3,3),(15,100,2,2),(15,107,3,3),
 (16,103,1,1),(16,105,3,3),(16,106,3,3),
 (17,110,3,3),(17,101,4,4),(17,103,2,2),
 (18,108,2,2),(18,105,1,1),(18,104,3,3),
 (19,106,3,3),(19,109,3,3),(19,110,3,3),
 (20,100,3,3),(20,102,3,3),(20,106,1,1);
 
 -- -----------------------------------------------------
-- carstatus
-- -----------------------------------------------------
INSERT INTO carstatus
VALUES (1,"Returned"), (2,"Not Returned"), (3,"Waiting List"), (4,"CarAssigned");

 -- -----------------------------------------------------
-- customer
-- -----------------------------------------------------
INSERT INTO customer VALUES(1000,"Yadnesh","Mundhada","yadneshmundhada@gmail.com","mumbai",1234567809);
INSERT INTO customer VALUES(1001,"Adarsh","Yadav","adarshyadav@gmail.com","Chennai",1245637837);
 -- -----------------------------------------------------
-- rent
-- -----------------------------------------------------
INSERT INTO rent VALUES (10000,1000,11,101,'2022/04/05','2022/04/07');
 -- -----------------------------------------------------
-- event 
-- -----------------------------------------------------

DELIMITER $$
create event hourly_check_waitlist_status
on schedule 
every 2 hour 
do begin
	delete FROM waitlist
	WHERE rent_id IN (
	SELECT rent_id
	FROM waitlist w
	LEFT JOIN rent r USING (rent_id)
	LEFT JOIN caravl c ON r.location_id=c.location_id AND r.car_ID=c.car_ID
	WHERE currentAvl > 0
	);
	UPDATE rentdetails
	SET statusId = 4
	WHERE rent_id IN (
	SELECT rent_id
	FROM waitlist w
	LEFT JOIN rent r USING (rent_id)
	LEFT JOIN caravl c ON r.location_id=c.location_id AND r.car_ID=c.car_ID
	WHERE currentAvl > 0
	) ;
end$$
delimiter ;

 -- -----------------------------------------------------
-- trigger 
-- -----------------------------------------------------

DELIMITER $$
CREATE TRIGGER waitlist_after_caravl
	AFTER UPDATE ON caravl 
    FOR EACH ROW
BEGIN
	if OLD.currentAvl=0 AND NEW.currentAvl>0 then 
		UPDATE waitlist
		SET carAvl = "Yes"
			WHERE rent_id IN (
				SELECT rent_id from rent
				WHERE location_id = OLD.location_id AND car_ID = OLD.car_ID
			);
	elseif OLD.currentAvl>0 AND NEW.currentAvl=0 then
		UPDATE waitlist
        SET carAvl = "No"
			WHERE rent_id IN (
				SELECT rent_id from rent
				WHERE location_id = OLD.location_id AND car_ID = OLD.car_ID
			);
	end if;
END$$
DELIMITER ;