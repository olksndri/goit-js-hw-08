import { save, load } from './save-load';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input[name="email"]');
const textarea = document.querySelector('textarea[name="message"]');
const btn = document.querySelector('button[type="submit"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

let inpObj = { email: '', message: '' };

// save(LOCALSTORAGE_KEY, '');
// console.log(load(LOCALSTORAGE_KEY));

btn.addEventListener('click', removeStorage);
form.addEventListener(
  'input',
  throttle(function () {
    inpObj.email = input.value;
    inpObj.message = textarea.value;
    save(LOCALSTORAGE_KEY, inpObj);
  }, 500)
);

function checkingStorage() {
  if (load(LOCALSTORAGE_KEY).email === '') {
    input.value = '';
  } else {
    input.value = load(LOCALSTORAGE_KEY).email;
    inpObj.email = load(LOCALSTORAGE_KEY).email;
  }
  if (load(LOCALSTORAGE_KEY).message === '') {
    textarea.value = '';
  } else {
    textarea.value = load(LOCALSTORAGE_KEY).message;
    inpObj.message = load(LOCALSTORAGE_KEY).message;
  }
}

function removeStorage() {
  inpObj = { email: '', message: '' };
  save(LOCALSTORAGE_KEY, inpObj);
  input.value = '';
  textarea.value = '';
}

checkingStorage();
console.log('Received from storage: ', load(LOCALSTORAGE_KEY));
