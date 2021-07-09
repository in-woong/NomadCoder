import React from 'react';
import SearchPresenter from './SearchPresenter';

class Search extends React.Componenet {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: '',
    loading: false,
    error: null,
  };

  render() {
    const {movieResults, tvResults, searchTerm, loading, error} = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
      />
    );
  }
}

export default Search;
