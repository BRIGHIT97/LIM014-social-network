export default () => {
  const viewLogin = `<section>
    <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="email"  class="form-control-plaintext" id="staticEmail" placeholder="email@example.com">
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
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
    window.location.hash = '#/';
  });

  return divElem;
};
