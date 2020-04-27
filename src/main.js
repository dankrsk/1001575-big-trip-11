import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortComponent from './components/sort.js';
import EventEditComponent from './components/event-edit.js';
import EventsListComponent from './components/events-list.js';
import DayEventsComponent from './components/day-events.js';
import EventComponent from './components/event.js';
import {generateEvents} from './mock/mock_event.js';
import {render, RenderPosition} from './utils.js';

const EVENT_COUNT = 10;

const renderEvent = (eventContainer, event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);
  const rollupButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  const editForm = eventEditComponent.getElement().querySelector(`.event--edit`);

  const onRollupButtonClick = () => {
    eventContainer.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    eventContainer.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  rollupButton.addEventListener(`click`, onRollupButtonClick);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(eventContainer, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const controlsContainer = document.querySelector(`.trip-main__trip-controls`);
const mainContainer = document.querySelector(`.trip-events`);

render(controlsContainer, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(controlsContainer, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
render(mainContainer, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(mainContainer, new EventsListComponent().getElement(), RenderPosition.BEFOREEND);

const eventContainer = mainContainer.querySelector(`.trip-days`);

const allEvents = generateEvents(EVENT_COUNT);

allEvents.forEach((it, i) => {
  const dayEventsComponent = new DayEventsComponent(it[0].time.date, i + 1);
  render(eventContainer, dayEventsComponent.getElement(), RenderPosition.BEFOREEND);
  const dayEventsList = dayEventsComponent.getElement().querySelector(`.trip-events__list`);

  it.forEach((dayEvent) => {
    renderEvent(dayEventsList, dayEvent);
  });
});
