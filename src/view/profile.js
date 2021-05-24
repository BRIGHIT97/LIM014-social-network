export default () => {
  const viewProfile = '<h2 class ="text-center">¡Este es mi perfil!></h2>';

  const divElem = document.createElement('div');
  divElem.innerHTML = viewProfile;

  return divElem;
};
