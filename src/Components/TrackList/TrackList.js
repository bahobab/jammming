import React, {Component} from 'react';

import './TrackList.css';
import Track from '../Track/Track'

export default class TrackList extends Component {
    render() {
        let tracks = this.props.tracks;
        return (
            <div className='TrackList'>
                {tracks.map((track,index) => <Track key={index} onRemove={this.props.onRemove} onAdd={this.props.onAdd} id={track.id} track={track}/>)}
            </div>
        );
    }
}