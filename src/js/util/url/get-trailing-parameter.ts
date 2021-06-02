export const getTrailingParameter = (url: string = window.location.pathname) => {
  return url.substring(url.lastIndexOf('/')+1)
}