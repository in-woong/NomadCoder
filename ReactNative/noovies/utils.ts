export const makeImagePath = (img: string, width: string = 'w500') =>
  `http://image.tmdb.org/t/p/${width}/${img}`;
