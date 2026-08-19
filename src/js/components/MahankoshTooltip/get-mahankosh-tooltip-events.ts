export const getMahankoshTooltipEvents = (lockHoverClose: boolean) => ({
  closeEvents: {
    mouseleave: !lockHoverClose,
    click: true,
  },
  globalCloseEvents: {
    clickOutsideAnchor: true,
    escape: true,
    scroll: !lockHoverClose,
  },
});
