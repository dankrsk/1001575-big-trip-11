const DEFAULT_TYPE = `flight`;

class Event {
  constructor(event = null) {
    this.price = event ? event[`base_price`] : null;
    this.time = {
      start: event ? new Date(event[`date_from`]) : new Date(),
      end: event ? new Date(event[`date_to`]) : new Date(),
    };
    this.destination = event ? event[`destination`] : null;
    this.id = event ? event[`id`] : null;
    this.isFavorite = event ? Boolean(event[`is_favorite`]) : false;
    this.offers = event ? event[`offers`] : null;
    this.type = event ? event[`type`] : DEFAULT_TYPE;
  }

  static parseEvent(event) {
    return new Event(event);
  }

  static parseEvents(events) {
    return events.map((event) => {
      return Event.parseEvent(event);
    });
  }

  static clone(event) {
    return new Event(event.toRAW());
  }

  toRAW() {
    return {
      "base_price": this.price,
      "date_from": this.time.start.toISOString(),
      "date_to": this.time.end.toISOString(),
      "destination": this.destination,
      "id": this.id,
      "is_favorite": this.isFavorite,
      "offers": this.offers,
      "type": this.type
    };
  }
}

export default Event;
