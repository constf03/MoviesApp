import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';

const MovieDetailScreen = props => {
  const [videoId, setVideoId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {route} = props;
  const {movie} = route.params;
  const IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  const imageurl = IMAGEPATH + movie.backdrop_path;

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/' +
          movie.id +
          '?api_key=b3b3e5f8a9cd55d3accce786f465e8d7&append_to_response=videos',
      )
      .then(response => {
        setMovieData(response.data);
      });
  }, []);

  let genres = '';
  if (movieData && movieData.genres) {
    genres = movieData.genres.map(genre => genre.name).join(' ');
  }

  let video = '';
  if (
    movieData &&
    movieData.videos &&
    movieData.videos.results &&
    movieData.videos.results.length > 0
  ) {
    video = movieData.videos.results[0];
  }

  const openModal = videoKey => {
    setVideoId(videoKey);
    setModalVisible(true);
    setPlaying(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setPlaying(false);
    setVideoId(null);
  };

  return (
    <View>
      <View>
        <Image source={{uri: imageurl}} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.text}>{movie.release_date}</Text>
          <Text style={styles.text}>{movie.overview}</Text>
          <Text style={styles.text}>Genres: {genres}</Text>
          <Text style={styles.text}>Runtime: {movieData.runtime} min</Text>
          <Text style={styles.text}>Homepage: {movieData.homepage}</Text>
          {video && (
            <View style={{display: 'flex', flexDirection: 'column', gap: 2}}>
              <Text style={styles.text}>Video: </Text>
              <TouchableOpacity onPress={() => openModal(video.key)}>
                <Text style={{color: 'blue'}}>{video.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => closeModal()}>
            {videoId && (
              <View style={styles.modalView}>
                <YoutubePlayer height={300} play={playing} videoId={videoId} />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => closeModal()}>
                  <Text style={{color: 'white'}}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </Modal>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    aspectRatio: 670 / 250,
  },
  details: {
    gap: 4,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    fontSize: 12,
    flexWrap: 'wrap',
  },
  closeButton: {
    color: 'white',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    padding: 10,
    fontSize: 16,
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
});

export default MovieDetailScreen;
