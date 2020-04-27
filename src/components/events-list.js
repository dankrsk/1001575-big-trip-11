import {createElement} from '../utils.js';

const getEventsListTemplate = () => {
  return (
    `<ul class="trip-days">
     </ul>`
  );
};

class EventsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getEventsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default EventsList;
