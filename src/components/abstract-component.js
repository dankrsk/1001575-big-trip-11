import {createElement} from '../utils/render.js';
import {CLASS_TO_HIDE_ELEMENT} from '../сonst.js';

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    this.getElement().classList.remove(CLASS_TO_HIDE_ELEMENT);
  }

  hide() {
    this.getElement().classList.add(CLASS_TO_HIDE_ELEMENT);
  }
}

export default AbstractComponent;
