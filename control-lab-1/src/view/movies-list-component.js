import { AbstractComponent } from '../framework/view/abstract-component.js';

function createListTemplate() {
  // просто контейнер, внутрь которого презентер будет «накидывать» карточки
  return `<div class="card-container"></div>`;
}

export default class MoviesListComponent extends AbstractComponent {
  get template() {
    return createListTemplate();
  }
}
