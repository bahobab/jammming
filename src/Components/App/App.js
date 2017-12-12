import React, { Component } from 'react';
import Notifications, {notify} from 'react-notify-toast';
// import logo from './logo.svg';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import {Spotify} from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'New Playlist',
      searchTerm: '',
      searchResults:  [],
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(() =>{
      // console.log('Playlist success', success.json());
      notify.show('Playlist successfully saved to Spotify...', "success");
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    }).catch(error => {
      // console.log(error.message);
      // notify.show('Error saving to Spotify...', "error");
    });
    
    
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

  updateSearchTerm(searchTerm) {
    this.setState({
      searchTerm
    })
  }

  search() {
    Spotify.search(this.state.searchTerm)
      .then(searchResults => {
        if (searchResults.length !== 0) {
          this.setState({
            searchResults: searchResults
          });
          this.setState({searchTerm: ''});
          notify.show('Search completed successfully...', "success");
        } else {
          notify.show(`Search completed, but no match found for ${this.state.searchTerm}`, "warning");
        }
      }).catch(error => {
        // let msg = error.message;
        // notify.show('Unable to complete search...', "error");
        // console.log(error.message);
      });
  }

  render() {
    return (
      <div>
        <Notifications />
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className='App'>
          <SearchBar onSearch={this.search} onSearchTermChange={this.updateSearchTerm} searchTerm={this.state.searchTerm} />
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
