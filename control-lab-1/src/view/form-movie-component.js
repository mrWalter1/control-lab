import { AbstractComponent } from '../framework/view/abstract-component.js';
import { render, RenderPosition } from '../framework/render.js';

function createFormTemplate() {
  return `
    <h2>Добавить Фильм</h2>
    <form id="movie-form">
      <label for="movie-title">Название фильма:</label>
      <input type="text" id="movie-title" placeholder="Например, Начало" required />
      <div class="watched-toggle">
        <label for="movie-status">Отметить как просмотренный:</label>
        <label class="switch">
          <input type="checkbox" id="movie-status" />
          <span class="slider"></span>
        </label>
      </div>
      <button type="submit">Добавить Фильм</button>
    </form>
  `;
}

export default class FormMovieComponent extends AbstractComponent {
  constructor({ onSubmit }) {
    super();
    this._onSubmit = onSubmit;
    this.element.addEventListener('submit', evt => {
      evt.preventDefault();
      const title = this.element.querySelector('#movie-title').value.trim();
      const watched = this.element.querySelector('#movie-status').checked;
      this._onSubmit(title, watched);
      this.element.reset();
    });
  }
  get template() { return createFormTemplate(); }
}