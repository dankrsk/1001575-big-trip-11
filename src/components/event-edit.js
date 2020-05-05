import {TYPES} from '../сonst.js';
import {getEventWithAction} from './event.js';
import {CITIES} from '../mock/mock_event.js';
import {getDualFormat} from '../utils/common.js';
import AbstractComponent from '../components/abstract-component.js';

const getEventItemsTemplate = (type, group) => {
  return TYPES[group].map((it) => {
    let checked = ``;
    if (type === it) {
      checked = ` checked`;
    }
    return `<div class="event__type-item">
              <input id="event-type-${it.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.toLowerCase()}"${checked}>
              <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-1">${it}</label>
            </div>`;
  }).join(`\n`);
};

const getDestinationItemsTemplate = () => {
  return CITIES.map((it) => {
    return `<option value="${it}"></option>`;
  }).join(`\n`);
};

const getOfferTemplate = (offers) => {
  return offers.map((it) => {
    let checked = ``;
    if (it.isChecked) {
      checked = ` checked`;
    }
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.name}-1" type="checkbox" name="event-offer-${it.name}"${checked}>
              <label class="event__offer-label" for="event-offer-${it.name}-1">
                <span class="event__offer-title">${it.title}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
              </label>
            </div>`;
  }).join(`\n`);
};

const getOffersTemplate = (offers) => {
  let template = ``;
  if (offers.length) {
    template = `<section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${getOfferTemplate(offers)}
                  </div>
                </section>`;
  }
  return template;
};

const getDestinationTemplate = (info) => {
  let template = ``;
  if (info) {
    template = `<section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${info.description}</p>
                  <div class="event__photos-container">
                    <div class="event__photos-tape">
                      ${info.photos.map((it) => {
    return `<img class="event__photo" src="${it}" alt="Event photo">`;
  }).join(`\n`)}
                    </div>
                  </div>
                </section>`;
  }
  return template;
};

const getFormatedTime = (time) => {
  return `${getDualFormat(time.getDate())}/${getDualFormat(time.getMonth() + 1)}/${time.getFullYear().toString().slice(2)} ${getDualFormat(time.getHours())}:${getDualFormat(time.getMinutes())}`;
};

const getEventDetailsTemplate = (offers, info) => {
  let template = ``;

  if (offers.length || info) {
    return `<section class="event__details">
              ${getOffersTemplate(offers)}
              ${getDestinationTemplate(info)}
            </section>`;
  }

  return template;
};

const getEventEditTemplate = (event) => {
  const {type, city, time, price, offers, info} = event;
  const startTime = getFormatedTime(time.start);
  const endTime = getFormatedTime(time.end);
  const isFavorite = event.isFavorite ? ` checked` : ``;

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${getEventItemsTemplate(type, `transfer`)}
              </fieldset>
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${getEventItemsTemplate(type, `activity`)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${getEventWithAction(type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${getDestinationItemsTemplate()}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite"${isFavorite}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        ${getEventDetailsTemplate(offers, info)}
      </form>
    </li>`
  );
};

class EventEdit extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return getEventEditTemplate(this._event);
  }

  seEditFormtSubmitHandler(handler) {
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, handler);
  }
}

export default EventEdit;
