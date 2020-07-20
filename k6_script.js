import http from 'k6/http';

import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 100 },
    { duration: '30s', target: 500 },
    { duration: '1m', target: 1000 },
  ],
};

const randomListingId = () => {
  return Math.floor(Math.random() * 10000000) + 1
};

const randomSecondaryId = () => {
  return Math.floor(Math.random() * 50000000) + 1
};

export default function () {
  const listing_id = randomListingId();
  const res = http.get(`http://localhost:3001/api/${listing_id}/bookings`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}