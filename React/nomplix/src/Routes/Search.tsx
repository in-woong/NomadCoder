import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  return <h1>{keyword}</h1>;
};

export default Search;
