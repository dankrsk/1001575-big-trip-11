import {getMenuTemplate} from './components/menu.js';
import {getFilterTemplate} from './components/filter.js';
import {getSortTemplate} from './components/sort.js';
import {getEventEditTemplate} from './components/event-edit.js';
import {getEventsListTemplate} from './components/events-list.js';
import {getDayEventsTemplate} from './components/day-events.js';
import {getEventTemplate} from './components/event.js';

const EVENT_COUNT = 10;

const renderHtml = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const generateEvent = () => {
  const ONE_HOUR_IN_MS = 3600000;
  const YEAR = 2020;
  const MONTH = 3;

  const getHours = () => {
    return Math.floor(Math.random() * 24);
  };

  const getMinutes = () => {
    return Math.floor(Math.random() * 60);
  };

  const getDay = () => {
    return Math.random() > 0.5 ? 1 : 2;
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
    const TYPES = [
      `Taxi`,
      `Bus`,
      `Train`,
      `Ship`,
      `Transport`,
      `Drive`,
      `Flight`,
      `Check-in`,
      `Sightseeing`,
      `Restaurant`,
    ];

    return TYPES[Math.floor(Math.random() * 9)];
  };

  const getCity = () => {
    const CITIES = [
      `Moscow`,
      `Kiev`,
      `Krasnoyarsk`,
      `Baranovichi`,
      `Redding`,
      `Sacramento`,
    ];

    return CITIES[Math.floor(Math.random() * 5)];
  };

  const getOffer = () => {
    const getTitle = () => {
      const OFFER_TITLES = [
        `Order Uber`,
        `Add luggage`,
        `Travel by train`,
        `Add meal`,
        `Choose seats`,
        `Add breakfast`,
      ];

      return OFFER_TITLES[Math.floor(Math.random() * 5)];
    };

    const getName = () => {
      const OFFER_NAMES = [
        `luggage`,
        `comfort`,
        `meal`,
        `seats`,
        `train`,
      ];

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

  return {
    type: getType(),
    city: getCity(),
    offers: getOffers(Math.floor(Math.random() * 5)),
    info: {
      description: getDescription(Math.ceil(Math.random() * 4)),
      photos: getPhotos(Math.floor(Math.random() * 5)),
    },
    price: Math.floor(Math.random() * 500),
    time: getEventTime(),
    isFavorite: Math.floor(Math.random() * 2),
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

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const mainContainer = document.querySelector(`.trip-events`);

renderHtml(controlsContainer, getMenuTemplate());
renderHtml(controlsContainer, getFilterTemplate());
renderHtml(mainContainer, getSortTemplate());
renderHtml(mainContainer, getEventsListTemplate());

const eventContainer = mainContainer.querySelector(`.trip-days`);

const allEvents = generateEvents(EVENT_COUNT);

allEvents.forEach((it, i) => {
  renderHtml(eventContainer, getDayEventsTemplate(it[0].time.date, i + 1));

  const dayEventsContainers = eventContainer.querySelectorAll(`.trip-events__list`);

  if (i === 0) {
    it.forEach((dayEvent, indexDayEvent) => {
      if (indexDayEvent === 0) {
        renderHtml(dayEventsContainers[i], getEventEditTemplate(dayEvent));
      } else {
        renderHtml(dayEventsContainers[i], getEventTemplate(dayEvent));
      }
    });
  } else {
    it.forEach((dayEvent) => {
      renderHtml(dayEventsContainers[i], getEventTemplate(dayEvent));
    });
  }
});

