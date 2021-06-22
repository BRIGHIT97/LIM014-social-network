import MockFirebase from 'mock-cloud-firestore';

import {
  createNewPost, readAllPosts, deletePost,
  updatLike, createComments, readAllComments, deleteComments,
} from '../src/controller/firebase-store.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post01: {
          content: 'Proyecto',
          counterLikes: ['10'],
          date: '16 jun 2021 5:20 pm',
          userId: 'Pepito0123',
          name: 'Pepito',
          orderDate: '2021061615789',
          photo: '../img/perfil.png',
          postImgUrl: 'http://firebase.google.com/img/perfil.png',
        },

        post02: {
          content: 'abc',
          counterLikes: ['25'],
          date: '10 jun 2021 1:45 pm',
          userId: 'Maria0456',
          name: 'Maria',
          orderDate: '20210610236548',
          photo: '../img/perfil.png',
          postImgUrl: 'http://firebase.google.com/img/perfil.png',
        },
      },
    },
    comments01: {
      __doc__: {
        comment001: {
          comment: 'nueva foto',
          date: '15 may 2021 11:35 a. m',
          idCommentUser: '7eS6LFkca4eezNeaABkju4bggt4',
          idpost: 'XLEhVIvkLGnW9uVlax6i',
          nameComment: 'Lupita',
          orderDate: '20210415526894',
          photoComment: '../img/perfil.png',
        },
      },
    },
  },
};
global.firebase = new MockFirebase(fixtureData);

describe('NewPost', () => {
  it('Deberia crear una nueva publicación', (done) => createNewPost('../img/perfil.png', 'Pepito', 'Pepito0123', 'proyecto', [], '')
    .then(() => readAllPosts(
      (data) => {
        const result = data.find((post) => post.content === 'proyecto');
        expect(result.content).toBe('proyecto');
        done();
      },
    )));
});

describe('deletePost', () => {
  it('Deberia eliminar publicaciones', (done) => deletePost('post01')
    .then(() => readAllPosts(
      (data) => {
        const result = data.find((post) => post.content === 'post01');
        expect(result).toBe(undefined);
        done();
      },
    )));
});

describe('updateLike', () => {
  it('It should update likes', (done) => updatLike('post02', '25')
    .then(() => readAllPosts(
      (data) => {
        const result = data.find((post) => post.counterLikes === '25');
        expect(result.counterLikes).toBe('25');
        done();
      },
    )));
});

describe('createComment', () => {
  it('Deberia crear un comentario de las publicaciones', (done) => createComments('post002', '../img/icon.jpg', 'Thais', '002', 'fearless')
    .then(() => readAllComments(
      (data) => {
        const result = data.find((element) => element.comment === 'fearless');
        expect(result.comment).toBe('fearless');
        done();
      },
    )));
});
describe('deleteComment', () => {
  it('Deberia poder elimintar comentarios creados', (done) => deleteComments('comment01')
    .then(() => readAllComments(
      (data) => {
        const result = data.find((element) => element === 'comment01');
        expect(result).toBe(undefined);
        done();
      },
    )));
});
