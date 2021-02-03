import './SearchOptions.css';
import noImgPoster from './../../../../assets/movIMG/noImgPoster.jpg';

import React from 'react';
import { Badge, Card, CardImg, Col, ListGroupItem, Row } from 'reactstrap';

import WatchBtn from './../../../Watchlist/WatchBtn/WatchBtn';

const SearchOptions = props => {
    const imgURL = props.data.poster_path != null ? ('https://image.tmdb.org/t/p/w200/' + props.data.poster_path) : noImgPoster;
    const istv = props.data.media_type === 'tv' ? true : false;

    return (
        <ListGroupItem
            className={props.showOn === "nav" ? "SearchList" : "SearchOptionsItems"}>
            <Row>
                <Col xs="4" md={props.showOn !== "nav" ? "1" : "4"}>
                    <Card>
                        <a href={'/' + props.data.media_type + '/' + props.data.id} className="SearchLink">
                            <CardImg className={props.showOn === "nav" ? "SearchPosterImg" : ""} src={imgURL} />
                        </a>
                    </Card>
                </Col>
                <Col xs="" md={props.showOn !== "nav" ? "2" : ""}>
                    <Row>
                        <Col md="12" className="mb-2">
                            {istv ? props.data.name : props.data.title}
                        </Col>
                        <Col md="12" className="mb-2">
                            {props.data.media_type.toUpperCase()}
                        </Col>
                        <Col md="12" className="mb-2">
                            {istv ? props.data.first_air_date : props.data.release_date}
                        </Col>
                        <Col md="12" className="mb-2">
                            <Badge>{props.data.vote_average}</Badge>
                        </Col>
                    </Row>
                </Col>
                {props.showOn !== "nav" ? <Col>
                    <WatchBtn type={props.data.media_type} id={props.data.id} />
                </Col> : null}
            </Row>
            {/* </a> */}
            {props.showOn === "nav" ? <React.Fragment>
                <hr />
                <a href={'/search/' + props.query} className="SearchLink">
                    <p className="text-center ResultTag">All Results</p>
                </a>
            </React.Fragment> : null}
        </ListGroupItem>
    );
}

export default SearchOptions;