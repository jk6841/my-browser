export const getFinalUrl = (url: string) => {
  let finalUrl = url.trim();
  if (!finalUrl.match(/^https?:\/\//i)) {
    finalUrl = `https://${finalUrl}`;
  }
  return finalUrl;
};
