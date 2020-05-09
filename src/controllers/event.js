import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
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
      this.setDefaultView();
    });
    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });
  }

  render(event) {
    this._createNewComponents(event);
    this._subscribeOnEvents(event);

    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }

  rerender(event) {
    const oldEventEditComponent = this._eventEditComponent;

    this._createNewComponents(event);
    this._subscribeOnEvents(event);

    replace(this._eventEditComponent, oldEventEditComponent);
  }
}

export default EventController;
