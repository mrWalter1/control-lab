import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFilterTemplate() {
  return `
    <section class="movie-filter-wrapper">
      <h2>Фильтры</h2>
      <fieldset>
        <label><input type="radio" name="status-filter" value="all" checked /> Все</label>
        <label><input type="radio" name="status-filter" value="watched" /> Просмотренные</label>
        <label><input type="radio" name="status-filter" value="unwatched" /> Непросмотренные</label>
      </fieldset>
      <label><input type="checkbox" id="favorite-filter" /> Показывать только избранное</label>
    </section>
  `;
}

export default class FilterComponent extends AbstractComponent {
  constructor({ onFilterChange }) {
    super();
    this._onFilterChange = onFilterChange;
    this.element.addEventListener('change', () => {
      const status = this.element.querySelector('input[name="status-filter"]:checked').value;
      const favorite = this.element.querySelector('#favorite-filter').checked;
      this._onFilterChange({ status, favorite });
    });
  }
  get template() { return createFilterTemplate(); }
}
