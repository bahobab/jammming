import React, {Component} from 'react';

import './TrackList.css';
import Track from '../Track/Track'

export default class TrackList extends Component {
    render() {
        // console.log('The tracks', this.props.tracks);
        let resultTracks = this.props.tracks.map((track, index) => {
            // console.log(track);
            return <Track key={index} onRemove={this.props.onRemove} onAdd={this.props.onAdd} id={track.id} track={track} isRemoval={this.props.canRemove}/>
        });
        return (
            <div className='TrackList'>
                {resultTracks}
            </div>
        );
    }
}