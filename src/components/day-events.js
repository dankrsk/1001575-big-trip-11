import {MONTH_NAMES} from '../сonst.js';
import {createElement} from '../utils.js';

const getDayEventsTemplate = (date, numberOfDay) => {
  const year = date.getFullYear();
  const month = MONTH_NAMES[date.getMonth()];
  const day = date.getDate();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${numberOfDay}</span>
        <time class="day__date" datetime="${year}-${month}-${day}">${month} ${day}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
     </li>`
  );
};

class DayEvents {
  constructor(date, numberOfDay) {
    this._date = date;
    this._numberOfDay = numberOfDay;

    this._element = null;
  }

  getTemplate() {
    return getDayEventsTemplate(this._date, this._numberOfDay);
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

export default DayEvents;
