'use strict';
Array.prototype.forEach.call(
  document.querySelectorAll('[data-sttm-id],[data-sttm-ang]'),
  function(node) {
    var attributes = node.dataset.sttmId
      ? 'shabad?id=' + node.dataset.sttmId
      : 'ang?ang=' +
        node.dataset.sttmAng +
        '&source=' +
        (node.dataset.sttmSource || 'G');

    node.innerHTML =
      '<iframe src="https://sttm.co/' +
      attributes +
      '"frameBorder="0" height="' +
      (node.dataset.sttmHeight || 500) +
      '"width="' +
      (node.dataset.sttmWidth || 500) +
      '"/>';
  }
);
