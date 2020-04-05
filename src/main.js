import {getMenuTemplate} from './components/menu.js';
import {getFilterTemplate} from './components/filter.js';
import {getSortTemplate} from './components/sort.js';
import {getEventEditTemplate} from './components/event-edit.js';
import {getEventsListTemplate} from './components/events-list.js';
import {getDayEventsTemplate} from './components/day-events.js';
import {getEventTemplate} from './components/event.js';

const EVENT_COUNT = 3;

const renderHtml = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const mainContainer = document.querySelector(`.trip-events`);

renderHtml(controlsContainer, getMenuTemplate());
renderHtml(controlsContainer, getFilterTemplate());
renderHtml(mainContainer, getSortTemplate());
renderHtml(mainContainer, getEventsListTemplate());

const eventContainer = mainContainer.querySelector(`.trip-days`);

renderHtml(eventContainer, getDayEventsTemplate());

const dayEventsContainer = eventContainer.querySelector(`.trip-events__list`);

renderHtml(dayEventsContainer, getEventEditTemplate());

for (let i = 0; i < EVENT_COUNT; i++) {
  renderHtml(dayEventsContainer, getEventTemplate());
}

