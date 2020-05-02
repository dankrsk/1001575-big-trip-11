import {MONTH_NAMES} from '../сonst.js';
import AbstractComponent from '../components/abstract-component.js';

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

class DayEvents extends AbstractComponent {
  constructor(date, numberOfDay) {
    super();

    this._date = date;
    this._numberOfDay = numberOfDay;
  }

  getTemplate() {
    return getDayEventsTemplate(this._date, this._numberOfDay);
  }
}

export default DayEvents;
