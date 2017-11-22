import React, { Component } from 'react';
// import logo from './logo.svg';

import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify'; // 88

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'My Play List',
      searchResults:  [
        {name: 'ttt', artist: 'rrrrr', album: 'uuuuu'},
        {name: '99999', artist: '55555', album: '4444'}
      ],
      playlistTracks: [
        {
          id: 11,
          name: 'Jamin',
          artist: 'Bob Marley',
          album: 'Jamin'
        },
        {
          id: 17,
          name: 'Pick Myself Up',
          artist: 'Peter Tosh',
          album: 'Bush Doctor'
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    // return trackURIs;
    Spotify.savePlaylist(this.state.playlistName, trackURIs); // 95
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    })
  }

  addTrack(newTrack) {
    let exists = !this.state.playlistTracks.some(aTrack => aTrack.id === newTrack.id);
    if (!exists) {
      let newTrackList = this.state.playlistTracks.concat(newTrack);
      this.setState({
        playlistTracks: newTrackList
      });
    }
  }

  removeTrack(trackToRemove) {
    let newPlaylistTracks = this.state.playlistTracks.filter(track => track.id !== trackToRemove);
    this.setState({
      playlistTracks: newPlaylistTracks
    })
  }

  updatePlaylistName(name) {
    this.state.setState({
      playlistName: name
    })
  }

  search(searchTerm) { //67
    let mySearchResults = Spotify.search(searchTerm); // 88
    this.setState({
      searchResults: mySearchResults
    })
    console.log(mySearchResults);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className='App'>
          <SearchBar onSearch={this.search}  />
          <div className='App-playlist'>
            <SearchResults onAdd={this.addTrack} searchResults = {this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
