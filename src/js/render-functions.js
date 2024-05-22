export function photoTemplate(obj) {
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

export function photosTemplate(arr) {
  return arr.map(photoTemplate).join('');
}
