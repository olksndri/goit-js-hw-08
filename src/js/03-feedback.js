import { save, load } from './save-load';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input[name="email"]');
const textarea = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

let inpObj = { email: '', message: '' };

form.addEventListener('submit', event => {
  if (input.value.trim() === '') {
    event.preventDefault();
    alert('Please write your Email');
  } else if (textarea.value.trim() === '') {
    event.preventDefault();
    alert('Please write your message');
  } else {
    removeStorage(event);
  }
});
form.addEventListener(
  'input',
  throttle(function () {
    inpObj.email = input.value.trim();
    inpObj.message = textarea.value.trim();
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

function removeStorage(event) {
  event.preventDefault();
  console.log(load(LOCALSTORAGE_KEY));
  inpObj = { email: '', message: '' };
  save(LOCALSTORAGE_KEY, inpObj);
  input.value = '';
  textarea.value = '';
}

checkingStorage();
