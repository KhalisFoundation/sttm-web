export const scrollToHash = (hash: string) => {
  let $item = null;
  if (hash.includes('#')) {
    $item = document.querySelector(`[id="${hash.replace('#', '')}"]`);
  } else {
    $item = document.querySelector(`[id="${hash}]`);
  }
  if ($item) {
    const offsetTop = $item.getBoundingClientRect().top;
    requestAnimationFrame(() => window.scrollTo(0, offsetTop));
  }
};