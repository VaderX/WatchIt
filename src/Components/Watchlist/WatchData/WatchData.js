import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import noImgPoster from './../../../assets/movIMG/noImgPoster.jpg';
import { Row, Col, CardImg, ListGroupItem, Badge } from 'reactstrap';
import WatchBtn from './../WatchBtn/WatchBtn';


class WatchData extends React.Component {

    state = {
        data: [],
    }

    header = 'https://api.themoviedb.org/3/';
    type = this.props.type;
    id = this.props.id;
    api = process.env.REACT_APP_API;
    url = this.header + this.type + '/' + this.id + '?api_key=' + this.api + '&language=en-US';

    componentDidMount() {
        axios.get(this.url)
            .then(res => {
                this.setState({
                    data: res.data,
                })
            })
    }

    render() {
        const imgURL = this.state.data.poster_path != null ? ('https://image.tmdb.org/t/p/w200/' + this.state.data.poster_path) : noImgPoster;
        const istv = this.type === 'tv' ? true : false;
        const DarkStyle = { background: "#404040" };
        const LiteStyle = { background: "White" };
        const style = this.props.theme ? LiteStyle : DarkStyle;
        return (
            <ListGroupItem style={style}>
                <Row>
                    <Col xs="6" md="1">
                        <a href={'/' + this.type + '/' + this.id}>
                            <CardImg src={imgURL} />
                        </a>
                    </Col>
                    <Col>
                        <Row >
                            <Col md="12" className="mb-2" tag="h6">
                                {istv ? this.state.data.name : this.state.data.title}
                            </Col>
                            <Col md="12" className="mb-2">
                                {istv ? this.state.data.first_air_date : this.state.data.release_date}
                            </Col>
                            <Col md="12" className="mb-2">
                                <Badge>{this.state.data.vote_average}</Badge>
                            </Col>
                            <Col md="12" className="mb-2">
                                <WatchBtn type={this.type} id={this.id} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme,
    }
}
export default connect(mapStateToProps)(WatchData);