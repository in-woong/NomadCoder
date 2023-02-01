const BASE_URL = 'http://api.coinpaprika.com/v1';
const COINS_URL = `${BASE_URL}/coins`;
const now = new Date();
const yesterday = new Date(now.setDate(now.getDate() - 1));
const YOHB = new Date(yesterday.setHours(yesterday.getHours() + 1));

export const coins = () => fetch(COINS_URL).then((res) => res.json());

export const info = ({ queryKey }) =>
  fetch(`${COINS_URL}/${queryKey[1]}`).then((res) => res.json());
export const history = ({ queryKey }) =>
  fetch(
    `${BASE_URL}/tickers/${
      queryKey[1]
    }/historical?start=${YOHB.toISOString()}&interval=1h`
  ).then((res) => res.json());
