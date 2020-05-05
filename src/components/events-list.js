import AbstractComponent from '../components/abstract-component.js';

const getEventsListTemplate = () => {
  return (
    `<ul class="trip-days">
     </ul>`
  );
};

class EventsList extends AbstractComponent {
  getTemplate() {
    return getEventsListTemplate();
  }
}

export default EventsList;
