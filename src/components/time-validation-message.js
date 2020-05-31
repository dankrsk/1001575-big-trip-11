import AbstractComponent from '../components/abstract-component.js';

class TimeValidationMessage extends AbstractComponent {
  getTemplate() {
    return (
      `<span class="error-message">Дата окончания не может быть меньше даты начала события</span>`
    );
  }
}

export default TimeValidationMessage;
