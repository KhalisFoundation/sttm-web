export const updateSmartAppBannerMetaTags = ({
  appIdApple,
  appIdGoogle,
  appIconPath
}: {
  appIdApple: string,
  appIdGoogle: string,
  appIconPath: string
}) => {
  const appleItunesApp = document.querySelector('meta[name="apple-itunes-app"]');
  const googlePlaystoreApp = document.querySelector('meta[name="google-play-app"]');
  const appleItunesAppIcon = document.querySelector('link[rel="android-touch-icon"]');
  const googlePlaystoreAppIcon = document.querySelector('link[rel="apple-touch-icon"]');

  // Build was failing without conditional
  appleItunesApp ? appleItunesApp.content = `app-id=${appIdApple}` : null;
  googlePlaystoreApp ? googlePlaystoreApp.content = `app-id=${appIdGoogle}` : null;
  appleItunesAppIcon ? appleItunesApp.href = appIconPath : null;
  googlePlaystoreAppIcon ? googlePlaystoreAppIcon.href = appIconPath : null;
}
