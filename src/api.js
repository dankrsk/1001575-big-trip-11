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
    this._badStatusHandlers.forEach((handler) => {
      handler();
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
      .then((events) => Event.parseEvents(events));
  }

  getDestinations() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(Url.DESTINATIONS, {headers})
      .then((response) => this._checkStatus(response))
      .then((response) => response.json())
      .then((destinations) => Destination.parseDestinations(destinations));
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(Url.OFFERS, {headers})
      .then((response) => this._checkStatus(response))
      .then((response) => response.json())
      .then((offers) => Offer.parseOffers(offers));
  }

  updateEvent(id, newEvent) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(Url.EVENTS + `/${id}`, {
      method: `PUT`,
      body: JSON.stringify(newEvent.toRAW()),
      headers,
    })
    .then((response) => this._checkStatus(response))
    .then((response) => response.json())
    .then((event) => Event.parseEvent(event));
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

  createEvent(newEvent) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(Url.EVENTS, {
      method: `POST`,
      body: JSON.stringify(newEvent.toRAW()),
      headers,
    })
    .then((response) => this._checkStatus(response))
    .then((response) => response.json())
    .then((event) => Event.parseEvent(event));
  }
}

export default API;
