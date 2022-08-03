import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      enableButton: true,
    };
  }

  handleTextInputChange = ({ target }) => {
    const inputArtist = target.value;
    const minCharactersInputName = 2;
    this.setState({ inputSearch: inputArtist });
    if (inputArtist.length >= minCharactersInputName) {
      this.setState({ enableButton: false });
    }
  }

  render() {
    const { inputSearch, enableButton } = this.state;
    return (
      <div data-testid="page-search">
        <label htmlFor="search">
          <input
            id="search"
            data-testid="search-artist-input"
            onChange={ this.handleTextInputChange }
            value={ inputSearch }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ enableButton }
        >
          Pesquisar

        </button>
        <Header />
      </div>
    );
  }
}

export default Search;
