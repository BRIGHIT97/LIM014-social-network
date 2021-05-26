export default () => {
  const viewLogin = `<section>
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
        <input type="email"  class="email" id="staticEmail" placeholder="email@example.com">
      </div>
    </div>
    <div class="registration">
      <label for="inputPassword" class="NameLabels">Password</label>
      <div class="inputRegistration">
        <input type="password" class="password" id="inputPassword">
      </div>
    </div>
    <div class="buttonRegistration">
      <button type="submit" class="submit">Confirm identity</button>
    </div>
    </section>`;

  const divElem = document.createElement('div');
  divElem.innerHTML = viewLogin;

  return divElem;
};
