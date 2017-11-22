import React, {Component} from 'react';

import './SearchBar.css';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(event) { //71
        this.setState({searchTerm: event.target.value});
    }

    search() { //69
        this.props.onSearch(this.state.searchTerm)
    }
    render() {
        return (
            <div className='SearchBar'>
                <input onChange={this.handleTermChange} placeholder='Enter A Song, Album, or Artist'/>
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}