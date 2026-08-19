import { getMahankoshTooltipEvents } from '../get-mahankosh-tooltip-events';

describe('getMahankoshTooltipEvents()', () => {
  it('closes on scroll and mouseleave when autoscroll is off', () => {
    expect(getMahankoshTooltipEvents(false)).toEqual({
      closeEvents: {
        mouseleave: true,
        click: true,
      },
      globalCloseEvents: {
        clickOutsideAnchor: true,
        escape: true,
        scroll: true,
      },
    });
  });

  it('keeps the tooltip open through autoscroll movement', () => {
    expect(getMahankoshTooltipEvents(true)).toEqual({
      closeEvents: {
        mouseleave: false,
        click: true,
      },
      globalCloseEvents: {
        clickOutsideAnchor: true,
        escape: true,
        scroll: false,
      },
    });
  });
});
