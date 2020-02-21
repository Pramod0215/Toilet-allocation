import React, { Component } from 'react';
import { toilets } from '../lib/list';
import Modal from 'react-modal';
import { Nav, Navbar, ListGroup, ListGroupItem, Card } from 'react-bootstrap';

class SearchName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: this.props.gender,
            chargable: this.props.chargable,
            age: this.props.age,
        }
    }

    render() {
        return (
            <div className='search'>
                <input type="text" onChange={(event) => this.props.searchInfo(event.target.value)} placeholder="Search for country.." />
                <input type="text" onChange={(event) => this.props.cityInfo(event.target.value)} placeholder="Search for city.." />
                <input type="text" onChange={(event) => this.props.areaInfo(event.target.value)} placeholder="Search for area.." />

                <select value={this.props.gender} onChange={(event) => this.props.searchGender(event.target.value)}>
                    <option value=''>Select Gender</option>
                    <option value='A'>All</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                <select value={this.state.age} onChange={(event) => this.props.ageInfo(event.target.value)}>
                    <option value=''>Select Age</option>
                    <option value='A'>All</option>
                    <option value="Child">Child</option>
                    <option value="Adult">Adult</option>
                </select>
                <select value={this.state.age} onChange={(event) => this.props.chargableInfo(event.target.value)}>
                    <option value=''>Select Category</option>
                    <option value='A'>All</option>
                    <option value="Paid">Paid</option>
                    <option value="Free">Free</option>
                </select>

            </div>
        )
    }
}

class Home extends Component {
    
    constructor(props) {
        super(props);
        let initialrating=0
        this.state = {
            toiletList: toilets,
            age: '',
            chargable: '',
            gender: '',
            country: '',
            city: '',
            area: '',
            isActive: false,
            activeItem: toilets[0],
            rating: '',
        }
        this.searchCounty = this.searchCounty.bind(this);
        this.searchCity = this.searchCity.bind(this);
        this.searchArea = this.searchArea.bind(this);
        this.searchGender = this.searchGender.bind(this);
        this.searchAge = this.searchAge.bind(this);
        this.searchIsChargable = this.searchIsChargable.bind(this);
    }
    searchCounty(text) {
        this.setState({
            country: text,
        })
    }
    searchCity(text) {
        this.setState({
            city: text,
        })
    }
    searchArea(text) {
        this.setState({
            area: text,
        })
        console.log(text);
    }
    searchGender(text) {
        this.setState({
            gender: text
        });
        console.log(text);
    }

    searchAge(text) {
        this.setState({
            age: text
        });
        console.log(text);
    }
    searchIsChargable(text) {
        this.setState({
            chargable: text
        });
        console.log(text);
    }

    openDetailsToilet = (loc) => {
        this.setState({
            isActive: !this.state.isActive,
            activeItem: loc
        })
    }

    closeDetailsToilet = () => {
        this.setState({
            isActive: false
        })
    }

    finalRating(data){
        const activeItem = this.state.activeItem;
        const initialRating = activeItem.toiletName[data].rating;
        const finalrating = (parseInt(initialRating) + parseInt(this.state.rating)) / 2;
        console.log(initialRating, parseInt(this.state.rating), finalrating, (parseInt(initialRating) + parseInt(this.state.rating)) / 2)
        activeItem.toiletName[data].rating = finalrating
        this.setState({
            activeItem
        })
    }

    render() {
        let data = this.state.toiletList;;
        return (

            <div >
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="http://localhost:3000/">Public toilet Allocation</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
                    </Nav>
                </Navbar>
                <SearchName searchInfo={this.searchCounty} gender={this.state.gender} cityInfo={this.searchCity} areaInfo={this.searchArea} searchGender={this.searchGender} ageInfo={this.searchAge} chargableInfo={this.searchIsChargable} />
                <Modal isOpen={this.state.isActive}>
                    <div className='body1container'>
                        <div className='heading'>
                            <h1>Public Toilet({this.state.activeItem.area})</h1>

                        </div>
                        <div className='body-content'>
                            <div className='body-content-left'>

                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={require('./index1.jpeg')} />
                                    {this.state.activeItem ?
                                        <div >{this.state.activeItem.toiletName.map((item, index) => (<div className='Card' key={index}>

                                            <Card.Body>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Text>
                                                    Clean India, Developed India.
                                                </Card.Text>
                                            </Card.Body>
                                            <ListGroup className="list-group-flush">
                                                <ListGroupItem>Rating: {item.rating}</ListGroupItem>
                                                <ListGroupItem>Likes: {item.likes}</ListGroupItem>
                                                <ListGroupItem> <select className='select-rating' value={this.state.rating} onChange={(event) => this.setState({ rating: event.target.value })}>
                                                    <option value='0'>Give rating</option>
                                                    <option value='1'>Very Poor - 1</option>
                                                    <option value='2'>Poor - 2</option>
                                                    <option value="3">Good - 3</option>
                                                    <option value="4">Very good - 4</option>
                                                    <option value='5'>Excellent - 5</option>
                                                </select></ListGroupItem>
                                                <ListGroupItem><button className='rating-submit' onClick={() => this.finalRating(index)}>Submit</button></ListGroupItem>
                                            </ListGroup>
                                        </div>))}</div>
                                        : null}
                                </Card>
                            </div>
                            <div className='body-content-right'></div>
                        </div>
                        <button onClick={this.closeDetailsToilet}>Back</button>
                    </div>
                </Modal>
                <table>
                    <thead>
                        <tr>
                            <th onClick={this.detailsToilet}>Toilet Name</th>
                            <th>Gender</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Area</th>
                            <th>Chargable</th>
                            <th>Age</th>
                        </tr>

                    </thead>
                    <tbody>
                        {data.filter(name => {
                            return name.country.toLowerCase().includes(this.state.country.toLowerCase())
                                && name.city.toLowerCase().includes(this.state.city.toLowerCase())
                                && name.area.toLowerCase().includes(this.state.area.toLowerCase())
                                && name.gender.toLowerCase().includes(this.state.gender.toLowerCase() !== 'a' ? this.state.gender.toLowerCase() : '')
                                && name.age.toLowerCase().includes(this.state.age.toLowerCase() !== 'a' ? this.state.age.toLowerCase() : '')
                                && name.chargable.toLowerCase().includes(this.state.chargable.toLowerCase() !== 'a' ? this.state.chargable.toLowerCase() : '');
                        }).map((item, index) => (<tr key={index}>
                            <td onClick={() => this.openDetailsToilet(item)}>{item.toiletName.map((item, index) => (<ol key={index}>
                                {item.name}
                            </ol>))}</td>
                            <td>{item.gender}</td>
                            <td>{item.country}</td>
                            <td>{item.city}</td>
                            <td>{item.area}</td>
                            <td>{item.chargable}</td>
                            <td>{item.age}</td>
                        </tr>))}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Home;