import React, {Component} from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

export default class PlayList extends Component {
    constructor(props) {
        super(props);
        
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        let name = event.target.value;
        this.props.onNameChange(name);
    }

    render() {
        return (
            <div className='Playlist'>
                <input onChange={this.handleNameChange} value={this.props.playlistName} />
                <TrackList canRemove={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks} />
                <a className='Playlist-save' onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        );
    }
}