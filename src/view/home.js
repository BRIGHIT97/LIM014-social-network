export default () => {
  const viewHome = `<section>
  <h2 class ="text-center">¡BIENVENIDO A DO-RE-MI"></h2>
  <div>
    <button onclick="cerrar()" id='bclose'>Cerrar Sesión</button>
  </div>
   </section>`;

  const divElem = document.createElement('div');
  divElem.innerHTML = viewHome;

  const bclose = divElem.querySelector('#bclose');
  bclose.addEventListener('click', () => {
    // console.log('cerrando sesión...');
    firebase.auth().signOut().then(() => {
      window.location.hash = '#/Login';
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  });
  return divElem;
};
