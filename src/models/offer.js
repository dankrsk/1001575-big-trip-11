class Offer {
  constructor(data) {
    this.type = data[`type`];
    this.offers = data[`offers`];
  }

  static parseOffer(data) {
    return new Offer(data);
  }

  static parseOffers(data) {
    return data.map((it) => {
      return Offer.parseOffer(it);
    });
  }
}

export default Offer;
