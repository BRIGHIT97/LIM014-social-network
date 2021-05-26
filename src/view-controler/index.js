import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  // router
  switch (route) {
    case '#/':
    { return container.appendChild(components.home()); }
    case '#/Login':
    { return container.appendChild(components.login()); }
    case '#/SignIn':
    { return container.appendChild(components.signin()); }
    case '#/Profile':
    { return container.appendChild(components.profile()); }
    default:
      break;
  }
  console.log(route);
};

export { changeView };
