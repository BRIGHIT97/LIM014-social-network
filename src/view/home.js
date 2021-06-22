const homeView = (elem) => {
  const goLogin = elem.querySelector('#logIn');
  // eslint-disable-next-line no-return-assign
  goLogin.addEventListener('click', () => window.location.hash = '#/login');

  const goSign = elem.querySelector('#signUp');
  // eslint-disable-next-line no-return-assign
  goSign.addEventListener('click', () => window.location.hash = '#/register');

  // eslint-disable-next-line no-unused-vars
  const containerVerify = elem.querySelector('.containerVerify');
};

const viewHome = () => {
  const view = `
    <section class="container container-home">
      <h1 class="container-home__h1"> Do-Re-Mi</h1>
      <img src="img/logoMarca.png" id='logo' alt="" height="80px" width="80px">
     <div>
        <h3 class="container-home__h3 align-start">Enjoy the music!</h3>
        <p class="containerVerify"></p>
      </div>
      <div class="btnReg">
      <button id="logIn" class="button">Log In</button>
      </div>
      <p class="container-home__p">*** or ***</p>
      <div class="btnReg">
      <button id="signUp" class="button button--white">Sign Up</button>
      </div>
      </section>`;

  const divElem = document.createElement('div');
  divElem.classList.add('divElement');
  divElem.innerHTML = view;

  homeView(divElem);
  return divElem;
};

export { viewHome };
