// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
import { changeView } from './view-controler/index.js';

myFunction();

const init = () => {
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);
