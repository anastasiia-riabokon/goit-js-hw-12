import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/loader.css';

import './js/pixabay-api';
import './js/render-functions';

import iconError from './img/icon-error.svg';
import { searchPhoto } from './js/pixabay-api';
import { photosTemplate } from './js/render-functions';

const ref = {
  form: document.querySelector('.js-form'),
  containerImg: document.querySelector('.js-container-images'),
  body: document.body,
  cssLoader: document.querySelector('.js-loader'),
};

const lightbox = new SimpleLightbox('.js-container-images a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionClass: 'caption-text',
});

ref.form.addEventListener('submit', handleSubmitPhotoRequest);

function handleSubmitPhotoRequest(event) {
  event.preventDefault();
  ref.body.style.height = '100vh';
  ref.containerImg.innerHTML = '';

  let query = event.target.elements.query.value.trim();

  if (query === '') {
    message('Fill in the field!');

    return;
  }

  query = query.replaceAll(' ', '+');

  showLoader();

  searchPhoto(query)
    .then(data => {
      if (data.hits.length === 0) {
        message(
          'Sorry, there are no images matching your<br> search query. Please, try again!'
        );
      } else {
        const markup = photosTemplate(data.hits);
        ref.containerImg.innerHTML = markup;
        if (data.hits.length < 4) {
          ref.body.style.height = '100vh';
        } else ref.body.style.height = '100%';
        lightbox.refresh();
      }
    })
    .catch(error => {
      message('An error occurred. Please try again later.', error);
    })
    .finally(() => {
      hideLoader();
    });
  event.target.reset();
}

function showLoader() {
  ref.cssLoader.style.display = 'block';
}

function hideLoader() {
  ref.cssLoader.style.display = 'none';
}

function message(text, title = null) {
  const toastParams = {
    message: text,
    backgroundColor: '#EF4040',
    iconUrl: iconError,
    timeout: 5000,
    closeOnEscape: true,
    transitionIn: 'fadeInLeft',
    transitionOut: 'fadeOutUp',
    titleSize: '16',
    titleLineHeight: '24',
    messageSize: '16',
    messageLineHeight: '24',
    titleColor: '#FFF',
    messageColor: '#FFF',
    position: 'topRight',
  };
  if (title !== null) {
    toastParams.title = `${title}`;
  }

  iziToast.show(toastParams);
}
