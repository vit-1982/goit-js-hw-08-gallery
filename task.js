import galleryList from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  largeImg: document.querySelector('.lightbox__image'),
  modal: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

function makeItemMarkup(item) {
  const itemRef = document.createElement('li');
  itemRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.href = item.original;

  const imgRef = document.createElement('img');
  imgRef.classList.add('gallery__image');
  imgRef.src = item.preview;
  imgRef.dataset.source = item.original;
  imgRef.alt = item.description;

  linkRef.appendChild(imgRef);
  itemRef.appendChild(linkRef);

  return itemRef;
}

const imgCards = galleryList.map(galleryItem => makeItemMarkup(galleryItem));

refs.gallery.append(...imgCards);
refs.gallery.addEventListener('click', onGalleryClick);
refs.closeBtn.addEventListener('click', onCloceBtn);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imageRef = event.target;
  const largeImgURL = imageRef.dataset.source;
  console.log(largeImgURL);

  setLargeImgSrc(largeImgURL);
  onClickOpenModal();
}

function setLargeImgSrc(url) {
  refs.largeImg.src = url;
}

function onClickOpenModal() {
  refs.modal.classList.add('is-open');
}

function onCloceBtn() {
  refs.largeImg.src = '#';
  refs.modal.classList.remove('is-open');
}
