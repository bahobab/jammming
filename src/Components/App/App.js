import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'New Playlist',
      searchResults:  [],
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(success =>{
      // console.log('Playlist success', success.json());
    })
    // .catch(error => console.log(error));
    
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    })
  }

  addTrack(newTrack) {
    let exists = !this.state.playlistTracks.some(aTrack => aTrack.id === newTrack.id);
    if (exists) {
      let newTrackList = this.state.playlistTracks.concat(newTrack);
      this.setState({
        playlistTracks: newTrackList
      });
    }
  }

  removeTrack(trackToRemove) {
    let newPlaylistTracks = this.state.playlistTracks.filter(track => track.id !== trackToRemove.id);
    this.setState({
      playlistTracks: newPlaylistTracks
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
    
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
      .then(searchResults => {
        this.setState({
          searchResults: searchResults
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className='App'>
          <SearchBar onSearch={this.search}  />
          <div className='App-playlist'>
            <SearchResults onAdd={this.addTrack} searchResults = {this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
