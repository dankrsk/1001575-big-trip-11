import {TYPES} from '../сonst.js';
import {getEventWithAction} from './event.js';
import {getDualFormat, getIsoTimeFormat, getStringWithFirstCapitalLetter} from '../utils/common.js';
import AbstractSmartComponent from '../components/abstract-smart-component.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const getEventItemsTemplate = (type, group) => {
  return TYPES[group].map((it) => {
    let checked = ``;
    if (type === it.toLowerCase()) {
      checked = ` checked`;
    }
    return `<div class="event__type-item">
              <input id="event-type-${it.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.toLowerCase()}"${checked}>
              <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-1">${it}</label>
            </div>`;
  }).join(`\n`);
};

const getDestinationItemsTemplate = (allDestinations) => {
  return allDestinations.map((it) => {
    return `<option value="${it.name}"></option>`;
  }).join(`\n`);
};

const getOffersTemplate = (offers, typesOffers) => {
  const template = typesOffers.map((it) => {
    let isChecked = ``;
    if (offers) {
      isChecked = offers.some((offer) => {
        return offer.title === it.title;
      }) ? ` checked` : ``;
    }
    const name = it.title.split(` `).join(`-`).toLowerCase();
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}"${isChecked}>
              <label class="event__offer-label" for="event-offer-${name}-1">
                <span class="event__offer-title">${it.title}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
              </label>
            </div>`;
  }).join(`\n`);
  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${template}
            </div>
          </section>`;
};

const getDestinationTemplate = (destination) => {
  const description = destination.description.length !== 0 ? `<p class="event__destination-description">${destination.description}</p>` : ``;
  let pictures = ``;
  if (destination.pictures.length !== 0) {
    pictures = `<div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${destination.pictures.map((it) => {
    return `<img class="event__photo" src="${it.src}" alt="${it.description}">`;
  }).join(`\n`)}
                  </div>
                </div>`;
  } else {
    pictures = ``;
  }
  if (description || pictures) {
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${description}
        ${pictures}
      </section>`
    );
  } else {
    return ``;
  }
};

const getFormatedTime = (time) => {
  return `${getDualFormat(time.getDate())}/${getDualFormat(time.getMonth() + 1)}/${time.getFullYear().toString().slice(2)} ${getDualFormat(time.getHours())}:${getDualFormat(time.getMinutes())}`;
};

const getEventDetailsTemplate = (offers, typesOffers, destination) => {
  if (typesOffers.length !== 0 || destination) {
    return `<section class="event__details">
              ${typesOffers.length ? getOffersTemplate(offers, typesOffers) : ``}
              ${(destination) ? getDestinationTemplate(destination) : ``}
            </section>`;
  } else {
    return ``;
  }
};

const getFavoriteAndEditButtons = (id, isFavorite) => {
  if (id) {
    return (
      `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite"${isFavorite}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    );
  } else {
    return ``;
  }
};

const getEventEditTemplate = (event, allDestinations, typesOffers, options = {}) => {
  const {id, time, price} = event;

  const {type, offers, destination} = options;
  const startTime = getFormatedTime(time.start);
  const endTime = getFormatedTime(time.end);
  const isFavorite = event.isFavorite ? ` checked` : ``;

  const getMainForm = () => {
    return (
      `<form class="${id ? `` : `trip-events__item `}event  event--edit" action="#" method="post">
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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination.name : ``}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${getDestinationItemsTemplate(allDestinations)}
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
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price ? price : ``}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${id ? `Delete` : `Cancel`}</button>
          ${getFavoriteAndEditButtons(id, isFavorite)}
        </header>
        ${getEventDetailsTemplate(offers, typesOffers, destination)}
      </form>`
    );
  };

  if (id) {
    return (
      `<li class="trip-events__item">
        ${getMainForm()}
      </li>`
    );
  } else {
    return getMainForm();
  }
};

class EventEdit extends AbstractSmartComponent {
  constructor(event, destinations, offers) {
    super();

    this._event = event;
    this._destination = event.destination;
    this._type = event.type;
    this._offers = event.offers;

    this._flatpickres = [];

    this._allDestinations = destinations;
    this._allOffers = offers;

    this._editFormSubmitHandler = null;
    this._favoriteButtonClickHandler = null;
    this._deleteButtonClickHandler = null;

    this._onTimeChange = this._onTimeChange.bind(this);

    this._applyFlatpickr();
    this._subscribeOnEvents();

    this._setInvalidStateOnEmptyInputs();
  }

  getTemplate() {
    return getEventEditTemplate(this._event, this._allDestinations, this._getOffers(this._type), {
      type: this._type,
      offers: this._offers,
      destination: this._destination,
    });
  }

  _setInvalidStateOnEmptyInputs() {
    const element = this.getElement();
    const destinationInput = element.querySelector(`.event__input--destination`);
    const priceInput = element.querySelector(`.event__input--price`);

    if (!destinationInput.value) {
      destinationInput.setCustomValidity(`Пожалуйста сделайте выбор из списка предложенных пунктов назначения`);
    }

    if (!priceInput.value) {
      priceInput.setCustomValidity(`Стоимость должна быть целым числом`);
    }
  }

  _parseFormData(formData) {
    const type = formData.get(`event-type`);
    const rawStartTime = formData.get(`event-start-time`);
    const rawEndTime = formData.get(`event-end-time`);

    const offersCheckboxes = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    let checkedOffersTitles = [];

    for (const checkbox of Array.from(offersCheckboxes)) {
      if (checkbox.checked) {
        checkedOffersTitles.push(getStringWithFirstCapitalLetter(checkbox.name.slice(12).split(`-`).join(` `)).replace(`check `, `check-`));
      }
    }

    const offersForCurrentType = this._getOffers(type);
    const offers = offersForCurrentType.filter((it) => {
      return checkedOffersTitles.includes(it.title);
    });

    return {
      price: parseInt(formData.get(`event-price`), 10),
      time: {
        start: new Date(getIsoTimeFormat(rawStartTime)),
        end: new Date(getIsoTimeFormat(rawEndTime)),
      },
      destination: this._getDestination(formData.get(`event-destination`)),
      offers,
      type,
    };
  }

  _getOffers(type) {
    const index = this._allOffers.findIndex((it) => {
      return it.type === type;
    });
    return this._allOffers[index].offers;
  }

  _getDestination(name) {
    const index = this._allDestinations.findIndex((it) => {
      return it.name === name;
    });
    if (index === -1) {
      return false;
    } else {
      return this._allDestinations[index];
    }
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickres.forEach((it) => {
        it.destroy();
      });
      this._flatpickres = [];
    }

    const timeStartInput = this.getElement().querySelector(`[name=event-start-time]`);
    const timeEndInput = this.getElement().querySelector(`[name=event-end-time]`);

    this._flatpickres.push(flatpickr(timeStartInput, {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: this._event.time.start,
    }));
    this._flatpickres.push(flatpickr(timeEndInput, {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: this._event.time.end,
    }));
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
    this._setInvalidStateOnEmptyInputs();
  }

  recoveryListeners() {
    if (this._favoriteButtonClickHandler) {
      this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    }
    this.setEditFormSubmitHandler(this._editFormSubmitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  cancelUnsavedChanges() {
    this._destination = this._event.destination;
    this._type = this._event.type;
    this._offers = this._event.offers;

    this.rerender();
  }

  getData() {
    const form = this.getElement().parentElement.querySelector(`.event--edit`);
    const formData = new FormData(form);

    return this._parseFormData(formData);
  }

  setEditFormSubmitHandler(handler) {
    this.getElement().parentElement.querySelector(`.event--edit`).addEventListener(`submit`, handler);
    this._editFormSubmitHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);

    this._favoriteButtonClickHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  checkValidity() {
    const element = this.getElement();
    const destinationInput = element.querySelector(`.event__input--destination`);
		const priceInput = element.querySelector(`.event__input--price`);
		const dateInputs = element.querySelectorAll(`.flatpickr-input`);

    destinationInput.checkValidity();
    dateInputs.forEach((it) => {
      it.checkValidity();
    });
    priceInput.checkValidity();
  }

  _onTimeChange() {
    const element = this.getElement();
    const timeInputs = element.querySelectorAll(`.flatpickr-input`);

    const timeEnd = new Date(getIsoTimeFormat(element.querySelector(`[name=event-end-time]`).value));
    const timeStart = new Date(getIsoTimeFormat(element.querySelector(`[name=event-start-time]`).value));

    if (timeStart.getTime() <= timeEnd.getTime()) {
      timeInputs.forEach((it) => {
        it.setCustomValidity(``);
      });
    } else {
      timeInputs.forEach((it) => {
        it.setCustomValidity(`Дата окончания не может быть меньше даты начала события`);
      });
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-group`).forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        this._type = evt.target.value;
        this._offers = [];

        this.rerender();
      });
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      const newDestination = this._getDestination(evt.target.value);
      if (newDestination) {
        this._destination = newDestination;
        this.rerender();
        evt.target.setCustomValidity(``);
      } else {
        evt.target.setCustomValidity(`Пожалуйста сделайте выбор из списка предложенных пунктов назначения`);
      }
    });

    element.querySelectorAll(`.event__input--time`).forEach((it) => {
      it.addEventListener(`change`, this._onTimeChange);
    });

    element.querySelector(`.event__input--price`).addEventListener(`change`, (evt) => {
      if (Number.isInteger(parseFloat(evt.target.value))) {
        evt.target.setCustomValidity(``);
      } else {
        evt.target.setCustomValidity(`Стоимость должна быть целым числом`);
      }
    });
  }
}

export default EventEdit;
