import {ONE_HOUR_IN_MS, TYPES} from '../сonst.js';

const CITIES = [
  `Moscow`,
  `Kiev`,
  `Krasnoyarsk`,
  `Baranovichi`,
  `Redding`,
  `Sacramento`,
];
const SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Cras aliquet varius magna, non porta ligula feugiat eget`,
  `Fusce tristique felis at fermentum pharetra`,
  `Aliquam id orci ut lectus varius viverra`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`,
  `Sed sed nisi sed augue convallis suscipit in sed felis`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];
const OFFER_TITLES = [
  `Order Uber`,
  `Add luggage`,
  `Travel by train`,
  `Add meal`,
  `Choose seats`,
  `Add breakfast`,
];
const OFFER_NAMES = [
  `luggage`,
  `comfort`,
  `meal`,
  `seats`,
  `train`,
];
const YEAR = 2020;
const MONTH = 4;

const getHours = () => {
  return Math.floor(Math.random() * 24);
};

const getMinutes = () => {
  return Math.floor(Math.random() * 60);
};

const getDay = () => {
  return Math.floor(Math.random() * 30);
};

const getDate = () => {
  return new Date(YEAR, MONTH, getDay(), getHours(), getMinutes()).getTime();
};

const getEventTime = () => {
  const time = {
    date: new Date(),
    start: new Date(),
    end: new Date(),
  };

  time.start.setTime(getDate());
  time.end.setTime(time.start.getTime() + Math.floor(Math.random() * ONE_HOUR_IN_MS));
  time.date.setTime(time.start.getTime());
  time.date.setHours(0, 0, 0, 0);

  return time;
};

const getType = () => {
  const types = new Array(...Object.values(TYPES).reduce((ac, it) => {
    return ac.concat(it);
  }));

  return types[Math.floor(Math.random() * 9)];
};

const getCity = () => {
  return CITIES[Math.floor(Math.random() * 5)];
};

const getOffer = () => {
  const getTitle = () => {
    return OFFER_TITLES[Math.floor(Math.random() * 5)];
  };

  const getName = () => {
    return OFFER_NAMES[Math.floor(Math.random() * 5)];
  };

  return {
    type: getType(),
    title: getTitle(),
    name: getName(),
    price: Math.floor(Math.random() * 500),
    isChecked: Math.floor(Math.random() * 2),
  };
};

const getOffers = (count) => {
  return new Array(count).fill(``).map(getOffer);
};

const getSentence = () => {
  return SENTENCES[Math.floor(Math.random() * 8)];
};

const getDescription = (count) => {
  return new Array(count).fill(``).map(getSentence).join(`. `);
};

const getPhotos = (count) => {
  return new Array(count).fill(``).map(() => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  });
};

const generateEvent = () => {
  return {
    id: String(new Date() + Math.random()),
    type: getType(),
    city: getCity(),
    offers: getOffers(Math.floor(Math.random() * 5)),
    info: {
      description: getDescription(Math.ceil(Math.random() * 4)),
      photos: getPhotos(Math.floor(Math.random() * 5)),
    },
    price: Math.floor(Math.random() * 500),
    time: getEventTime(),
    isFavorite: Math.floor(Math.random() * 2) ? true : false,
  };
};

const generateEvents = (count) => {
  let orderedEvents = [];

  new Array(count)
        .fill(``)
        .map(generateEvent)
        .sort((a, b) => a.time.start.getTime() - b.time.start.getTime())
        .forEach((event, i, events) => {
          const prevEventTime = events[i - 1] ? events[i - 1].time.date.getTime() : 0;
          if (event.time.date.getTime() !== prevEventTime) {
            orderedEvents.push(new Array(event));
          } else {
            orderedEvents[orderedEvents.length - 1].push(event);
          }
        });

  return orderedEvents;
};

export {CITIES, generateEvents, getOffers, getDescription};
