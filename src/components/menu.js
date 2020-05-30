import AbstractComponent from '../components/abstract-component.js';

const States = {
  TABLE: `Table`,
  STATS: `Stats`,
};

const getMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
			<a class="trip-tabs__btn trip-tabs__btn--active" href="#">${States.TABLE}</a>
		 	<a class="trip-tabs__btn" href="#">${States.STATS}</a>
		</nav>`
  );
};

class Menu extends AbstractComponent {
  constructor() {
    super();

    this._activeState = States.TABLE;
    this._tableLink = Array.from(this.getElement().querySelectorAll(`a`)).find((it) => {
      return it.innerHTML === States.TABLE;
    });
    this._statsLink = Array.from(this.getElement().querySelectorAll(`a`)).find((it) => {
      return it.innerHTML === States.STATS;
    });
  }

  getTemplate() {
    return getMenuTemplate();
  }

  setTableButtonClickHandler(handler) {
    this._tableLink.addEventListener(`click`, () => {
      if (this._activeState !== States.TABLE) {
        this._activeState = States.TABLE;
        this._tableLink.classList.add(`trip-tabs__btn--active`);
        this._statsLink.classList.remove(`trip-tabs__btn--active`);
        handler();
      }
    });
  }

  setStatsButtonClickHandler(handler) {
    this._statsLink.addEventListener(`click`, () => {
      if (this._activeState !== States.STATS) {
        this._activeState = States.STATS;
        this._statsLink.classList.add(`trip-tabs__btn--active`);
        this._tableLink.classList.remove(`trip-tabs__btn--active`);
        handler();
      }
    });
  }
}

export default Menu;
