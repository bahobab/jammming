import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     searchTerm: ''
        // }
        // this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        // this.resetInput = this.resetInput.bind(this);
    }

    handleTermChange(event) {
        // this.setState({searchTerm: event.target.value});
        let term = event.target.value;
        this.props.onSearchTermChange(term);
    }

    // search() {
    //     this.props.onSearch(this.state.searchTerm);
    // }

    render() {
        return (
            <div className='SearchBar'>
                <input value={this.props.searchTerm} onChange={this.handleTermChange} placeholder='Enter A Song, Album, or Artist'/>
                <a onClick={this.props.onSearch}>SEARCH</a>
            </div>
        );
    }
}

export {SearchBar};