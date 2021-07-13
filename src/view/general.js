import {
  userData,
  signOutAuth,
} from '../controller/auth.js';
import {
  createNewPost,
  readAllPosts,
  updatePost,
  deletePost,
  updatLike,
  uploadImage,
  createComments,
  readAllComments,
  deleteComments,
} from '../controller/firebase-store.js';

const createPost = (elem) => {
  const post = elem.querySelector('#btn-post');
  const postForm = elem.querySelector('#form-createpost');
  const user = userData();
  post.addEventListener('click', (e) => {
    e.preventDefault();
    const postContent = elem.querySelector('#description').value;
    const elemDiv = elem.querySelector('.error');
    if (postContent.charAt(0) === ' ' || postContent === '') {
      elemDiv.textContent = '❓Share something before publishing.';
    } else {
      const uploadInput = elem.querySelector('#uploadInput');
      const imageFile = uploadInput.files[0];
      if (imageFile) {
        const uploadTask = uploadImage(imageFile, 'photos');
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // eslint-disable-next-line no-console
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((postImgUrl) => {
              createNewPost(user.photo, user.name, user.id, postContent, [], postImgUrl)
                .then(() => {
                  elemDiv.classList.add('hide');
                  postForm.reset();
                })
                // eslint-disable-next-line no-console
                .catch((err) => console.log(err));
            });
          },
        );
      } else {
        createNewPost(user.photo, user.name, user.id, postContent, [], '')
          .then(() => {
            elemDiv.classList.add('hide');
            postForm.reset();
          })
          // eslint-disable-next-line no-console
          .catch((err) => console.log(err));
      }
    }
  });
};

const navSlide = (elem) => {
  const burger = elem.querySelector('.btnMenu');
  const navElem = elem.querySelector('.viewNav');
  const links = elem.querySelectorAll('.links');

  const toggleFn = () => navElem.classList.toggle('nav-active');
  burger.addEventListener('click', toggleFn);
  links.forEach((link) => link.addEventListener('click', toggleFn));
};

const logOut = (elem) => {
  const goLogOut = elem.querySelector('#logOut');
  goLogOut.addEventListener('click', signOutAuth);
};
const postFunctions = (divElem, elem) => {
  const menuPost = divElem.querySelector('.show');
  const containerList = divElem.querySelector('.userSelect');
  const container2 = document.createElement('div');
  container2.classList.add('hide');
  menuPost.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = `<ul class="modal-menu">
          <li idpost="${elem.idPost}" class="edit-post">Edit</li>
          <li class="delete-post" >Delete</li>
          </ul>`;
    container2.innerHTML = modal;
    containerList.appendChild(container2);
    container2.classList.toggle('hide');

    const deleteBtn = divElem.querySelector('.delete-post');
    deleteBtn.addEventListener('click', () => {
      const modalMenu = divElem.querySelector('.modal-menu');
      modalMenu.classList.add('hide');
      const newModal = `
            <ul class="delete-menu">
            <p>Do you want to delete this post?</p>
            <div>
              <li id="yes">Yes</li>
              <li id="no">No</li>
            </div>`;
      container2.innerHTML = '';
      container2.innerHTML = newModal;
      const yesBtn = divElem.querySelector('#yes');
      const noBtn = divElem.querySelector('#no');
      yesBtn.addEventListener('click', () => deletePost(elem.idPost)
        .then((res) => res)
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err)));
      noBtn.addEventListener('click', () => container2.classList.add('hide'));
    });

    const editPostButton = divElem.querySelector('.edit-post');
    const saveEditPostIcon = divElem.querySelector('.saveIcon');
    editPostButton.addEventListener('click', () => {
      const publishedText = divElem.querySelector('.publishedText');
      publishedText.contentEditable = 'true';
      publishedText.focus();
      saveEditPostIcon.classList.remove('hide');
    });
    saveEditPostIcon.addEventListener('click', () => {
      const publishedText = divElem.querySelector('.publishedText');
      const idPosts = editPostButton.getAttribute('idpost');
      const textPostEdited = publishedText.innerText.trim();
      if (textPostEdited !== '') {
        publishedText.contentEditable = 'false';
        saveEditPostIcon.classList.add('hide');
        container2.classList.toggle('hide');
        updatePost(idPosts, textPostEdited);
      }
    });
  });
};
// user = current user; elem = info del post
const postLikes = (divElem, elem, user) => {
  const likeHand = divElem.querySelector('.fa-thumbs-up');
  likeHand.addEventListener('click', () => {
    let counter = elem.counterLikes;
    if (!counter.includes(user.id)) {
      likeHand.classList.replace('far', 'fas');
      counter.push(user.id);
      updatLike(elem.idPost, counter);
    } else if (counter.includes(user.id)) {
      likeHand.classList.replace('fas', 'far');
      counter = counter.filter((i) => i !== user.id);
      updatLike(elem.idPost, counter);
    }
  });
};

