export default () => {
  const viewLogin = `<section>
    <div class="Login">
    <label for="staticEmail" class="loginLabel">Email</label>
    <div class="inputLogin">
      <input type="email"  class="emailLogin" id="loginEmail" placeholder="email@example.com">
    </div>
  </div>
  <div class="Login">
    <label for="inputPassword" class="loginLabel">Password</label>
    <div class="inputLogin">
      <input type="password" class="inputPassword" id="passwordLogin">
    </div>
  </div>
  <div class="buttonLogin">
    <button type="submit" id="submitLogin" class="btn">Enter</button>
  </div>
 
  </section>`;

  const divElem = document.createElement('div');
  divElem.innerHTML = viewLogin;

  const button = divElem.querySelector('#submitLogin');
  button.addEventListener('click', () => {
    const loginEmail = divElem.querySelector('#loginEmail').value;
    const passwordLogin = divElem.querySelector('#passwordLogin').value;

    // FUNCIÓN LOGIN

    firebase.auth().signInWithEmailAndPassword(loginEmail, passwordLogin)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.hash = '#/';
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  });

  return divElem;
};

// function observador() {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       console.log('bienvenido');

//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       // ...
//     } else {
//       console.log('no existe usuario');
//       // User is signed out
//       // ...
//     }
//   });
// }

// CERRAR SESIÓN

// function cerrarSesion() {
//   firebase.auth().signOut()
//     .then(() => {
//       console.log('saliendo...');
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
