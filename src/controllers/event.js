import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const EmptyEvent = {
  id: String(new Date() + Math.random()),
  type: `Flight`,
  city: ``,
  price: ``,
  time: {
    date: new Date(),
    start: new Date(),
    end: new Date(),
  },
  isFavorite: false,
};

class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._mode = Mode.DEFAULT;
  }

  _createNewComponents(event) {
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      replace(this._eventComponent, this._eventEditComponent);
      this._mode = Mode.DEFAULT;
    }
  }

  _subscribeOnEvents(event) {
    this._eventComponent.setEditButtonClickHandler(() => {
      this._onViewChange();
      this._replaceEventToEdit();
    });

    this._eventEditComponent.setEditFormtSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditComponent.getData();
      this._onDataChange(event, data, this);
    });
    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });
    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._onDataChange(event, null, this);
    });
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
        if (oldEventEditComponent) {
          replace(this._eventEditComponent, oldEventEditComponent);
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        render(this._container, this._eventEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }
}

export {EventController as default, Mode, EmptyEvent};
