class Event {
  constructor(data) {
    this.price = data[`base_price`];
    this.time = {
      start: new Date(data[`date_from`]),
      end: new Date(data[`date_to`]),
    };
    this.destination = data[`destination`];
    this.id = data[`id`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = data[`offers`];
    this.type = data[`type`];
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
