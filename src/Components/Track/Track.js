import React, {Component} from 'react';

import './Track.css';

export default class Track extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     isRemoval: false
        // };

        // this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction(isRemoval) { 
        if (isRemoval) return '-';
        else return '+';
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    
    render() {
        return (
            <div className='Track'>
                <div className='Track-information'>
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {/* <a className='Track-action' onClick={this.addTrack} onClick={this.removeTrack}>{this.renderAction()}</a> */}
                <a className='Track-action' onClick={this.addTrack} onClick={this.removeTrack}>{this.renderAction()}</a>
            </div>
        );
    }
}