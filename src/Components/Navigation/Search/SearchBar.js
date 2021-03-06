import axios from 'axios';
import React from 'react';
import { InputGroup, Input, ListGroup } from 'reactstrap';

import SearchOptions from './SearchOptions/SearchOptions';

class SearchBar extends React.Component {


    header = 'https://api.themoviedb.org/3/search/multi?api_key=';
    api = process.env.REACT_APP_API;
    mid = '&language=en-US&query=';
    end = '&page=1&include_adult=false';
    state = {
        url: '',
        data: [],
        textLength: 0,
        query: '',
    }

    searchHandler(event) {
        const url = this.header + this.api + this.mid + event.target.value + this.end;
        this.setState({
            url: url,
            query: event.target.value,
            textLength: event.target.value.length,
        }, () => {
            axios.get(this.state.url).then(response => {
                this.setState(() => {
                    return {
                        data: response.data.results,
                    }
                })
            })
        })

    }

    render() {
        const dataCheck = this.state.data[0]

        return (
            <React.Fragment>
                <InputGroup className="Search">
                    <Input placeholder="Search" onChange={this.searchHandler.bind(this)} />
                </InputGroup>
                <ListGroup>
                    {this.state.textLength > 0 && dataCheck ?
                        (dataCheck.media_type === 'tv' || dataCheck.media_type === 'movie' ?
                            <SearchOptions data={dataCheck} showOn="nav" query={this.state.query} /> : null)
                        : null}
                </ListGroup>
            </React.Fragment>
        );
    }
}

export default SearchBar;