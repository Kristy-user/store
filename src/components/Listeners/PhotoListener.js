export default class PhotoListener {
  listenPhoto() {
    const imgBox = document.querySelector('.img-choose');
    const mainPhoto = document.querySelector('.img-main');
    imgBox.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const currentSrc = e.target.src;
        mainPhoto.src = currentSrc;
      }
    });
  }
}
