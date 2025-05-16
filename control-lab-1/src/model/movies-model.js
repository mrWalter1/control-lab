function generateID() {
  return '_' + Math.random().toString(36).substr(2,9) + Date.now();
}

export default class MoviesModel {
  #movies = [];

  get movies() { return this.#movies; }

  addMovie(title, watched) {
    this.#movies.push({ id: generateID(), title, watched, favorite: false });
  }

  deleteMovie(id) {
    this.#movies = this.#movies.filter(m => m.id !== id);
  }

  updateMovie(id, fields) {
    const m = this.#movies.find(m => m.id === id);
    if (m) Object.assign(m, fields);
  }

  filter({ status, favorite }) {
    return this.#movies.filter(m => {
      if (status==='watched' && !m.watched) return false;
      if (status==='unwatched' && m.watched) return false;
      if (favorite && !m.favorite) return false;
      return true;
    });
  }
}