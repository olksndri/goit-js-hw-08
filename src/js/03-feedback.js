import { save, load } from './save-load';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input[name="email"]');
const textarea = document.querySelector('textarea[name="message"]');
const btn = document.querySelector('button[type="submit"]');

const STORAGE_KEY = 'feedback-form-state';
let inpObj = { email: '', message: '' };

form.addEventListener(
  'input',
  throttle(function () {
    inpObj.email = input.value;
    inpObj.message = textarea.value;
    save(STORAGE_KEY, inpObj);
    console.log('input and storage changed, ', load(STORAGE_KEY));
  }, 500)
);

function checkingStorage() {
  if ((load(STORAGE_KEY).email = '')) {
    input.value = '';
  } else {
    input.value = load(STORAGE_KEY).email;
    inpObj.email = load(STORAGE_KEY).email;
  }
  if ((load(STORAGE_KEY).message = '')) {
    textarea.value = '';
  } else {
    textarea.value = load(STORAGE_KEY).message;
    inpObj.message = load(STORAGE_KEY).message;
  }
}

checkingStorage();
btn.addEventListener('click', removeStorage);

function removeStorage() {
  inpObj = { email: '', message: '' };
  save(STORAGE_KEY, inpObj);
  input.value = '';
  textarea.value = '';
}
console.log('Received from storage: ', load(STORAGE_KEY));
