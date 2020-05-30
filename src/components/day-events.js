import {MONTH_NAMES} from '../сonst.js';
import AbstractComponent from '../components/abstract-component.js';

const getDayEventsTemplate = (date, numberOfDay) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
      ${(date && numberOfDay) ? `<span class="day__counter">${numberOfDay}</span><time class="day__date" datetime="${date.getFullYear()}-${MONTH_NAMES[date.getMonth()]}-${date.getDate()}">${MONTH_NAMES[date.getMonth()]} ${date.getDate()}</time>` : ``}
      </div>
      <ul class="trip-events__list">
      </ul>
     </li>`
  );
};

class DayEvents extends AbstractComponent {
  constructor(date = null, numberOfDay = null) {
    super();

    this._date = date;
    this._numberOfDay = numberOfDay;
  }

  getTemplate() {
    return getDayEventsTemplate(this._date, this._numberOfDay);
  }
}

export default DayEvents;
