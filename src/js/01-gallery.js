import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const gallery = document.querySelector('ul.gallery');

const galleryItem = galleryItems.reduce((prevVal, elem) => {
  prevVal += `<li class="gallery__item">
   <a class="gallery__link" href="${elem.original}">
      <img class="gallery__image" src="${elem.preview}" alt="${elem.description}" title="${elem.description}" />
   </a></li>`;
  return prevVal;
}, '');

gallery.innerHTML = galleryItem;
const options = {
  captionSelector: 'img',
  captionType: 'title',
  captionPosition: 'bottom',
  captionDelay: 250,
};

let lightbox = new SimpleLightbox('.gallery a', options);
