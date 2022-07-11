const baseUrl = 'https://62c1c776eff7f7856f15089e.mockapi.io/events';

// export const deleteEvent = async id => {
//   try {
//     const response = await fetch(`${baseUrl}/${id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) throw new Error("Internal Server Error. Can't display events");
//     return await response.json();
//   } catch (e) {
//     alert(e);
//   }
// };

// export const createEvent = async eventData => {
//   try {
//     const response = await fetch(baseUrl, {
//       headers: { 'Content-Type': 'application/json;charset=utf-8' },
//       method: 'POST',
//       body: JSON.stringify(eventData),
//     });
//     if (!response.ok) throw new Error("Internal Server Error. Can't display events");
//     return await response.json();
//   } catch (e) {
//     alert(e);
//   }
// };

// export const fetchEvents = async () => {
//   try {
//     const response = await fetch(baseUrl);
//     if (!response.ok) throw new Error("Internal Server Error. Can't display events");
//     return await response.json();
//   } catch (e) {
//     alert(e);
//   }
// };

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

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
