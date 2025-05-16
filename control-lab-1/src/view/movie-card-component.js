import { AbstractComponent } from '../framework/view/abstract-component.js';

function createCardTemplate(movie) {
  return `
    <div class="card ${movie.watched ? 'watched' : ''}">
      <h3 class="card-title">${movie.title}</h3>
      <div class="card-details">
        <label><input type="checkbox" class="toggle-watched" ${movie.watched? 'checked':''}/> Просмотрен</label>
        <label><input type="checkbox" class="toggle-fav" ${movie.favorite? 'checked':''}/> Избранное</label>
        <button class="edit-btn">Редактировать</button>
        <button class="delete-btn">Удалить</button>
      </div>
    </div>
  `;
}

export default class MovieCardComponent extends AbstractComponent {
  constructor({ movie, onDelete, onEdit, onToggleWatched, onToggleFav }) {
    super();
    this._movie = movie;
    this._onDelete = onDelete;
    this._onEdit = onEdit;
    this._onToggleWatched = onToggleWatched;
    this._onToggleFav = onToggleFav;

    this.element.querySelector('.delete-btn')
      .addEventListener('click', e => { e.stopPropagation(); this._onDelete(movie.id); });

    this.element.querySelector('.edit-btn')
      .addEventListener('click', e => {
        e.stopPropagation(); this._onEdit(movie.id);
      });

    this.element.querySelector('.toggle-watched')
      .addEventListener('change', evt => this._onToggleWatched(movie.id, evt.target.checked));

    this.element.querySelector('.toggle-fav')
      .addEventListener('change', evt => this._onToggleFav(movie.id, evt.target.checked));

    this.element.addEventListener('click', () => {
      this.element.classList.toggle('expanded');
    });
  }

  get template() { return createCardTemplate(this._movie); }
}
