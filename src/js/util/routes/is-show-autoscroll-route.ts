export const isShowAutoscrollRoute = (pathname: string) => {
  return (pathname.includes('shabad')
    || pathname.includes('hukamnama')
    || pathname.includes('ang'))
    || pathname.includes('amrit-keertan')
}