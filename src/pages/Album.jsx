import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicList: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musicList: musics });
  }

  render() {
    const { musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">
          {musicList.length && musicList[0].artistName}
        </p>
        <p data-testid="album-name">{musicList.length && musicList[0].collectionName}</p>
        {musicList.map((music, index) => index !== 0 && (
          <span key={ index }>
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          </span>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
