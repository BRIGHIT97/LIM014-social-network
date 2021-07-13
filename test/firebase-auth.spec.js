import {
  signUpAuth,
  logInAuth,
  signInGoogle,
  signOutAuth,

// eslint-disable-next-line import/no-unresolved
} from '../src/controller/auth.js';

// configurando firebase mock
const firebasemock = require('firebase-mock-functions');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  // () => mockfirestore,
);
describe('signUpAuth', () => {
  it('deberia crear un nuevo usuario con email y contraseña', () => {
    signUpAuth('brighit.qa@gmail.com', '123abc')
      .then((user) => {
        expect(user.email).toBe('brighit.qa@gmail.com');
      });
  });
});

describe('logInAuth', () => {
  it('deberia permitir ingresar al usuario con un email: brighit.qa@gmail.com y una contraseña: 123abc', () => {
    logInAuth('brighit.qa@gmail.com', '123abc')
      .then((user) => {
        expect(user.email).toBe('brighit.qa@gmail.com');
      });
  });
});

describe('signInGoogle', () => {
  it('debe permitir ingresar con una cuenta google', () => {
    signInGoogle().then((user) => {
      expect(user.isAnonymous).toBe('false');
    });
  });
});

describe('signOutAuth', () => {
  it('debe permitir cerrar sesión', () => {
    signOutAuth().then((user) => {
      expect(user).toBe('null');
    });
  });
});

// describe('userData', () => {
//     it('Debe permitir obtener los datos del perfil del usuario', () =>{
//         userData(user).then((data) => {
//             expect(data).toBe('')
//     });
//     });
//   });
// // importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });
