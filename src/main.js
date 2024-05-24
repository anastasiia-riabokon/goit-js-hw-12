import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/loader.css';

import './js/pixabay-api';
import './js/render-functions';

import iconError from './img/icon-error.svg';
import { searchParams, searchPhoto } from './js/pixabay-api';
import { renderMarkup, renderMarkupPagination } from './js/render-functions';

let { query, perPage, maxPage, currentPage } = searchParams;
let hits;

export const ref = {
  form: document.querySelector('.js-form'),
  containerImg: document.querySelector('.js-container-images'),
  body: document.body,
  cssLoader: document.querySelector('.js-loader'),
  btnLoadMore: document.querySelector('.js-btn-load-more'),
  pagination: document.querySelector('.js-pagination'),
};

const lightbox = new SimpleLightbox('.js-container-images a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionClass: 'caption-text',
});

ref.form.addEventListener('submit', handleSubmitPhotoRequest);
ref.btnLoadMore.addEventListener('click', handleClickPhotoReload);
ref.pagination.addEventListener('click', handlePaginationClick);

function handleSubmitPhotoRequest(event) {
  event.preventDefault();

  const elementOfForm = event.target;

  ref.body.style.height = '100vh';
  ref.containerImg.innerHTML = '';

  currentPage = 1;

  query = elementOfForm.elements.query.value.trim();

  if (query === '') {
    hideElement(ref.btnLoadMore);
    hideElement(ref.pagination);
    message({ text: 'Fill in the field!' });

    return;
  }

  query = query.replaceAll(' ', '+');

  uploadPhoto(query, currentPage);

  elementOfForm.reset();
}

async function uploadPhoto(query) {
  showElement(ref.cssLoader);
  hideElement(ref.btnLoadMore);
  hideElement(ref.pagination);

  try {
    const result = await searchPhoto(query, currentPage);

    if (!result.hits || result.hits.length === 0) {
      hideElement(ref.btnLoadMore);
      hideElement(ref.pagination);
      message({
        text: 'Sorry, there are no images matching your<br> search query. Please, try again!',
      });
    } else {
      maxPage = Math.ceil(result.totalHits / perPage);
      hits = result.hits;

      renderMarkup(ref.containerImg, result.hits);

      showElement(ref.pagination);
      showElement(ref.btnLoadMore);

      paginationPage(currentPage, maxPage);

      if (result.hits.length < 4) {
        ref.body.style.height = '100vh';
        hideElement(ref.btnLoadMore);
      } else ref.body.style.height = '100%';

      lightbox.refresh();
    }
  } catch (error) {
    message({
      text: 'An error occurred. Please try again later.',
      title: `Error ${error.status}:`,
    });
  } finally {
    hideElement(ref.cssLoader);
  }

  status();
}

async function handleClickPhotoReload() {
  hideElement(ref.btnLoadMore);
  showElement(ref.cssLoader);

  try {
    currentPage += 1;

    const result = await searchPhoto(query, currentPage);
    renderMarkup(ref.containerImg, result.hits);

    showElement(ref.btnLoadMore);

    scrollAutoAfterClickOnBtn();

    paginationPage(currentPage, maxPage);

    lightbox.refresh();
  } catch (error) {
    console.log(error);
  } finally {
    hideElement(ref.cssLoader);
  }
  status();
}

function handlePaginationClick(event) {
  const activeEl = ref.pagination.querySelector('.active');
  const currentEl = event.target;

  if (currentEl.dataset.type === 'page') {
    const pageNumber = parseInt(currentEl.dataset.page);

    if (pageNumber !== currentPage) {
      currentPage = pageNumber;
      ref.containerImg.innerHTML = '';
      ref.body.style.height = '100vh';
      uploadPhoto(query, currentPage);
    }
  }

  if (
    currentEl.dataset.type === 'prev' &&
    activeEl.previousElementSibling.dataset.type === 'page'
  ) {
    updateActivePage(currentEl, activeEl);
  }

  if (
    currentEl.dataset.type === 'next' &&
    activeEl.nextElementSibling.dataset.type === 'page'
  ) {
    updateActivePage(currentEl, activeEl);
  }
}

function updateActivePage(currentBtn, activeBtn) {
  activeBtn.classList.remove('active');

  if (currentBtn.dataset.type === 'page') {
    currentBtn.classList.add('active');
    return;
  }

  if (currentBtn.dataset.type === 'next') {
    activeBtn.nextElementSibling.classList.add('active');
    currentPage += 1;
  } else {
    activeBtn.previousElementSibling.classList.add('active');
    currentPage -= 1;
  }

  if (currentPage < 1 || currentPage > maxPage) return;

  ref.containerImg.innerHTML = '';
  ref.body.style.height = '100vh';
  uploadPhoto(query, currentPage);
}

function paginationPage(currentPage, maxPage) {
  ref.pagination.innerHTML = renderMarkupPagination(currentPage, maxPage);
}

function status() {
  if (currentPage >= maxPage) {
    hideElement(ref.btnLoadMore);
    if (hits.length < 4) return;
    message({
      text: "We're sorry, but you've reached the end of search results.",
      type: 'info',
    });
  }
}

function showElement(element) {
  element.classList.remove('visually-hidden');
}

function hideElement(element) {
  element.classList.add('visually-hidden');
}

function message({ text, title = null, type = 'error' }) {
  iziToast.settings({
    timeout: 5000,
    closeOnEscape: true,
    transitionIn: 'fadeInLeft',
    transitionOut: 'fadeOutUp',
    titleSize: '16',
    titleLineHeight: '24',
    messageSize: '16',
    messageLineHeight: '24',
    position: 'topRight',
  });
  switch (type) {
    case 'info':
      iziToast.info({
        message: text,
      });

      const close = document.querySelector('.iziToast-close');
      close.classList.add('custom-close');
      break;
    default:
      const toastParams = {
        message: text,
        backgroundColor: '#EF4040',
        iconUrl: iconError,
        titleColor: '#FFF',
        messageColor: '#FFF',
      };
      if (title !== null) {
        toastParams.title = `${title}`;
      }

      iziToast.show(toastParams);
  }
}

function scrollAutoAfterClickOnBtn() {
  const findHeightEl = document.querySelector('.gallery-item');
  const heightEl = findHeightEl.getBoundingClientRect().height;
  window.scrollBy({
    top: heightEl * 2,
    behavior: 'smooth',
  });
}
