class Destination {
  constructor(destination) {
    this.description = destination[`description`];
    this.name = destination[`name`];
    this.pictures = destination[`pictures`];
  }

  static parseDestination(destination) {
    return new Destination(destination);
  }

  static parseDestinations(destinations) {
    return destinations.map((destination) => {
      return Destination.parseDestination(destination);
    });
  }
}

export default Destination;
