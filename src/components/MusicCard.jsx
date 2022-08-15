import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = { loading: false, checked: false, favoriteSongs: [] };
  }

  componentDidMount() {
    this.pegaDoLocalStorarage();
  }

  pegaDoLocalStorarage = async () => {
    const { trackId } = this.props;
    const response = await getFavoriteSongs();
    const returnResponse = response.some((music) => music.trackId === trackId);
    this.setState({ checked: returnResponse });
  }

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ checked: value }, () => {
      this.fechFavoritesSongs();
    });
  }

  fechFavoritesSongs = () => {
    const { music } = this.props;
    console.log(music);
    this.setState({ loading: true }, async () => {
      await addSong(music);
      const response = await getFavoriteSongs();
      this.setState({ loading: false, favoriteSongs: response });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked, favoriteSongs } = this.state;
    return (
      <div>
        { loading ? <Loading /> : (
          <div>
            <h4>{trackName}</h4>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              { `O seu navegador não suporta o elemento ${trackName}` }

              <code>audio</code>

            </audio>

            <label htmlFor={ trackId }>
              <input
                id={ trackId }
                type="checkbox"
                name="checkbox"
                checked={ checked }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
              />
              {' '}
              Favorita
            </label>

          </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // music: PropTypes.object.isRequired
};

export default MusicCard;
