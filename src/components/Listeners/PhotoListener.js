export default class PhotoListener {
  listenPhoto() {
    const imgBox = document.querySelector('.img-choose');
    const mainPhoto = document.querySelector('.img-main');
    const imgList = document.querySelectorAll('.img-choose img');
    imgBox.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const currentSrc = e.target.src;
        mainPhoto.src = currentSrc;
        imgList.forEach((item) => item.classList.remove('active'));
        e.target.classList.add('active');
      }
    });
  }
}
