export const makeSelection = (selectedDiv: HTMLElement) => {
  window.getSelection().removeAllRanges();
  var range = document.createRange();
  range.selectNode(selectedDiv);
  window.getSelection().addRange(range);
};
