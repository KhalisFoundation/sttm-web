export const shouldIgnoreMahankoshHover = ({
  isAutoScrolling,
  isMahankoshTooltipActive,
}: {
  isAutoScrolling: boolean;
  isMahankoshTooltipActive: boolean;
}) => isAutoScrolling || isMahankoshTooltipActive;
