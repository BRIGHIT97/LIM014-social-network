export default () => {
  const viewHome = '<h2 class ="text-center">¡BIENVENIDO A DO-RE-MI"></h2>';

  const divElem = document.createElement('div');
  divElem.innerHTML = viewHome;

  return divElem;
};
