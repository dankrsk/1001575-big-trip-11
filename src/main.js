import MenuComponent from './components/menu.js';
import NewEventButtonComponent from './components/new-event-button.js';
import FilterController from './controllers/filter.js';
import SortComponent from './components/sort.js';
import EventsListComponent from './components/events-list.js';
import TripController from './controllers/trip.js';
import EventsModel from './models/events.js';
import {generateEvents} from './mock/mock_event.js';
import {render, RenderPosition} from './utils/render.js';

const EVENT_COUNT = 10;

const events = generateEvents(EVENT_COUNT);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const mainContainer = document.querySelector(`.trip-events`);
const eventListComponent = new EventsListComponent();

render(controlsContainer, new MenuComponent(), RenderPosition.BEFOREEND);

const filterController = new FilterController(controlsContainer, eventsModel);
filterController.render();

document.querySelector(`.trip-main__event-add-btn`).remove();
const newEventButtonComponent = new NewEventButtonComponent();
render(controlsContainer.parentElement, newEventButtonComponent, RenderPosition.BEFOREEND);

render(mainContainer, new SortComponent(), RenderPosition.BEFOREEND);
render(mainContainer, eventListComponent, RenderPosition.BEFOREEND);

const tripController = new TripController(eventListComponent, eventsModel);
tripController.render(events);

newEventButtonComponent.setNewEventButtonClickHandler(() => {
  tripController.createEvent();
});
