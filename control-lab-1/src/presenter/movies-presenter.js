import FormMovieComponent   from '../view/form-movie-component.js';
import FilterComponent      from '../view/filter-component.js';
import MoviesListComponent  from '../view/movies-list-component.js';
import MovieCardComponent   from '../view/movie-card-component.js';
import { render }           from '../framework/render.js';

export default class MoviesPresenter {
  #containerForm; #containerFilter; #containerList; #model; #moviesListComponent; #currentFilter;

  constructor({ formContainer, filterContainer, listContainer, model }) {
    this.#containerForm   = formContainer;
    this.#containerFilter = filterContainer;
    this.#containerList   = listContainer;
    this.#model           = model;
  }

  init() {
    render(new FormMovieComponent({ onSubmit: (title, watched) => {
      this.#model.addMovie(title, watched);
      this._renderList();
    }}), this.#containerForm);

    render(new FilterComponent({ onFilterChange: filter => {
      this.#currentFilter = filter;
      this._renderList();
    }}), this.#containerFilter);

    this.#moviesListComponent = new MoviesListComponent();
    render(this.#moviesListComponent, this.#containerList);

    this.#currentFilter = { status: 'all', favorite: false };
    this._renderList();
  }

  _renderList() {
    this.#moviesListComponent.element.innerHTML = '';
    const movies = this.#model.filter(this.#currentFilter);
    movies.forEach(movie => {
      const card = new MovieCardComponent({
        movie,
        onDelete: id => { this.#model.deleteMovie(id); this._renderList(); },
        onEdit: id => {
          const newTitle = prompt('Новое название:', movie.title);
          if (newTitle) { this.#model.updateMovie(id, { title: newTitle }); this._renderList(); }
        },
        onToggleWatched: (id, watched) => { this.#model.updateMovie(id, { watched }); },
        onToggleFav:    (id, fav)     => { this.#model.updateMovie(id, { favorite: fav }); }
      });
      render(card, this.#moviesListComponent.element);
    });
  }
}