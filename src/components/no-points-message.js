import AbstractComponent from '../components/abstract-component.js';

class NoPointsMessage extends AbstractComponent {
  getTemplate() {
    return (
      `<p class="trip-events__msg">Click New Event to create your first point</p>`
    );
  }
}

export default NoPointsMessage;
