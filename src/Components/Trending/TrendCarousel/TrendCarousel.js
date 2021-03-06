import './TrendCarousel.css';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TrendMovies from './../TrendMovies/TrendMovies';
import { Row, Col, Container } from "reactstrap";

const TrendCarousel = props => {

    const isMobile = useSelector(state => state.isMobile);
    let sizeCheck;
    if (props.data.length === 0) sizeCheck = 0;
    if (props.data.length > 0 && props.data.length <= 6) sizeCheck = props.data.length;
    if (props.data.length > 6) sizeCheck = 6;

    let sizeCheckMobile;
    if (props.data.length === 0) sizeCheckMobile = 0;
    if (props.data.length > 0 && props.data.length <= 2) sizeCheckMobile = props.data.length;
    if (props.data.length > 2) sizeCheckMobile = 2;

    const size = isMobile ? sizeCheck : sizeCheckMobile;
    let [counter, setCounter] = useState(size);
    const limitData = []
    counter = counter - size < 0 ? size : counter;
    for (let i = counter - size; i < counter; i++) {
        limitData.push(props.data[i])
    }


    const thumbnail = limitData[0] !== undefined ? limitData.map((content, index) => {
        return (
            <TrendMovies
                key={content.id}
                id={content.id}
                img={content.poster_path}
                type={props.type}
                seasonNumber={props.type === 'seasons' ? content.season_number : false}
                seasonName={props.type === 'seasons' || props.type === 'tv' ? content.name : null}
                movieName={props.type === 'movie' ? content.title : null}
                tv_id={props.type === 'seasons' ? props.tv_id : false}
            />
        );
    }) : null

    return (
        <React.Fragment>
            <Container fluid>
                <Row className=" TopList">
                    <Col tag="h5">
                        {props.name}
                    </Col>
                </Row>
            </Container>
            <div className={counter !== 1 ? "MainContainer" : ""}>
                <Col className="ArrowBtn" style={counter > size ? { visibility: "visible" } : { visibility: "hidden" }}>
                    <h1><i className="fas fa-angle-left" onClick={() => { counter > size ? setCounter(counter - 1) : setCounter(counter) }}></i></h1>
                </Col>
                <Row className="TopList text-center">
                    {thumbnail}
                </Row>
                <Col className="ArrowBtn text-right" style={counter < props.data.length ? { visibility: "visible" } : { visibility: "hidden" }} >
                    <h1><i className="fas fa-angle-right" onClick={() => { counter < props.data.length ? setCounter(counter + 1) : setCounter(counter) }}></i></h1>
                </Col>
            </div>
        </React.Fragment>
    );
}

export default TrendCarousel;