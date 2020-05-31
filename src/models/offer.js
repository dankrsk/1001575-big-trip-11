class Offer {
  constructor(offer) {
    this.type = offer[`type`];
    this.offers = offer[`offers`];
  }

  static parseOffer(offer) {
    return new Offer(offer);
  }

  static parseOffers(offers) {
    return offers.map((offer) => {
      return Offer.parseOffer(offer);
    });
  }
}

export default Offer;