const createPostComments = (divElem) => {
  const commentIcon = divElem.querySelector('.commentIcon');
  const createComment = divElem.querySelector('.create-comment');
  const commentsContainer = divElem.querySelector('.comments-container');
  const errorComment = divElem.querySelector('.errorComment');
  commentIcon.addEventListener('click', () => {
    createComment.classList.toggle('show');
    commentsContainer.classList.toggle('show');
    errorComment.classList.add('hide');
    createComment.focus();
  });
  const sendCommentForm = divElem.querySelector('.sendCommentForm');
  const idCommentPost = sendCommentForm.getAttribute('idCommentPost');
  const imageCircle = divElem.querySelector('.image-circleComment');
  const photoCommentUser = imageCircle.getAttribute('src');
  const userNameFB = createComment.getAttribute('userName');
  const userIdFB = createComment.getAttribute('userId');
  sendCommentForm.addEventListener('click', (e) => {
    e.preventDefault();
    const descriptionComment = divElem.querySelector('#descriptionComment').value;
    if (descriptionComment.charAt(0) === ' ' || descriptionComment === '') {
      errorComment.textContent = '❓ Write the comment';
    } else {
      createComments(idCommentPost, photoCommentUser, userNameFB, userIdFB, descriptionComment);
      createComment.reset();
    }
  });
};

const readComments = (divElem, user) => {
  readAllComments((comments) => {
    const commentsContainer = divElem.querySelector('.comments-container');
    const errorComment = divElem.querySelector('.errorComment');
    commentsContainer.innerHTML = '';
    comments.forEach((element) => {
      const divElemComment = document.createElement('div');
      const sendCommentForm = divElem.querySelector('.sendCommentForm');
      const idCommentPost = sendCommentForm.getAttribute('idCommentPost');
      if (element.idpost === idCommentPost) {
        divElemComment.classList.add('commentsContainer');
        divElemComment.innerHTML = `
          <div class="read-comment">
            <div class="read-comment">
              <img class="image-circle" alt="userimage" src="${element.photoComment}">
              <section>
                <h2 class="user-name">${element.nameComment}</h2>
                <span>${element.date}</span>
                <p class="read-commentp">${element.comment}</p>
              </section>
            </div>
            <div class="userSelectComment">
              <button id="buttonMenuComment" class="buttonMenu ${element.idCommentUser === user.id ? 'show' : 'hide'}">
                <i class="fas fa-ellipsis-h"></i>
                <span class="deleteComment hide">Delete</span>
              </button>
            </div>
          </div> `;
        const buttonMenuComment = divElemComment.querySelector('#buttonMenuComment');
        const deleteComment = divElemComment.querySelector('.deleteComment');
        buttonMenuComment.addEventListener('click', () => {
          deleteComment.classList.toggle('show');
          deleteComment.addEventListener('click', () => {
            deleteComments(element.idComment);
          });
          errorComment.classList.add('hide');
        });
      }
      commentsContainer.appendChild(divElemComment);
    });
  });
};

