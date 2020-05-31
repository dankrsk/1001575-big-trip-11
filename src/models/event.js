const DEFAULT_TYPE = `flight`;

class Event {
  constructor(data = null) {
    this.price = data ? data[`base_price`] : null;
    this.time = {
      start: data ? new Date(data[`date_from`]) : new Date(),
      end: data ? new Date(data[`date_to`]) : new Date(),
    };
    this.destination = data ? data[`destination`] : null;
    this.id = data ? data[`id`] : null;
    this.isFavorite = data ? Boolean(data[`is_favorite`]) : false;
    this.offers = data ? data[`offers`] : null;
    this.type = data ? data[`type`] : DEFAULT_TYPE;
  }

  static parseEvent(data) {
    return new Event(data);
  }

  static parseEvents(data) {
    return data.map((it) => {
      return Event.parseEvent(it);
    });
  }

  static clone(data) {
    return new Event(data.toRAW());
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
