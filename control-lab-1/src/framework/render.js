import { AbstractComponent } from './view/abstract-component.js';

export const RenderPosition = { BEFOREEND: 'beforeend' };

export function createElement(html) {
  const div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild;
}

export function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof AbstractComponent)) {
    throw new Error('Can render only components');
  }
  container.insertAdjacentElement(place, component.element);
}