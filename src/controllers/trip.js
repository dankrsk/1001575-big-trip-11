import {render, RenderPosition, remove} from '../utils/render.js';
import DayEventsComponent from '../components/day-events.js';
import {default as EventController, Mode as EventControllerMode, EmptyEvent, Mode} from './event.js';
import SortComponent from '../components/sort.js';
import EventsListComponent from '../components/events-list.js';
import LoadingMessageComponent from '../components/loading-message.js';
import NoPointsMessageComponent from '../components/no-points-message.js';
import {SortType, FilterType} from '../сonst.js';
import {classToHideElement} from '../сonst.js';

class TripController {
  constructor(container, eventsModel, destinationsModel, offersModel, filterController, api) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._filterController = filterController;
    this._api = api;
    this._creatingEvent = null;
    this._activeSortType = SortType.DEFAULT;
    this._sortComponent = null;
    this._eventsListComponent = new EventsListComponent();

    this._dayEventsComponents = [];
    this._eventControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this.createEvent = this.createEvent.bind(this);

    this._eventsModel.setFilterChangeHandler(this._onFilterChange);

    this.renderNoPointsMessage = this.renderNoPointsMessage.bind(this);
    this._noPointsMessageComponent = null;
    this._loadingMessageComponent = new LoadingMessageComponent();
    render(this._container, this._loadingMessageComponent);
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _onSortChange(sortType) {
    if (this._activeSortType !== sortType) {
      this._activeSortType = sortType;
      this._eventsModel.setSort(this._activeSortType);

      remove(this._sortComponent);
      this._sortComponent = null;
      this._updateEvents();
    }
  }

  _removeEvents() {
    this._removeCreatingEvent();
    this._eventControllers.forEach((it) => {
      it.destroy();
    });
    this._eventControllers = [];
  }

  _removeDayEventsComponents() {
    this._dayEventsComponents.forEach((it) => {
      remove(it);
    });
    this._dayEventsComponents = [];
  }

  _updateEvents() {
    this._removeEvents();
    this._removeDayEventsComponents();
    this.render();
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    if (!this._noPointsMessageComponent) {
      this._onViewChange();
      this._onSortChange(SortType.DEFAULT);
      this._filterController.onFilterChange(FilterType.EVERYTHING);
    }

    this._creatingEvent = new EventController(this._container, this._onDataChange, this._onViewChange, this._destinationsModel, this._offersModel);
    this._eventControllers.push(this._creatingEvent);
    this._creatingEvent.render(EmptyEvent, EventControllerMode.ADDING);
    this.removeNoPointsMessage();
  }

  renderNoPointsMessage() {
    if (!this._noPointsMessageComponent) {
      this.removeLoadingMessage();
      this._removeSortComponent();
      remove(this._eventsListComponent);

      this._noPointsMessageComponent = new NoPointsMessageComponent();
      render(this._container, this._noPointsMessageComponent);
    }
  }

  removeNoPointsMessage() {
    if (this._noPointsMessageComponent) {
      remove(this._noPointsMessageComponent);
      this._noPointsMessageComponent = null;
    }
  }

  removeLoadingMessage() {
    remove(this._loadingMessageComponent);
    this._loadingMessageComponent = null;
  }

  _removeSortComponent() {
    remove(this._sortComponent);
    this._sortComponent = null;
  }

  render() {
    if (this._eventsModel.getEventsAll().length === 0) {
      this.renderNoPointsMessage();
      return;
    } else {
      this.removeNoPointsMessage();
    }

    const eventContainer = this._eventsListComponent.getElement();
    const events = this._eventsModel.getEventsWithDays();

    if (!this._sortComponent) {
      this._sortComponent = new SortComponent(this._activeSortType);
      render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
      this._sortComponent.setSortFormChangeHandler(this._onSortChange);
    }

    if (!this._container.contains(eventContainer)) {
      render(this._container, this._eventsListComponent, RenderPosition.BEFOREEND);
    }

    if (this._activeSortType === SortType.DEFAULT) {
      let day = 0;
      let dayEventsList = null;

      events.forEach((it) => {
        if (it.day !== day) {
          const dayEventsComponent = new DayEventsComponent(it.time.start, it.day);
          this._dayEventsComponents.push(dayEventsComponent);
          render(eventContainer, dayEventsComponent, RenderPosition.BEFOREEND);
          dayEventsList = dayEventsComponent.getElement().querySelector(`.trip-events__list`);
          day = it.day;
        }
        const eventController = new EventController(dayEventsList, this._onDataChange, this._onViewChange, this._destinationsModel, this._offersModel);
        eventController.render(it, EventControllerMode.DEFAULT);
        this._eventControllers.push(eventController);
      });
    } else {
      const dayEventsComponent = new DayEventsComponent();
      this._dayEventsComponents.push(dayEventsComponent);
      render(eventContainer, dayEventsComponent, RenderPosition.BEFOREEND);
      const dayEventsList = dayEventsComponent.getElement().querySelector(`.trip-events__list`);
      events.forEach((it) => {
        const eventController = new EventController(dayEventsList, this._onDataChange, this._onViewChange, this._destinationsModel, this._offersModel);
        eventController.render(it, EventControllerMode.DEFAULT);
        this._eventControllers.push(eventController);
      });
    }
  }

  show() {
    this._container.classList.remove(classToHideElement);
  }

  hide() {
    this._container.classList.add(classToHideElement);
  }

  _onViewChange() {
    this._removeCreatingEvent();
    this._eventControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _removeCreatingEvent() {
    if (this._creatingEvent) {
      this._eventControllers.pop().destroy();
      this._creatingEvent = null;
    }
  }

  _onDataChange(oldData, newData, eventController, mode = null) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        this._eventControllers.pop().destroy();
        this._updateEvents();
      } else {
        this._api.createEvent(newData)
          .then((event) => {
            this._eventsModel.addEvent(event);
            this._updateEvents();
          })
          .catch(() => {
            eventController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deleteEvent(oldData.id)
        .then(() => {
          const index = this._eventsModel.removeEvent(oldData.id);
          if (index !== -1) {
            this._updateEvents();
          }
        })
        .catch(() => {
          eventController.shake();
        });
    } else {
      this._api.updateEvent(oldData.id, newData)
        .then((event) => {
          const index = this._eventsModel.updateEvent(oldData.id, event);
          if (index !== -1) {
            if (mode === Mode.EDIT) {
              eventController.render(event, Mode.EDIT);
            } else {
              this._updateEvents();
            }
          }
        })
        .catch(() => {
          eventController.shake();
        });
    }
  }
}

export default TripController;
