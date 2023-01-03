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
        if (copyBtn.parentNode && tempInput.parentNode) {
          copyBtn.parentNode.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          tempInput.parentNode.removeChild(tempInput);
        }
      });
    }
  }
}
