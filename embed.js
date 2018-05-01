Array.prototype.forEach.call(
  document.querySelectorAll('[data-sttm-id]'),
  function(node) {
    node.innerHTML = `<iframe
        src="https://sttm.co/embed?id=${node.dataset.sttmId}"
        frameBorder="0"
        height="${node.dataset.sttmHeight || 500}"
        width="${node.dataset.sttmWidth || 500}"
    />`;
  }
);
