DROP KEYSPACE IF EXISTS calendar;

CREATE KEYSPACE IF NOT EXISTS calendar WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

USE calendar;

CREATE TABLE bookingsByListing (
  listing_id bigint,
  nightly_fee int,
  cleaning_fee int,
  occupancy_tax_rate float,
  avg_rating float,
  reviews int,
  city text,
  max_capacity int,
  booking_id bigint,
  checkin text,
  checkout text,
  adults int,
  children int,
  infants int,
  payment_type text,
  first_name text,
  last_name text,
  billing_id bigint,
  CCNum bigint,
  PRIMARY KEY (listing_id, checkin)
) WITH CLUSTERING ORDER BY (checkin DESC);

COPY calendar.bookingsByListing (listing_id,nightly_fee,cleaning_fee,occupancy_tax_rate,avg_rating,reviews,city,max_capacity,booking_id,checkin,checkout,adults,children,infants,payment_type,first_name,last_name,billing_id,CCNum) FROM '/Users/jaynein/Desktop/SDC/Calendar/db_cassandra/bookingsByListing.csv' WITH DELIMITER = ',' AND HEADER = TRUE;