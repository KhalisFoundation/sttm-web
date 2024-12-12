export const isShowSearchBarRoute = (pathname: string) => {
    return pathname.includes('shabad')
        || pathname.includes('hukamnama')
        || pathname.includes('ang')
        || pathname.includes('sundar-gutka')
        || pathname.includes('sync')
        || pathname.includes('index')
}