'use strict';
Array.prototype.forEach.call(
  document.querySelectorAll('[data-sttm-id],[data-sttm-ang]'),
  function(node) {
    var attributes = node.dataset.sttmId
      ? 'id=' + node.dataset.sttmId
      : 'ang=' +
        node.dataset.sttmAng +
        '&source=' +
        (node.dataset.sttmSource || 'G');

    node.innerHTML =
      '<iframe src="https://sttm.co/embed?id=' +
      attributes +
      '"frameBorder="0" height="' +
      (node.dataset.sttmHeight || 500) +
      '"width="' +
      (node.dataset.sttmWidth || 500) +
      '"/>';
  }
);
