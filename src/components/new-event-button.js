import AbstractComponent from '../components/abstract-component.js';

const getNewEventButtonTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

class NewEventButton extends AbstractComponent {
  getTemplate() {
    return getNewEventButtonTemplate();
  }

  setNewEventButtonClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

export default NewEventButton;
