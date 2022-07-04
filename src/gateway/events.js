const baseUrl = 'https://62c1c776eff7f7856f15089e.mockapi.io/events';

export const deleteEvent = taskId => {
  return fetch(`${baseUrl}/${taskId}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
  });
};

export const createEvents = eventData => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
  });
};

export const getEvents = () => {
  return fetch(baseUrl)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error. Cant't fetch events");
      }
    })
    .catch(error => console.log(error));
};

export const fetchEvents = fn => {
  getEvents().then(events => {
    fn(events);
  });
};
