import React, {Component} from 'react';

import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

export default class SearchResults extends Component {
    render() {
        const canRemove = false;
        return (
            <div className='SearchResults'>
                <h2>Results</h2>
                <TrackList canRemove={canRemove} onAdd={this.props.onAdd} tracks={this.props.searchResults} /> 
            </div>
        );
    }
}