const sessions = [
  {
    id: 1,
    startTime: "2023-10-05T11:00:00",
    endTime: "2023-10-05T14:00:00",
    name: "Roof lodge 1",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 2,
    startTime: "2023-10-05T14:30:00", // Сразу после предыдущего
    endTime: "2023-10-05T17:30:00",
    name: "Roof lodge 1",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 3,
    startTime: "2023-10-05T18:00:00", // Сразу после предыдущего
    endTime: "2023-10-06T09:30:00",
    name: "Roof lodge 1",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 4,
    startTime: "2023-10-05T11:30:00", // Сразу после предыдущего
    endTime: "2023-10-05T14:30:00",
    name: "Roof lodge 2",
    price: 5000,
    isAvailable: false,
    type: "short",
  },
  {
    id: 5,
    startTime: "2023-10-05T15:00:00", // Сразу после предыдущего
    endTime: "2023-10-05T18:00:00",
    name: "Roof lodge 2",
    price: 5000,
    isAvailable: false,
    type: "short",
  },
  {
    id: 6,
    startTime: "2023-10-05T18:30:00", // Сразу после предыдущего
    endTime: "2023-10-06T10:00:00",
    name: "Roof lodge 2",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 7,
    startTime: "2023-10-05T12:00:00", // Сразу после предыдущего
    endTime: "2023-10-05T15:00:00",
    name: "Roof lodge 3",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 8,
    startTime: "2023-10-05T15:30:00", // Сразу после предыдущего
    endTime: "2023-10-05T18:30:00",
    name: "Roof lodge 3",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 9,
    startTime: "2023-10-05T19:00:00", // Сразу после предыдущего
    endTime: "2023-10-06T10:30:00",
    name: "Roof lodge 3",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 10,
    startTime: "2023-10-05T12:30:00", // Сразу после предыдущего
    endTime: "2023-10-05T15:30:00",
    name: "Roof lodge 4",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 11,
    startTime: "2023-10-05T16:00:00", // Сразу после предыдущего
    endTime: "2023-10-05T19:00:00",
    name: "Roof lodge 4",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 12,
    startTime: "2023-10-05T19:30:00", // Сразу после предыдущего
    endTime: "2023-10-06T11:00:00",
    name: "Roof lodge 4",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 13,
    startTime: "2023-10-05T13:00:00", // Сразу после предыдущего
    endTime: "2023-10-05T16:00:00",
    name: "Roof lodge 5",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 14,
    startTime: "2023-10-05T16:30:00", // Сразу после предыдущего
    endTime: "2023-10-05T19:30:00",
    name: "Roof lodge 5",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 15,
    startTime: "2023-10-05T20:00:00", // Сразу после предыдущего
    endTime: "2023-10-06T11:30:00",
    name: "Roof lodge 5",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 16,
    startTime: "2023-10-05T13:30:00", // Сразу после предыдущего
    endTime: "2023-10-05T16:30:00",
    name: "Roof lodge 6",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 17,
    startTime: "2023-10-05T17:00:00", // Сразу после предыдущего
    endTime: "2023-10-05T20:00:00",
    name: "Roof lodge 6",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 18,
    startTime: "2023-10-05T20:30:00", // Сразу после предыдущего
    endTime: "2023-10-06T12:00:00",
    name: "Roof lodge 6",
    price: 5000,
    isAvailable: true,
    type: "short",
  },
  {
    id: 19,
    startTime: "2023-10-05T15:00:00", // Последнее мероприятие
    endTime: "2023-10-06T12:00:00", // На весь оставшийся день
    name: "Roof lodge",
    price: 25000,
    isAvailable: true,
    type: "long",
  },
];

export default sessions;
