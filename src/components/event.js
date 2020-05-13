import {getDualFormat} from '../utils/common.js';
import {ONE_DAY_IN_MS, ONE_HOUR_IN_MS, ONE_MINUTE_IN_MS} from '../сonst.js';
import AbstractComponent from '../components/abstract-component.js';

const getEventWithAction = (type) => {
  if (type === `Check-in` || type === `Sightseeing` || type === `Restaurant`) {
    return `${type} in`;
  } else {
    return `${type} to`;
  }
};

const getEventDuration = (startDate, endDate) => {
  const duration = endDate.getTime() - startDate.getTime();
  const days = Math.floor(duration / ONE_DAY_IN_MS);
  const hours = Math.floor(duration % ONE_DAY_IN_MS / ONE_HOUR_IN_MS);
  const minutes = Math.floor(duration % ONE_DAY_IN_MS % ONE_HOUR_IN_MS / ONE_MINUTE_IN_MS);

  if (days) {
    return `${getDualFormat(days)}D ${getDualFormat(hours)}H ${getDualFormat(minutes)}M`;
  } else {
    return hours ? `${getDualFormat(hours)}H ${getDualFormat(minutes)}M` : `${getDualFormat(minutes)}M`;
  }
};

const getOffersTemplate = (offers) => {
  const OFFERS_NUMBER_TO_SHOW = 3;
  let template = ``;

  if (offers) {
    const items = offers.map((it) => {
      return `<li class="event__offer">
                <span class="event__offer-title">${it.title}</span>
                &plus;&euro;&nbsp;<span class="event__offer-price">${it.price}</span>
              </li>`;
    }).slice(0, OFFERS_NUMBER_TO_SHOW).join(`\n`);
    template = `<h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${items}
                </ul>`;
  }

  return template;
};

const getEventTemplate = (event) => {
  const {type, city, price, offers, time} = event;

  const dateTime = `${time.date.getFullYear()}-${time.date.getMonth()}-${time.date.getDate()}`;
  const startTime = `${getDualFormat(time.start.getHours())}:${getDualFormat(time.start.getMinutes())}`;
  const endTime = `${getDualFormat(time.end.getHours())}:${getDualFormat(time.end.getMinutes())}`;
  const duration = getEventDuration(time.start, time.end);

  return (
    `<li class="trip-events__item">
			<div class="event">
				<div class="event__type">
					<img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
				</div>
				<h3 class="event__title">${getEventWithAction(type)} ${city}</h3>
				<div class="event__schedule">
					<p class="event__time">
						<time class="event__start-time" datetime="${dateTime}T${startTime}">${startTime}</time>
						&mdash;
						<time class="event__end-time" datetime="${dateTime}T${endTime}">${endTime}</time>
					</p>
					<p class="event__duration">${duration}</p>
				</div>
				<p class="event__price">
					&euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        ${getOffersTemplate(offers)}
				<button class="event__rollup-btn" type="button">
					<span class="visually-hidden">Open event</span>
				</button>
			</div>
		</li>`
  );
};

class Event extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return getEventTemplate(this._event);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}

export {Event as default, getEventWithAction};
