export const fetchPhotos = () => {
  return fetch('/api/v1/photos')
    .then(response => response.json())
    .catch(error => {
      throw new Error(error.message)
    });
}

export const postPhoto = photo => {
  return fetch('/api/v1/photos', {
    method: "POST",
    body: JSON.stringify(photo),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(error.message)
    });
}

export const deletePhoto = async photoId => {
  return fetch(`/api/v1/photos/${photoId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(error.message)
    });
}
