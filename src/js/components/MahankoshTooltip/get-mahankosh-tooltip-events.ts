/**
 * Autoscroll scrolls the page and moves the word out from under the cursor,
 * so those two must not close the tooltip while it runs. Escape, a click
 * outside and a click on the word always close it.
 */
export const getMahankoshTooltipEvents = (isAutoScrolling: boolean) => ({
  closeEvents: {
    mouseleave: !isAutoScrolling,
    click: true,
  },
  globalCloseEvents: {
    clickOutsideAnchor: true,
    escape: true,
    scroll: !isAutoScrolling,
  },
});
