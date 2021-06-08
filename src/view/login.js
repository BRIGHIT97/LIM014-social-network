export default () => {
  const viewLogin = `<section>
    <div class="logo">
    <img src="img/logoMarca.png" id='logo' alt="" height="80px" width="80px">
    </div>
    <div id='fotmLogin'
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
  <div>
  <a href= "#/SignIn" >You do not have an account? Sign up!</a>
  </div>
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

    // FUNCIÓN OBSERVADOR
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(`${uid}el usuario esta activo`);
        // ...
      } else {
        console.log('el usuario no esta activo');
        // User is signed out
        // ...
      }
    });
  });

  return divElem;
};
