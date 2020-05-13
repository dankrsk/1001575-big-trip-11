import {FilterType} from '../сonst.js';
import FilterComponent from '../components/filter.js';
import {render, RenderPosition} from '../utils/render.js';

class Filter {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    this._filterComponent = new FilterComponent();
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _onFilterChange(filterType) {
    this._eventsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}

export default Filter;
