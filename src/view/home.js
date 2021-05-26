export default () => {
  const viewHome = `<section>
  <h2 class ="text-center">¡BIENVENIDO A DO-RE-MI"></h2>
   </section>`;

  const divElem = document.createElement('div');
  divElem.innerHTML = viewHome;

  return divElem;
};