const postTemplate = (elem, user) => {
  const view = `
  <section class="userHead">
    <div class="userInfo">
      <img class="image-circle" src=${elem.photo} alt="userimage">
      <div>
        <h2 class="user-name">${elem.name}</h2>
        <p>${elem.date}</p>
      </div>
    </div>
    <div class="userSelect" >
        <button class="buttonMenu ${elem.id === user.id ? 'show' : 'hide'}">
          <i class="fas fa-ellipsis-h"></i>
        </button>
    </div>
  </section>
  <section class="post-info-container">
    <div class="post-info">
      <section>
        <p id="${elem.idPost}" class="publishedText">${elem.content}</p>
        <span idSaveIcon="${elem.idPost}" class="saveIcon hide"><i class="fas fa-check"></i></span>
      </section>
      ${elem.postImgUrl ? `<img  class="postImg" src=${elem.postImgUrl} alt="post-img">` : ''}
    </div>
    <div class="container-submit">
      <section>
        <i class="${elem.counterLikes.includes(user.id) ? 'fas' : 'far'} fa-thumbs-up"></i>
        <p>${elem.counterLikes.length ? elem.counterLikes.length : ''} </p>
      </section>
      <section>
        <i class="commentIcon far fa-comments"></i>
        <p></p>
      </section>
    </div>
    <form class="create-comment hide" id="form-createComment" idCommentPost1="${elem.idPost}" userId="${user.id}" userName="${user.name}" >
      <img class="image-circle image-circleComment" alt="userimage1" src="${user.photo}">
      <textarea id="descriptionComment" class="input-comment" placeholder="Leave a comment..."></textarea>
      <i idCommentPost="${elem.idPost}" class="sendCommentForm far fa-paper-plane"></i>
    </form>
    <div class="errorComment error"></div>
    <div class="comments-container hide "></div>
  </section>
      `;
  return view;
};

const viewGeneral = (user) => {
  const view = `
  <div class="container-header">
    <h1 class="h1"><img src="img/logoMarca.png" alt="" height="25px" width="25px">Do-Re-Mi</h1>
    <i class="btnMenu"></i>
    <div class="viewNav">
    <nav>
      <ul>
        <li><a class="links" href="#/general"><i class="fa fa-home" aria-hidden="true"></i>Home</a></"li>
        <li><a class="links" href="#/profile"><i class="fa fa-user" aria-hidden="true"></i>Profile</a></li>
        <li id="logOut"><a class="links" href="#/"><i class="fa fa-sign-out" aria-hidden="true"></i>Log out</a></li>
      </ul>
      </nav>
      </div>
  </div>
  <section class="container-general">
    <div class="user-info">
      <img class="image-circle" alt="userimage" src="${user.photo}">
      <h2 class="h2-name user-name">${user.name}</h2>
    </div>
    <div>
      <form id="form-createpost" class="create-post">
        <textarea id="description" class="input-post" cols="30" rows="10" placeholder="What are you thinking about?"></textarea>
        <div class="error"></div>
        <div class="container-submit">
            <input type="file" id="uploadInput" accept="image/png, image/jpeg, image/jpg">
            <button id="btn-post" class="button-small">Post</button>
        </div>
      </form>
      <div class="general-posts"></div>
    </div>
  </section>
  `;
  const divElem = document.createElement('div');
  divElem.innerHTML = '';
  divElem.innerHTML = view;
  navSlide(divElem);
  createPost(divElem);

  logOut(divElem);

  readAllPosts((post) => {
    const container = divElem.querySelector('.general-posts');
    container.innerHTML = '';
    post.forEach((elem) => {
      const divElemt = document.createElement('div');
      divElemt.classList.add('individual-post');
      divElemt.innerHTML = postTemplate(elem, user);

      if (elem.id === user.id) {
        postFunctions(divElemt, elem);
      }
      postLikes(divElemt, elem, user);
      createPostComments(divElemt);
      readComments(divElemt, user);
      container.appendChild(divElemt);
    });
  });

  return divElem;
};

export {
  createPost,
  navSlide,
  logOut,
  postTemplate,
  postFunctions,
  postLikes,
  viewGeneral,
  createPostComments,
  readComments,
};
