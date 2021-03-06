import * as api from './apiCalls.js';

const $photosContainer = $('#photos-container');
const $titleInput = $('#title-input');
const $urlInput = $('#url-input');
const $submitPhotoBtn = $('#submit-photo-btn');
const $formMessage = $('#form-message');

const initApp = () => {
  api.fetchPhotos()
    .then(mapPhotosToHTML)
    .catch(error => {
      $photosContainer.html(`
        <p>An error occured, please try again. ${error}</p>
      `)
    })
}

const mapPhotosToHTML = photos => {
  const photoDivs = photos.reduce((html, photo) => {
    return html + `
          <div id="${photo.id}" class='photo'>
            <p>${photo.title}</p>
            <img src="${photo.url}" alt="${photo.title}"/>
            <button class="delete-photo-btn">Delete</button>
          </div>
        `
  }, '')
  $photosContainer.html(photoDivs);
}

const validateInput = () => {
  if ($titleInput.val() && $urlInput.val()) {
    $submitPhotoBtn.prop('disabled', false);
  } else {
    $submitPhotoBtn.prop('disabled', true);
  }
  $formMessage.text('');
}

const submitPhoto = event => {
  event.preventDefault();
  const photo = {
    title: $titleInput.val(),
    url: $urlInput.val()
  }
  api.postPhoto(photo)
    .then(message => {
      $formMessage.text(`New photo Added!`);
      $titleInput.val('')
      $urlInput.val('')
      initApp();
    })
    .catch(error => {
      $formMessage.text('An error occured, please try again.');
    });
}

const deletePhoto = event => {
  const id = parseInt($(event.target).parent().attr('id'));
  api.deletePhoto(id)
    .then(() => {
      $(event.target).parent().remove();
    })
    .catch($formMessage.text);
}

$(document).ready(initApp);
$titleInput.on('keyup', validateInput);
$urlInput.on('keyup', validateInput);
$submitPhotoBtn.on('click', submitPhoto);
$photosContainer.on('click', '.delete-photo-btn', deletePhoto);