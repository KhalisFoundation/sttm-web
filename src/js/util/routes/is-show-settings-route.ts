export const isShowSettingsRoute = (pathname: string) => {
  return /shabad/.test(pathname)
    || /hukamnama/.test(pathname)
    || /ang/.test(pathname)
    || /sundar-gutka\/(.*)/.test(pathname)
}