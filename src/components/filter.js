import AbstractComponent from '../components/abstract-component.js';
import {FilterType} from '../сonst.js';

const getFilterTemplate = (filterType) => {
  return (
    `<form class="trip-filters" action="#" method="get">
			<div class="trip-filters__filter">
				<input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything"${(filterType === FilterType.EVERYTHING) ? ` checked` : ``}>
				<label class="trip-filters__filter-label" for="filter-everything">Everything</label>
		 	</div>
		 	<div class="trip-filters__filter">
				<input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${(filterType === FilterType.FUTURE) ? ` checked` : ``}>
				<label class="trip-filters__filter-label" for="filter-future">Future</label>
			</div>
			<div class="trip-filters__filter">
				<input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${(filterType === FilterType.PAST) ? ` checked` : ``}>
				<label class="trip-filters__filter-label" for="filter-past">Past</label>
			</div>
			<button class="visually-hidden" type="submit">Accept filter</button>
		</form>`
  );
};

class Filter extends AbstractComponent {
  constructor(filterType) {
    super();

    this._activeFilterType = filterType;
  }

  getTemplate() {
    return getFilterTemplate(this._activeFilterType);
  }

  setFilterChangeHandler(handler) {
    this.getElement().parentElement.querySelector(`.trip-filters`).addEventListener(`change`, (evt) => {
      handler(evt.target.value);
    });
  }
}

export default Filter;
