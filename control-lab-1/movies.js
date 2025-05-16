import MoviesModel     from './src/model/movies-model.js';
import MoviesPresenter from './src/presenter/movies-presenter.js';

const formContainer   = document.querySelector('.movie-form');
const filterContainer = document.querySelector('.movie-filter');
const listContainer   = document.querySelector('#movie-list');

const model     = new MoviesModel();
const presenter = new MoviesPresenter({ formContainer, filterContainer, listContainer, model });
presenter.init();