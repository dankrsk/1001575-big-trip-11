import AbstractComponent from '../components/abstract-component.js';
import {SortType} from '../сonst.js';

const getSortTemplate = (sortType) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
			<span class="trip-sort__item  trip-sort__item--day">${(sortType === SortType.DEFAULT) ? `Day` : ``}</span>
			<div class="trip-sort__item  trip-sort__item--event">
				<input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event"${(sortType === SortType.DEFAULT) ? ` checked` : ``}>
				<label class="trip-sort__btn" for="sort-event">Event</label>
			</div>
			<div class="trip-sort__item  trip-sort__item--time">
				<input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time"${(sortType === SortType.TIME) ? ` checked` : ``}>
				<label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time">
					Time
				</label>
			</div>
			<div class="trip-sort__item  trip-sort__item--price">
				<input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price"${(sortType === SortType.PRICE) ? ` checked` : ``}>
				<label class="trip-sort__btn" for="sort-price">
					Price
				</label>
			</div>
			<span class="trip-sort__item  trip-sort__item--offers">Offers</span>
		 </form>`
  );
};

class Sort extends AbstractComponent {
  constructor(sortType) {
    super();

    this._activeSortType = sortType;
  }

  getTemplate() {
    return getSortTemplate(this._activeSortType);
  }

  setSortFormChangeHandler(handler) {
    this.getElement().parentElement.querySelector(`.trip-sort`).addEventListener(`change`, (evt) => {
      handler(evt.target.value);
    });
  }
}

export default Sort;
