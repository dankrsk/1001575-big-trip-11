import Event from './models/event.js';
import Destination from './models/destination.js';
import Offer from './models/offer.js';

const Url = {
  EVENTS: `https://11.ecmascript.pages.academy/big-trip/points`,
  DESTINATIONS: `https://11.ecmascript.pages.academy/big-trip/destinations`,
  OFFERS: `https://11.ecmascript.pages.academy/big-trip/offers`,
};

class API {
  constructor(authorization) {
    this._authorization = authorization;

    this._badStatusHandlers = [];
  }

  _checkStatus(response, handler = null) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      if (handler) {
        handler();
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _callBadStatusHandlers() {
    this._badStatusHandlers.forEach((it) => {
      it();
    });
  }

  setBadStatusHandler(handler) {
    this._badStatusHandlers.push(handler);
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(Url.EVENTS, {headers})
      .then((response) => this._checkStatus(response, this._callBadStatusHandlers.bind(this)))
      .then((response) => response.json())
      .then((data) => Event.parseEvents(data));
  }

  getDestinations() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(Url.DESTINATIONS, {headers})
      .then((response) => this._checkStatus(response))
      .then((response) => response.json())
      .then((data) => Destination.parseDestinations(data));
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(Url.OFFERS, {headers})
      .then((response) => this._checkStatus(response))
      .then((response) => response.json())
      .then((data) => Offer.parseOffers(data));
  }

  updateEvent(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(Url.EVENTS + `/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data.toRAW()),
      headers,
    })
    .then((response) => this._checkStatus(response))
    .then((response) => response.json())
    .then((responseData) => Event.parseEvent(responseData));
  }

  deleteEvent(id) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(Url.EVENTS + `/${id}`, {
      method: `DELETE`,
      headers,
    })
    .then((response) => this._checkStatus(response));
  }

  createEvent(event) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(Url.EVENTS, {
      method: `POST`,
      body: JSON.stringify(event.toRAW()),
      headers,
    })
    .then((response) => this._checkStatus(response))
    .then((response) => response.json())
    .then((responseData) => Event.parseEvent(responseData));
  }
}

export default API;
