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
