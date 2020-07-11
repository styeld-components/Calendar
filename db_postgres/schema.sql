DROP DATABASE IF EXISTS calendar;

CREATE DATABASE calendar;

USE calendar;


CREATE TABLE listings (
  listing_id SERIAL PRIMARY KEY,
  nightly_fee INT,
  cleaning_fee INT,
  occupancy_tax_rate NUMERIC(4, 2),
  avg_rating NUMERIC(3,2),
  reviews INT,
  city VARCHAR(20),
  max_capacity INT
);

CREATE TABLE bookings (
  booking_id SERIAL PRIMARY KEY,
  checkin DATE,
  checkout DATE,
  adults INT,
  children INT,
  infants INT,
  listing_id INT REFERENCES listings (listing_id)
);

CREATE TABLE billingInfo (
  billing_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  payment_type VARCHAR(20),
  booking_id INT REFERENCES bookings (booking_id)
);

