// Sign Up with email and password
const signUpAuth = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

// Log In
const logInAuth = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

// Sign in with Google
const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

// Sign Out
const signOutAuth = () => firebase.auth().signOut();

// Current user info
const userData = () => {
  const user = firebase.auth().currentUser;
  let data = '';
  if (user !== null) {
    data = {
      name: user.displayName,
      id: user.uid,
      photo: user.photoURL !== null ? user.photoURL : '../img/perfil.png',
    };
  }
  return data;
};

// On auth state changed
const authStateChanged = (cb) => firebase.auth().onAuthStateChanged(cb);

export {
  signUpAuth,
  signInGoogle,
  logInAuth,
  signOutAuth,
  userData,
  authStateChanged,
};
