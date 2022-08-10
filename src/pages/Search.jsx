import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      enableButton: true,
      loading: false,
      songs: [],
      artist: '',
    };
  }

  componentDidMount() {
    this.fetchAlbums();
  }

  handleTextInputChange = ({ target }) => {
    const artist = target.value;
    const minCharactersInputName = 2;
    this.setState({ inputSearch: artist });
    if (artist.length >= minCharactersInputName) {
      this.setState({ enableButton: false });
    }
  };

  fetchAlbums = () => {
    const { inputSearch } = this.state;
    this.setState({ loading: true, inputSearch: '' }, async () => {
      const albums = await searchAlbumsAPI(inputSearch);
      this.setState({ loading: false, songs: albums, artist: inputSearch });
    });
  };

  render() {
    const { inputSearch, enableButton, loading, songs, artist } = this.state;
    return (
      <div>
        <div data-testid="page-search">
          <Header />
          {loading ? (
            <Loading />
          ) : (
            <div>
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
                onClick={ this.fetchAlbums }
              >
                Pesquisar
              </button>
            </div>
          )}
          <div>
            <p>
              {`Resultado de álbuns de: ${artist}`}
            </p>

            {songs.length === 0 && <p>Nenhum álbum foi encontrado</p>}

            {songs.map((song) => (
              <Link
                key={ `${song.collectionId}` }
                to={ `/album/${song.collectionId}` }
                data-testid={ `link-to-album-${song.collectionId}` }
              >
                <p>{song.artistName}</p>
                <p>{song.collectionName}</p>
                <p>{song.collectionPrice}</p>
                <img src={ song.artworkUrl100 } alt={ song.artistName } />
                <p>{song.trackCount}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
