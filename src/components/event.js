const getEventTemplate = (event) => {

  const getEventWithAction = (type) => {
    if (type === `Check-in` || type === `Sightseeing` || type === `Restaurant`) {
      return `${type} in`;
    } else {
      return `${type} to`;
    }
  };

  const getDualFormat = (number) => {
    return number.toString().padStart(2, 0);
  };

  const getEventDuration = (startDate, endDate) => {
    const ONE_DAY_IN_MS = 86400000;
    const ONE_HOUR_IN_MS = 3600000;
    const ONE_MINUTE_IN_MS = 60000;

    const duration = endDate.getTime() - startDate.getTime();
    const days = Math.floor(duration / ONE_DAY_IN_MS);
    const hours = Math.floor(duration % ONE_DAY_IN_MS / ONE_HOUR_IN_MS);
    const minutes = Math.floor(duration % ONE_DAY_IN_MS % ONE_HOUR_IN_MS / ONE_MINUTE_IN_MS);

    if (days) {
      return `${getDualFormat(days)}D ${getDualFormat(hours)}H ${getDualFormat(minutes)}M`;
    } else {
      return hours ? `${getDualFormat(hours)}H ${getDualFormat(minutes)}M` : `${getDualFormat(minutes)}M`;
    }
  };

  const getOffersTemplate = (offers) => {
    const OFFERS_NUMBER_TO_SHOW = 3;
    let template = ``;

    if (offers.length !== 0) {
      const items = offers.map((it) => {
        return `<li class="event__offer">
                  <span class="event__offer-title">${it.title}</span>
                  &plus;&euro;&nbsp;<span class="event__offer-price">${it.price}</span>
                </li>`;
      }).slice(0, OFFERS_NUMBER_TO_SHOW).join(`\n`);
      template = `<h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">
                    ${items}
                  </ul>`;
    }

    return template;
  };

  const eventType = event.type;
  const city = event.city;
  const price = event.price;
  const eventOffers = event.offers;

  const dateTime = `${event.time.date.getFullYear()}-${event.time.date.getMonth()}-${event.time.date.getDate()}`;
  const startTime = `${getDualFormat(event.time.start.getHours())}:${getDualFormat(event.time.start.getMinutes())}`;
  const endTime = `${getDualFormat(event.time.end.getHours())}:${getDualFormat(event.time.end.getMinutes())}`;
  const duration = getEventDuration(event.time.start, event.time.end);

  return (
    `<li class="trip-events__item">
			<div class="event">
				<div class="event__type">
					<img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
				</div>
				<h3 class="event__title">${getEventWithAction(eventType)} ${city}</h3>
				<div class="event__schedule">
					<p class="event__time">
						<time class="event__start-time" datetime="${dateTime}T${startTime}">${startTime}</time>
						&mdash;
						<time class="event__end-time" datetime="${dateTime}T${endTime}">${endTime}</time>
					</p>
					<p class="event__duration">${duration}</p>
				</div>
				<p class="event__price">
					&euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        ${getOffersTemplate(eventOffers)}
				<button class="event__rollup-btn" type="button">
					<span class="visually-hidden">Open event</span>
				</button>
			</div>
		</li>`
  );
};

export {getEventTemplate};
