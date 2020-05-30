import {FilterType} from '../сonst.js';
import FilterComponent from '../components/filter.js';
import {render, RenderPosition, remove} from '../utils/render.js';

class Filter {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  render() {
    this._filterComponent = new FilterComponent(this._activeFilterType);
    this._filterComponent.setFilterChangeHandler(this.onFilterChange);

    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
  }

  onFilterChange(filterType) {
    this._eventsModel.setFilter(filterType);
    this._activeFilterType = filterType;

    remove(this._filterComponent);
    this.render();
  }
}

export default Filter;
