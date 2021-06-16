import components from '../view/index.js';
import { authStateChanged } from '../controller/auth.js';

// eslint-disable-next-line consistent-return
const changeView = (rute) => {
  const container = document.querySelector('#main');
  container.innerHTML = '';
  switch (rute) {
    case '#/':
      container.appendChild(components.home());
      break;

    case '#/login':
      container.appendChild(components.login());
      break;

    case '#/register':
      container.appendChild(components.register());
      break;

    case '#/general':
      authStateChanged((user) => {
        if (user !== null) {
          const userobj = {
            name: user.displayName,
            id: user.uid,
            photo: user.photoURL !== null ? user.photoURL : '../img/perfil.png',
          };
          container.appendChild(components.general(userobj));
        }
      });
      break;
    case '#/profile':
      authStateChanged((user) => {
        if (user !== null) {
          const userobj = {
            name: user.displayName,
            id: user.uid,
            photo: user.photoURL !== null ? user.photoURL : '../img/perfil.png',
          };
          container.appendChild(components.profile(userobj));
        }
      });
      break;
    default:
      container.appendChild(components.page404());
      break;
  }
};

export { changeView };

// import { components } from '../view/index.js';

// const changeView = (route) => {
//   const container = document.getElementById('container');
//   container.innerHTML = '';
//   // router
//   switch (route) {
//     case '#/':
//     { return container.appendChild(components.home()); }
//     case '#/Login':
//     { return container.appendChild(components.login()); }
//     case '#/SignIn':
//     { return container.appendChild(components.signin()); }
//     case '#/Profile':
//     { return container.appendChild(components.profile()); }
//     default:
//       break;
//   }
//   console.log(route);
// };

// export { changeView };
