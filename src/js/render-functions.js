function photoTemplate(obj) {
  return `<div class="gallery-item">
  <a href="${obj.largeImageURL}">
    <img src="${obj.webformatURL}" alt="${obj.tags}" loading="lazy"/>
  </a>
  <ul class="block-info">
    <li>
      <p style="font-weight: 600">Likes</p>
      <p>${obj.likes}</p>
    </li>

    <li>
      <p style="font-weight: 600">Views</p>
      <p>${obj.views}</p>
    </li>

    <li>
      <p style="font-weight: 600">Comments</p>
      <p>${obj.comments}</p>
    </li>

    <li>
      <p style="font-weight: 600">Downloads</p>
      <p>${obj.downloads}</p>
    </li>
  </ul>
</div>`;
}

function photosTemplate(arr) {
  return arr.map(photoTemplate).join('');
}

export function renderMarkup(element, arr) {
  const markup = photosTemplate(arr);
  element.insertAdjacentHTML('beforeend', markup);
}

export function renderMarkupPagination(currentPage, totalPage) {
  let paginationMarkup =
    '<li data-type="prev" class="pagination-item btn">&laquo;</li>';

  let startPage = 1;
  let endPage = totalPage;

  if (totalPage > 7) {
    if (currentPage > 4) {
      paginationMarkup += '<li class="dots">&nbsp;. . .&nbsp;</li>';
      startPage = currentPage - 2;
    }

    if (currentPage < totalPage - 3) {
      endPage = currentPage + 2;
    }
  }

  for (let i = startPage; i <= endPage; i += 1) {
    paginationMarkup += `<li data-type="page" data-page="${i}" class="pagination-item btn ${
      currentPage === i ? 'active' : ''
    }">${i}</li>`;
  }

  if (endPage < totalPage) {
    paginationMarkup += '<li class="dots">&nbsp;. . .&nbsp;</li>';
  }

  paginationMarkup +=
    '<li data-type="next" class="pagination-item btn">&raquo;</li>';

  return paginationMarkup;
}
