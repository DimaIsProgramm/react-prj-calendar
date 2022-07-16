import { getCircularReplacer } from '../components/scripts/getCircularReplacer';

const baseUrl = 'https://62c1c776eff7f7856f15089e.mockapi.io/events';

export const createEvent = eventData => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData, getCircularReplacer()),
  }).then(res => {
    if (!res.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};
export const fetchEvents = () => {
  return fetch(baseUrl).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
};

export const deleteEvent = id => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then(res => {
    if (!res.ok) {
      throw new Error("Internal Server Error. Can't delete events");
    }
  });
};
