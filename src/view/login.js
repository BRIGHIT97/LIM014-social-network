export default () => {
  const viewLogin = `<section>
    <div class="Login">
    <label for="staticEmail" class="loginLabel">Email</label>
    <div class="col-sm-10">
      <input type="email"  class="emailLogin" id="loginEmail" placeholder="email@example.com">
    </div>
  </div>
  <div class="Login">
    <label for="inputPassword" class="loginLabel">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword">
    </div>
  </div>
  <div class="col-auto">
    <button type="submit" id="submit" class="btn btn-primary mb-3">Confirm identity</button>
  </div>
 
  </section>`;

  const divElem = document.createElement('div');
  divElem.innerHTML = viewLogin;

  const button = divElem.querySelector('#submit');
  button.addEventListener('click', () => {
    // window.location.hash = '#/';

    const email = divElem.querySelector('#email').value;
    const password = divElem.querySelector('#password').value;
  });

  return divElem;
};
