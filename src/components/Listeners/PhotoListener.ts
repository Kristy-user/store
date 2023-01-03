export default class PhotoListener {
  listenPhoto() {
    const imgBox: HTMLElement | null = document.querySelector('.img-choose');
    const mainPhoto: HTMLImageElement | null =
      document.querySelector('.img-main');
    const imgList: NodeListOf<Element> =
      document.querySelectorAll('.img-choose img');
    if (imgBox) {
      imgBox.addEventListener('click', (e: Event) => {
        if (
          e.target instanceof HTMLImageElement &&
          e.target.tagName === 'IMG' &&
          mainPhoto
        ) {
          const currentSrc = e.target.src;
          mainPhoto.src = currentSrc;
          imgList.forEach((item) => item.classList.remove('active'));
          e.target.classList.add('active');
        }
      });
    }
  }
}
