import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';

const MoviesList = props => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=b3b3e5f8a9cd55d3accce786f465e8d7&append_to_response=videos',
      )
      .then(response => {
        console.log(response.data.results);
        setMovies(response.data.results);
      });
  }, []);

  if (movies.length === 0) {
    return (
      <View style={{flex: 1, padding: 20}}>
        <Text>Loading, please wait...</Text>
      </View>
    );
  }

  const itemPressed = index => {
    props.navigation.navigate('MovieDetails', {movie: movies[index]});
  };

  const movieItems = movies.map(function (movie, index) {
    return (
      <TouchableHighlight
        onPress={_ => itemPressed(index)}
        underlayColor="lightgray"
        key={index}>
        <MovieListItem movie={movie} key={index} />
      </TouchableHighlight>
    );
  });

  return <ScrollView>{movieItems}</ScrollView>;
};

const MovieListItem = props => {
  const IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  const imageurl = IMAGEPATH + props.movie.poster_path;

  return (
    <View style={styles.movieItem}>
      <View style={styles.movieItemImage}>
        <Image source={{uri: imageurl}} style={{width: 99, height: 146}} />
      </View>
      <View style={styles.movieItemInfo}>
        <Text style={styles.movieItemTitle}>{props.movie.title}</Text>
        <Text style={styles.movieItemText}>{props.movie.release_date}</Text>
        <Text
          numberOfLines={6}
          ellipsizeMode="tail"
          style={styles.movieItemText}>
          {props.movie.overview}
        </Text>
      </View>
    </View>
  );
};

const MovieListScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <MoviesList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    margin: 5,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
  },
  movieItemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxWidth: 300,
  },
  movieItemImage: {
    marginRight: 5,
  },
  movieItemTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  movieItemText: {
    flexWrap: 'wrap',
    fontStyle: 'italic',
  },
});

export default MovieListScreen;
