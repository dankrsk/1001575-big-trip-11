import MenuComponent from './components/menu.js';
import NewEventButtonComponent from './components/new-event-button.js';
import StatsComponent from './components/stats.js';
import FilterController from './controllers/filter.js';
import TripController from './controllers/trip.js';
import EventsModel from './models/events.js';
import API from './api.js';
import {render, RenderPosition} from './utils/render.js';
import DestinationsModel from './models/destinations.js';
import OffersModel from './models/offers.js';

const AUTHORIZATION = `Basic lskf;;rgmrewq`;

const api = new API(AUTHORIZATION);

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const statsComponent = new StatsComponent(eventsModel);
const menuComponent = new MenuComponent();

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const mainContainer = document.querySelector(`.trip-events`);

render(controlsContainer, menuComponent, RenderPosition.BEFOREEND);

const filterController = new FilterController(controlsContainer, eventsModel);
filterController.render();

document.querySelector(`.trip-main__event-add-btn`).remove();
const newEventButtonComponent = new NewEventButtonComponent();
render(controlsContainer.parentElement, newEventButtonComponent, RenderPosition.BEFOREEND);

const tripController = new TripController(mainContainer, eventsModel, destinationsModel, offersModel, filterController, api);
api.setBadStatusHandler(tripController.renderNoPointsMessage);

newEventButtonComponent.setNewEventButtonClickHandler(() => {
  tripController.createEvent();
});

api.getDestinations()
.then((destinations) => {
  destinationsModel.setDestinations(destinations);
  api.getOffers()
    .then((offers) => {
      offersModel.setOffers(offers);
      api.getEvents()
        .then((events) => {
          eventsModel.setEvents(events);
          tripController.removeLoadingMessage();
          tripController.render();
        });
    });
});

render(mainContainer.parentElement, statsComponent, RenderPosition.BEFOREEND);

menuComponent.setTableButtonClickHandler(() => {
  statsComponent.hide();
  tripController.show();
});

menuComponent.setStatsButtonClickHandler(() => {
  tripController.hide();
  statsComponent.show();
});
