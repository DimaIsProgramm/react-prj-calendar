const baseUrl = 'https://62c1c776eff7f7856f15089e.mockapi.io/events';

export const deleteEvent = async id => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete event');
    return await response.json();
  } catch (e) {
    alert(e);
  }
};

export const createEvent = async eventData => {
  try {
    const response = await fetch(baseUrl, {
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      method: 'POST',
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Failed to create event');
    return await response.json();
  } catch (e) {
    alert(e);
  }
};

export const updateEvent = async eventData => {
  try {
    const response = await fetch(`${baseUrl}/${eventData.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Failed to update event');
    return await response.json();
  } catch (e) {
    alert(e);
  }
};

export const getEvents = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) throw new Error('Failed to get events');
    return await response.json();
  } catch (e) {
    alert(e);
  }
};

export const getEvent = async id => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    if (!response.ok) throw new Error('Failed to get event');
    return await response.json();
  } catch (e) {
    alert(e);
  }
};

export const fetchEvents = fn => {
  getEvents().then(events => {
    fn(events);
  });
};
