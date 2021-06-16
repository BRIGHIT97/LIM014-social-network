import {
  createPost,
  navSlide,
  logOut,
  postTemplate,
  postFunctions,
  postLikes,
  createPostComments,
  readComments,
} from './general.js';

import { readAllPosts } from '../controller/firebase-store.js';

const viewProfile = (user) => {
  const view = `
  <div class="container-header">
    <h1 class="h1">Do-Re-Mi</h1>
    <img src="img/logoMarca.png" id='logo' alt="" height="80px" width="80px">
    <i class="fas fa-bars btnMenu"></i>
    <nav>
      <ul class="viewNav">
        <li><a class="links" href="#/general">Home</a></li>
        <li><a class="links" href="#/profile">Profile</a></li>
        <li id="logOut"><a class="links" href="#/">Log out</a></li>
      </ul>
    </nav>
  </div>
  <section class="profile-desktop">
    <div class="user-info profile">
      <img alt="userimage" src="${user.photo}">
      <h2 class="user-name profile-name">${user.name}</h2>
    </div>
    <div>
      <form id="form-createpost" class="create-post">
        <textarea id="description" class="input-post" cols="30" rows="10" placeholder="What are you thinking about?"></textarea>
        <div class="error"></div>
        <div class="container-submit">
            <input type="file" id="uploadInput" accept="image/png, image/jpeg, image/jpg">
            <button id="btn-post" class="postBtn">Post</button>
        </div>
      </form>
      <div class="general-posts"></div>
    </div>
  </section>
  `;
  const divElementm = document.createElement('div');
  divElementm.innerHTML = '';
  divElementm.innerHTML = view;

  navSlide(divElementm);
  createPost(divElementm);
  logOut(divElementm);

  readAllPosts((post) => {
    const container = divElementm.querySelector('.general-posts');
    container.innerHTML = '';
    post.forEach((elem) => {
      if (elem.id === user.id) {
        const divElem = document.createElement('div');
        divElem.classList.add('individual-post');
        divElem.innerHTML = postTemplate(elem, user);
        postFunctions(divElem, elem);
        postLikes(divElem, elem, user);
        createPostComments(divElem);
        readComments(divElem, user);
        container.appendChild(divElem);
      }
    });
  });

  return divElementm;
};

export { viewProfile };
