const view404 = () => {
  const view = `
  <section class="error">
    <div class="page-404 container">
      <h1>Oops...</h1>
      <img src="../img/error404.jpg" alt="404-img" height="80%" width="80%">
      <h2>Looks like the page you searched for is in another destination!</h2>
      <h3>To go back to the main page, please click the button below </h3>
      <button class="button">Home</button>
    </div>
  </section>`;

  const divElementm = document.createElement('div');
  divElementm.innerHTML = '';
  divElementm.innerHTML = view;

  const goHome = divElementm.querySelector('.button');
  // eslint-disable-next-line no-return-assign
  goHome.addEventListener('click', () => window.location.hash = '#/');

  return divElementm;
};

export { view404 };
