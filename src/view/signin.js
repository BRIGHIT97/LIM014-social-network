export default () => {
  const viewSignin = `<section>
      <div class="logo">
      <img src="img/logoMarca.png" id='logo' alt="" height="80px" width="80px">
      </div>
      <div class="registration">
      <label for="inputNames" class="NameLabels">User Name</label>
      <div class="inputRegistration">
        <input type="user"  class="user" id="userName" placeholder="Name and Lastname">
      </div>  
      <div class="registration">
      <label for="birth" class="NameLabels">Birth Date</label>
      <div class="inputRegistration">
        <input type="inputBirth"  class="birth" id="birthDate" placeholder="25/05/2021">
      </div>  
      <div class="registration">
      <label for="staticEmail" class="NameLabels">Email</label>
      <div class="inputRegistration">
        <input type="email"  class="staticEmail" id="email" placeholder="email@example.com">
      </div>
    </div>
    <div class="registration">
      <label for="inputPassword" class="NameLabels">Password</label>
      <div class="inputRegistration">
        <input type="password" class="inputPassword" id="password">
      </div>
    </div>
    <div class="buttonRegistration">
      <button  type="submit" class="buttonSubmit" id='submitRegis'>Confirm identity</button>
    </div>
    <div class='google'>
     <img src="img/logoGoogle.png" id='logo' alt="" height="20px" width="20px">
     <button  class="googleRegistration" id='googleRegis'>Login with Google</button>
    </div>
    <div>
    <a href= "#/Login" >You have an account? Log in!</a>
    </div>
    </section>`;

  const divElem = document.createElement('div');
  divElem.innerHTML = viewSignin;

  const button = divElem.querySelector('#submitRegis');
  button.addEventListener('click', () => {
    const email = divElem.querySelector('#email').value;
    const password = divElem.querySelector('#password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
      });

    const user = firebase.auth().currentUser;

    user.sendEmailVerification().then(() => {
      // Email sent.
      window.location.hash = '#/';
      console.log('Sending Email Verification...');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  });

  const googleReg = divElem.querySelector('#googleRegis');
  googleReg.addEventListener('click', () => {
    // console.log('registrando con google...');
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        window.location.hash = '#/';
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  });
  return divElem;
};
