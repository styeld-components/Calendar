SELECT * FROM listings WHERE listing_id = 10000000;

SELECT * FROM billingInfo WHERE billing_id = 50000000;

SELECT * FROM bookings WHERE booking_id = 50000000;

SELECT * FROM bookings INNER JOIN listings ON bookings.listing_id = listings.listing_id WHERE bookings.listing_id = 8422602;

INSERT INTO bookings (booking_id, checkin, checkout, adults, children, infants, listing_id, billingInfo) VALUES (50000001, Sun Aug 11 2020 19:26:12 GMT-0700 (Pacific Daylight Time), Tue Aug 13 2020 01:45:40 GMT-0700 (Pacific Daylight Time), 3, 2, 0, (SELECT listing_id FROM listings WHERE listing_id = 10000000), (SELECT billing_id FROM billingInfo WHERE billing_id = 45000000))