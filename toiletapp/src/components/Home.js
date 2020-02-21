import React, { Component } from 'react';
import { toilets } from '../lib/list';
import Modal from 'react-modal';

import { Nav, Navbar } from 'react-bootstrap';


class SearchName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: '',
            chargable: '',
            age: ''
        }
    }
    render() {
        return (
            <div className='search'>


                <input type="text" onChange={(event) => this.props.searchInfo(event.target.value)} placeholder="Search for country.." />
                <input type="text" onChange={(event) => this.props.cityInfo(event.target.value)} placeholder="Search for city.." />
                <input type="text" onChange={(event) => this.props.areaInfo(event.target.value)} placeholder="Search for area.." />
                <select value={this.state.gender} onChange={(event) => this.props.searchGender(event.target.value)}>
                    <option value='default'>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <select value={this.state.age} onChange={(event) => this.props.ageInfo(event.target.value)}>
                    <option value='default'>Select Age</option>
                    <option value="child">Child</option>
                    <option value="adult">Adult</option>
                </select>
                <select value={this.state.age} onChange={(event) => this.props.chargableInfo(event.target.value)}>
                    <option value='default'>Select Category</option>
                    <option value="Paid">Paid</option>
                    <option value="free">Free</option>
                </select>

            </div>
        )
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toiletList: toilets,
            age: '',
            chargable: '',
            gender: '',
            country: '',
            city: '',
            area: '',
            isActive: false,
            activeItem:toilets[0]
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
    componentWillMount() {
        Modal.setAppElement('body');
    }

    openDetailsToilet = (loc) => {
        this.setState({
            isActive:!this.state.isActive,
            activeItem: loc
        })
    }

    closeDetailsToilet = ()=>{
        this.setState({
            isActive:false
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
                <SearchName searchInfo={this.searchCounty} cityInfo={this.searchCity} ageInfo={this.searchArea} searchGender={this.searchGender} ageInfo={this.searchAge} chargableInfo={this.searchIsChargable} />
                <Modal isOpen={this.state.isActive}>
                    <div className='body1container'>
                        <div className='heading'>
                            <h1>Public Toilet</h1>
                           
                        </div>
                        <div className='body-content'>
                            <div className='body-content-left'>
                                {/* {data.map((item,index)=>( <div key={index}>
                                    {item.toiletName.map((item,index)=>(<div key={index}>
                                    Name : <h4>{item.name}</h4>
                                    Rating : <h4>{item.rating}</h4>
                                    Likes : <h4>{item.likes}</h4>
                                    </div>))}
                                </div>))} */}
                                { this.state.activeItem ?
                                    <h1 style={{ marginTop: "5rem" }}>{this.state.activeItem.toiletName.map((item, index)=>(<div key={index}>
                                        <span>Name: {item.name}</span><br></br>
                                        <span>Rating: {item.rating}</span><br></br>
                                        <span>Likes: {item.likes}</span><br></br>
                                        </div>))}</h1>
                                : null }
                            </div>
                            <div className='body-content-right'></div>
                        </div>
                    </div>
                    <button onClick={this.closeDetailsToilet}>Back</button>
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
                                && name.gender.toLowerCase().includes(this.state.gender.toLowerCase())
                                && name.age.toLowerCase().includes(this.state.age.toLowerCase())
                                && name.chargable.toLowerCase().includes(this.state.chargable.toLowerCase());
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