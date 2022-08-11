import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = { loading: false, checked: false };
  }

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ checked: value });
  }

  // fechFavoritesSongs = async () => {
  //   const { musicList } = this.props;
  //   this.setState({ loading: true });
  //   const favoritesSongs = await addSong(musicList);
  //   this.setState({ loading: false });
  // };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
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

            <label htmlFor="favorite-check-box">
              <input
                id="favorite-check-box"
                type="checkbox"
                name="checkbox"
                value={ checked }
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
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
