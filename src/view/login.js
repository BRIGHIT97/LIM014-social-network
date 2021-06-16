import { logInAuth, signInGoogle } from '../controller/auth.js';

const logIn = (elem) => {
  const goLogIn = elem.querySelector('form');
  goLogIn.addEventListener('submit', (e) => {
    e.preventDefault();
    const logInPassword = elem.querySelector('#logIn-password').value;
    const logInEmail = elem.querySelector('#logIn-email').value;
    const elemDiv = elem.querySelector('.error');

    logInAuth(logInEmail, logInPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          window.location.hash = '#/general';
        } else {
          elemDiv.textContent = '⚠️❗ Try again.';
        }
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          elemDiv.textContent = '⚠️ Your password is wrong. Try again.';
        } else if (error.code === 'auth/user-not-found') {
          elemDiv.textContent = '⚠️ The email you entered does not match to any account. Try again.';
        } else {
          elemDiv.textContent = '⚠️ An error occurred. Please try again.';
        }
      });
  });
};

const signInWithGoogle = (elem) => {
  const signInButton = elem.querySelector('#logIn-google');
  signInButton.addEventListener('click', () => {
    const elemDiv = elem.querySelector('.error');
    // eslint-disable-next-line no-return-assign
    signInGoogle().then(() => window.location.hash = '#/general')
    // eslint-disable-next-line no-return-assign
      .catch(() => elemDiv.textContent = '⚠️ An error occurred. Please try again.');
  });
};

const viewLogIn = () => {
  const view = `
  <section class="container container-form">
    <h1 class="container-home__h1">DO-RE-MI</h1>
    <img src="img/logoMarca.png" id='logo' alt="" height="80px" width="80px">
    <h3 class="container-home__h3">Welcome back!</h3>
    <button id="logIn-google" class="button button--white">Sign In with <i class="fab fa-google"></i></button>
    <form id="logIn-form">
      <div class="margin--button align-end">
        <i class="far fa-envelope "></i>
        <input type="email" id="logIn-email" class="input" placeholder="E-mail" required>
      </div>
      <div class="margin--button">
        <i class="fas fa-unlock-alt"></i>
        <input type="password"  id="logIn-password" class="input" placeholder="Password" minlength=6 required>
      </div>
      <div class="error"></div>
      <button class="button align-end" id="buttonSingin">Sign in</button>
    </form>
    <article class="align-start">
      <h4 class="container-home__h4 ahref"> Don't have an account?<a class="ahref" href="#/register"> Sign Up </a></h4>
          </article>
  </section>
  `;

  const divElem = document.createElement('div');
  divElem.classList.add('divElement');
  divElem.innerHTML = view;

  logIn(divElem);
  signInWithGoogle(divElem);

  return divElem;
};

export { viewLogIn };

// export default () => {
//   const viewLogin = `<section>
//     <div class="logo">
//     <img src="img/logoMarca.png" id='logo' alt="" height="80px" width="80px">
//     </div>
//     <div id='fotmLogin'
//     <div class="Login">
//     <label for="staticEmail" class="loginLabel">Email</label>
//     <div class="inputLogin">
//       <input type="email"  class="emailLogin" id="loginEmail" placeholder="email@example.com">
//     </div>
//   </div>
//   <div class="Login">
//     <label for="inputPassword" class="loginLabel">Password</label>
//     <div class="inputLogin">
//       <input type="password" class="inputPassword" id="passwordLogin">
//     </div>
//   </div>
//   <div class="buttonLogin">
//     <button type="submit" id="submitLogin" class="btn">Enter</button>
//   </div>
//   <div>
//   <a href= "#/SignIn" >You do not have an account? Sign up!</a>
//   </div>
//  </div>
//   </section>`;

//   const divElem = document.createElement('div');
//   divElem.innerHTML = viewLogin;

//   const button = divElem.querySelector('#submitLogin');
//   button.addEventListener('click', () => {
//     const loginEmail = divElem.querySelector('#loginEmail').value;
//     const passwordLogin = divElem.querySelector('#passwordLogin').value;

//     // FUNCIÓN LOGIN

//     firebase.auth().signInWithEmailAndPassword(loginEmail, passwordLogin)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         window.location.hash = '#/';
//         console.log(userCredential);
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode);
//         console.log(errorMessage);
//       });

//     // FUNCIÓN OBSERVADOR
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         console.log(`${uid}el usuario esta activo`);
//         // ...
//       } else {
//         console.log('el usuario no esta activo');
//         // User is signed out
//         // ...
//       }
//     });
//   });

//   return divElem;
// };
