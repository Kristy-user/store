export default class UrlCopyListener {
  listen() {
    const copyBtn: HTMLButtonElement | null = document.querySelector('.copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        let tempInput: HTMLInputElement = document.createElement('input');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy link';
        }, 600);
        tempInput.value = window.location.href;
        if (copyBtn.parentNode) {
          copyBtn.parentNode.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          if (tempInput.parentNode) {
            tempInput.parentNode.removeChild(tempInput);
          }
        }
      });
    }
  }
}
