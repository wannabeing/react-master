export function makeBgImgPath(movieID: string, imgSize?: string) {
  return `https://image.tmdb.org/t/p/${
    imgSize ? imgSize : "original"
  }/${movieID}`;
}
