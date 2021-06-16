import { viewHome } from './home.js';
import { viewLogIn } from './login.js';
import { viewRegister } from './register.js';
import { viewgeneral } from './general.js';
import { viewProfile } from './profile.js';
import { view404 } from './error.js';

export default {
  home: viewHome,
  login: viewLogIn,
  register: viewRegister,
  general: viewgeneral,
  profile: viewProfile,
  page404: view404,
};
