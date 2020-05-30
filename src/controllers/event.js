import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import EventModel from '../models/event.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';

const DEFAULT_TYPE = `flight`;

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const EmptyEvent = {
  price: null,
  time: {
    start: new Date(),
    end: new Date(),
  },
  destination: null,
  id: null,
  isFavorite: null,
  offers: null,
  type: DEFAULT_TYPE,
};

class EventController {
  constructor(container, onDataChange, onViewChange, destinationsModel, offersModel) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;

    this._mode = Mode.DEFAULT;
  }

  _createNewComponents(event) {
    if (this._mode !== Mode.ADDING) {
      this._eventComponent = new EventComponent(event);
    }
    this._eventEditComponent = new EventEditComponent(event, this._destinationsModel.getDestinations(), this._offersModel.getOffers());
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._eventEditComponent.cancelUnsavedChanges();
      replace(this._eventComponent, this._eventEditComponent);
      this._mode = Mode.DEFAULT;
    }
  }

  _subscribeOnEvents(event) {
    this._eventEditComponent.setEditFormSubmitHandler((evt) => {
      evt.preventDefault();
      if (!this._eventEditComponent.checkValidity()) {
        const data = this._eventEditComponent.getData();
        const newEvent = EventModel.clone(event);
        newEvent.price = data.price;
        newEvent.time = data.time;
        newEvent.destination = data.destination;
        newEvent.offers = data.offers;
        newEvent.type = data.type;

        this._onDataChange(event, newEvent);
      }
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._onDataChange(event, null);
    });

    if (this._mode !== Mode.ADDING) {
      this._eventComponent.setEditButtonClickHandler(() => {
        this._onViewChange();
        this._replaceEventToEdit();
      });

      this._eventEditComponent.setFavoriteButtonClickHandler(() => {
        const newEvent = EventModel.clone(event);
        newEvent.isFavorite = !newEvent.isFavorite;
        this._onDataChange(event, newEvent, this);
      });
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  render(event, mode) {
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._createNewComponents(event);
    this._subscribeOnEvents(event);

    switch (mode) {
      case Mode.DEFAULT:
        render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        break;
      case Mode.EDIT:
        replace(this._eventEditComponent, oldEventEditComponent);
        break;
      case Mode.ADDING:
        render(this._container.querySelector(`.trip-days`), this._eventEditComponent, RenderPosition.BEFOREBEGIN);
        break;
    }
  }
}

export {EventController as default, Mode, EmptyEvent};
