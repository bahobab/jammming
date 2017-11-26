import React, {Component} from 'react';

import './TrackList.css';
import Track from '../Track/Track'

export default class TrackList extends Component {
    render() {
        let resultTracks = this.props.tracks.map((track, index) => {
            return <Track key={index} onRemove={this.props.onRemove} onAdd={this.props.onAdd} id={track.id} track={track} isRemoval={this.props.canRemove}/>
        });
        return (
            <div className='TrackList'>
                {resultTracks}
            </div>
        );
    }
}