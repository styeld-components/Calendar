DROP KEYSPACE IF EXISTS calendar;

CREATE KEYSPACE IF NOT EXISTS calendar
  WITH REPLICATION = {
    'class' : "SimpleStrategy',
    'replication_factor' : 1
  };

USE calendar;

CREATE TABLE bookings (
  listing_id uuid,
  nightly_fee int,
  cleaning_fee int,
  occupancy_tax_rate float,
  avg_rating float,
  reviews int,
  city text,
  max_capacity int,
  bookings_id uuid,
  checkin date,
  checkout date,
  adults int,
  children int,
  infants int,
  payment_type text,
  first_name text,
  last_name text,
  billing_id uuid,
  PRIMARY KEY (listing_id, bookings_id)
);

