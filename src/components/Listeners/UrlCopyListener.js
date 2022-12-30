export default class UrlCopyListener {
  listen() {
    const copyBtn = document.querySelector('.copy');
    copyBtn.addEventListener('click', () => {
      let tempInput = document.createElement('input');
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy link';
      }, 600);
      tempInput.value = window.location.href;
      copyBtn.parentNode.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      tempInput.parentNode.removeChild(tempInput);
    });
  }
}
