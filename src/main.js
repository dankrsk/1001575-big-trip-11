import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortComponent from './components/sort.js';
import EventsListComponent from './components/events-list.js';
import TripController from './controllers/trip.js';
import {generateEvents} from './mock/mock_event.js';
import {render, RenderPosition} from './utils/render.js';

const EVENT_COUNT = 10;

const events = generateEvents(EVENT_COUNT);

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const mainContainer = document.querySelector(`.trip-events`);
const eventListComponent = new EventsListComponent();

render(controlsContainer, new MenuComponent(), RenderPosition.BEFOREEND);
render(controlsContainer, new FilterComponent(), RenderPosition.BEFOREEND);
render(mainContainer, new SortComponent(), RenderPosition.BEFOREEND);
render(mainContainer, eventListComponent, RenderPosition.BEFOREEND);

const tripController = new TripController(eventListComponent);
tripController.render(events);
