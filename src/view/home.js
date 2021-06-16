const homeView = (elem) => {
  const goLogin = elem.querySelector('#logIn');
  goLogin.addEventListener('click', () => window.location.hash = '#/login');

  const goSign = elem.querySelector('#signUp');
  goSign.addEventListener('click', () => window.location.hash = '#/register');

  // eslint-disable-next-line no-unused-vars
  const containerVerify = elem.querySelector('.containerVerify');
};

const viewHome = () => {
  const view = `
    <section class="container container-home">
      <img src="img/logoMarca.png" id='logo' alt="" height="80px" width="80px">
      <h1 class="container-home__h1">Do-Re-Mi</h1>
      <div>
        <h3 class="container-home__h3 align-start">Enjoy the music!</h3>
        <p class="containerVerify"></p>
      </div>
      <button id="logIn" class="button">Log In</button>
      <p class="container-home__p">*** or ***</p>
      <button id="signUp" class="button button--white">Sign Up</button>
    </section>`;

  const divElem = document.createElement('div');
  divElem.classList.add('divElement');
  divElem.innerHTML = view;

  homeView(divElem);
  return divElem;
};

export { viewHome };
