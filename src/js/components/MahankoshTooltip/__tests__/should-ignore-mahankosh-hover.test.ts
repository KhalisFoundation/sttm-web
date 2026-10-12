import { shouldIgnoreMahankoshHover } from '../should-ignore-mahankosh-hover';

describe('shouldIgnoreMahankoshHover()', () => {
  it('lets hover update the tooltip when it is not pinned and not autoscrolling', () => {
    expect(
      shouldIgnoreMahankoshHover({
        isAutoScrolling: false,
        isMahankoshTooltipActive: false,
      })
    ).toBe(false);
  });

  it('ignores hover while autoscroll is moving words under the cursor', () => {
    expect(
      shouldIgnoreMahankoshHover({
        isAutoScrolling: true,
        isMahankoshTooltipActive: false,
      })
    ).toBe(true);
  });

  it('ignores hover after the tooltip has been pinned by a click', () => {
    expect(
      shouldIgnoreMahankoshHover({
        isAutoScrolling: false,
        isMahankoshTooltipActive: true,
      })
    ).toBe(true);
  });
});
