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
    renderAction() { 
        // console.log('is removal: ', this.props.isRemoval);
        if (this.props.isRemoval) return  <a className="Track-action" onClick={this.removeTrack}>-</a>;
        else return  <a className="Track-action" onClick={this.addTrack}>+</a>;
    }

    addTrack() {
        console.log('adding... ', this.props.track);
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        console.log('removing... ', this.props.track);
        this.props.onRemove(this.props.track);
    }
    
    render() {
        // console.log('One track...', this.props.track);
        return (
            <div className='Track'>
                <div className='Track-information'>
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {/* <a className='Track-action' onClick={this.addTrack} onClick={this.removeTrack}>{this.renderAction()}</a> */}
                <div >{this.renderAction()}</div>
            </div>
        );
    }
}