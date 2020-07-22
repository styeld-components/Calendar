/*TO RUN THIS SCRIPT
  cd into the folder
  psql postgres
  \i schema.sql

  \l+ to show dbs
*/

\c postgres;

DROP DATABASE IF EXISTS calendar;

CREATE DATABASE calendar;

\c calendar;
-- USE calendar;


CREATE TABLE listings (
  listing_id INT NOT NULL PRIMARY KEY,
  nightly_fee INT,
  cleaning_fee INT,
  occupancy_tax_rate NUMERIC(4, 2),
  avg_rating NUMERIC(3,2),
  reviews INT,
  city VARCHAR(50),
  max_capacity INT
);


CREATE TABLE billingInfo (
  billing_id INT NOT NULL PRIMARY KEY ,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  payment_type VARCHAR(20),
  CCNum BIGINT NOT NULL
);

CREATE TABLE bookings (
  booking_id INT NOT NULL PRIMARY KEY,
  checkin VARCHAR(250),
  checkout VARCHAR(250),
  adults INT,
  children INT,
  infants INT,
  listing_id INT NOT NULL,
  -- REFERENCES listings (listing_id),
  billingInfo INT NOT NULL
  -- REFERENCES billingInfo (billing_id)
);


---listings csv files
-- COPY listings FROM '/Users/jaynein/Desktop/SDC/Calendar/db_postgres/csv/listings.csv' DELIMITER ',' CSV HEADER;
COPY listings FROM '/tmp/listings.csv' DELIMITER ',' CSV HEADER;
VACUUM listings;



---billing info csv files
-- COPY billingInfo FROM '/Users/jaynein/Desktop/SDC/Calendar/db_postgres/csv/billingsInfo.csv' DELIMITER ',' CSV HEADER;
COPY billingInfo FROM '/tmp/billingsInfo.csv' DELIMITER ',' CSV HEADER;
VACUUM billingInfo;


-- ---bookings csv files
-- COPY bookings FROM '/Users/jaynein/Desktop/SDC/Calendar/db_postgres/csv/bookings1.csv' DELIMITER ',' CSV HEADER;
-- COPY bookings FROM '/Users/jaynein/Desktop/SDC/Calendar/db_postgres/csv/bookings2.csv' DELIMITER ',' CSV HEADER;

COPY bookings FROM '/tmp/bookings1.csv' DELIMITER ',' CSV HEADER;
COPY bookings FROM '/tmp/bookings2.csv' DELIMITER ',' CSV HEADER;
VACUUM bookings;

ALTER TABLE bookings ADD CONSTRAINT fk_listing FOREIGN KEY (listing_id) REFERENCES listings(listing_id);
ALTER TABLE bookings ADD CONSTRAINT fk_billing FOREIGN KEY (billingInfo) REFERENCES billingInfo(billing_id);

CREATE INDEX listing_idx ON bookings(listing_id);
CREATE INDEX billing_idx ON bookings(billingInfo);

