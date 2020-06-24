export const isShowFullscreenRoute = (pathname: string) => {
  return (pathname.includes('shabad')
    || pathname.includes('hukamnama')
    || pathname.includes('ang'));
}