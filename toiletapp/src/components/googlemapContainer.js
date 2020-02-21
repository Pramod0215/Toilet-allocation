// // import {Map, InfoWindow, Marker,GoogleApiWrapper} from 'google-maps-react';

// // //... 
// // import React, { Component } from 'react';



// // // const API_KEY = 'AIzaSyBH25vJPuLlWGlr5mnzTdZjeYeMjeU_hyE' // how to get key - step are below

// // class HomeComponent extends Component {
// //   constructor(props) {
// //     super(props)
// //     this.state = {
// //       place: null,
// //     };
// //   }

// //   render() {
// //     return (
// //       <div >
// //          {/* <GoogleComponent

// //           apiKey={API_KEY}
// //           language={'en'}
// //           country={'country:in|country:us'}
// //           coordinates={true}
// //           locationBoxStyle={'custom-style'}
// //           locationListStyle={'custom-style-list'}
// //           onChange={(e) => { this.setState({ place: e }) }} /> */}

// //           <Map google={this.props.google} zoom={14}>
// //           <Marker onClick={this.onMarkerClick} name={'Current location'}/>
// //           <InfoWindow onClose={this.InfoWindowClose} />
// //           <div>
// //         {/* <h1>{this.state.selectPlace.name}</h1> */}
// //           </div>
// //           <InfoWindow/>
// //           </Map>
// //       </div>

// //     )
// //   } 
// // }

// // export default GoogleApiWrapper({
// //     apiKey:('AIzaSyBH25vJPuLlWGlr5mnzTdZjeYeMjeU_hyE')
// // })(HomeComponent);

// // // export default HomeComponent;


// import React, { Component } from 'react';
// import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
// import Geocode from "react-geocode";
// import Autocomplete from 'react-google-autocomplete';
// Geocode.setApiKey( "xxxxxx" );
// Geocode.enableDebug();

// class Map extends Component{

// 	constructor( props ){
// 		super( props );
// 		this.state = {
// 			address: '',
// 			city: '',
// 			area: '',
// 			state: '',
// 			mapPosition: {
// 				lat: this.props.center.lat,
// 				lng: this.props.center.lng
// 			},
// 			markerPosition: {
// 				lat: this.props.center.lat,
// 				lng: this.props.center.lng
// 			}
// 		}
// 	}
// 	componentDidMount() {
// 		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
// 			response => {
// 				const address = response.results[0].formatted_address,
// 				      addressArray =  response.results[0].address_components,
// 				      city = this.getCity( addressArray ),
// 				      area = this.getArea( addressArray ),
// 				      state = this.getState( addressArray );

// 				console.log( 'city', city, area, state );

// 				this.setState( {
// 					address: ( address ) ? address : '',
// 					area: ( area ) ? area : '',
// 					city: ( city ) ? city : '',
// 					state: ( state ) ? state : '',
// 				} )
// 			},
// 			error => {
// 				console.error( error );
// 			}
// 		);
// 	};
// 	/**
// 	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
// 	 *
// 	 * @param nextProps
// 	 * @param nextState
// 	 * @return {boolean}
// 	 */
// 	shouldComponentUpdate( nextProps, nextState ){
// 		if (
// 			this.state.markerPosition.lat !== this.props.center.lat ||
// 			this.state.address !== nextState.address ||
// 			this.state.city !== nextState.city ||
// 			this.state.area !== nextState.area ||
// 			this.state.state !== nextState.state
// 		) {
// 			return true
// 		} else if ( this.props.center.lat === nextProps.center.lat ){
// 			return false
// 		}
// 	}
// 	/**
// 	 * Get the city and set the city input value to the one selected
// 	 *
// 	 * @param addressArray
// 	 * @return {string}
// 	 */
// 	getCity = ( addressArray ) => {
// 		let city = '';
// 		for( let i = 0; i < addressArray.length; i++ ) {
// 			if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
// 				city = addressArray[ i ].long_name;
// 				return city;
// 			}
// 		}
// 	};
// 	/**
// 	 * Get the area and set the area input value to the one selected
// 	 *
// 	 * @param addressArray
// 	 * @return {string}
// 	 */
// 	getArea = ( addressArray ) => {
// 		let area = '';
// 		for( let i = 0; i < addressArray.length; i++ ) {
// 			if ( addressArray[ i ].types[0]  ) {
// 				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
// 					if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
// 						area = addressArray[ i ].long_name;
// 						return area;
// 					}
// 				}
// 			}
// 		}
// 	};
// 	/**
// 	 * Get the address and set the address input value to the one selected
// 	 *
// 	 * @param addressArray
// 	 * @return {string}
// 	 */
// 	getState = ( addressArray ) => {
// 		let state = '';
// 		for( let i = 0; i < addressArray.length; i++ ) {
// 			for( let i = 0; i < addressArray.length; i++ ) {
// 				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
// 					state = addressArray[ i ].long_name;
// 					return state;
// 				}
// 			}
// 		}
// 	};
// 	/**
// 	 * And function for city,state and address input
// 	 * @param event
// 	 */
// 	onChange = ( event ) => {
// 		this.setState({ [event.target.name]: event.target.value });
// 	};
// 	/**
// 	 * This Event triggers when the marker window is closed
// 	 *
// 	 * @param event
// 	 */
// 	onInfoWindowClose = ( event ) => {

// 	};

// 	/**
// 	 * When the marker is dragged you get the lat and long using the functions available from event object.
// 	 * Use geocode to get the address, city, area and state from the lat and lng positions.
// 	 * And then set those values in the state.
// 	 *
// 	 * @param event
// 	 */
// 	onMarkerDragEnd = ( event ) => {
// 		let newLat = event.latLng.lat(),
// 		    newLng = event.latLng.lng();

// 		Geocode.fromLatLng( newLat , newLng ).then(
// 			response => {
// 				const address = response.results[0].formatted_address,
// 				      addressArray =  response.results[0].address_components,
// 				      city = this.getCity( addressArray ),
// 				      area = this.getArea( addressArray ),
// 				      state = this.getState( addressArray );
// 				this.setState( {
// 					address: ( address ) ? address : '',
// 					area: ( area ) ? area : '',
// 					city: ( city ) ? city : '',
// 					state: ( state ) ? state : '',
// 					markerPosition: {
// 						lat: newLat,
// 						lng: newLng
// 					},
// 					mapPosition: {
// 						lat: newLat,
// 						lng: newLng
// 					},
// 				} )
// 			},
// 			error => {
// 				console.error(error);
// 			}
// 		);
// 	};

// 	/**
// 	 * When the user types an address in the search box
// 	 * @param place
// 	 */
// 	onPlaceSelected = ( place ) => {
// 		console.log( 'plc', place );
// 		const address = place.formatted_address,
// 		      addressArray =  place.address_components,
// 		      city = this.getCity( addressArray ),
// 		      area = this.getArea( addressArray ),
// 		      state = this.getState( addressArray ),
// 		      latValue = place.geometry.location.lat(),
// 		      lngValue = place.geometry.location.lng();
// 		// Set these values in the state.
// 		this.setState({
// 			address: ( address ) ? address : '',
// 			area: ( area ) ? area : '',
// 			city: ( city ) ? city : '',
// 			state: ( state ) ? state : '',
// 			markerPosition: {
// 				lat: latValue,
// 				lng: lngValue
// 			},
// 			mapPosition: {
// 				lat: latValue,
// 				lng: lngValue
// 			},
// 		})
// 	};


// 	render(){
// 		const AsyncMap = withScriptjs(
// 			withGoogleMap(
// 				props => (
// 					<GoogleMap google={ this.props.google }
// 					           defaultZoom={ this.props.zoom }
// 					           defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
// 					>
// 						{/* InfoWindow on top of marker */}
// 						<InfoWindow
// 							onClose={this.onInfoWindowClose}
// 							position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
// 						>
// 							<div>
// 								<span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
// 							</div>
// 						</InfoWindow>
// 						{/*Marker*/}
// 						<Marker google={this.props.google}
// 						        name={'Dolores park'}
// 						        draggable={true}
// 						        onDragEnd={ this.onMarkerDragEnd }
// 						        position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
// 						/>
// 						<Marker />
// 						{/* For Auto complete Search Box */}
// 						<Autocomplete
// 							style={{
// 								width: '100%',
// 								height: '40px',
// 								paddingLeft: '16px',
// 								marginTop: '2px',
// 								marginBottom: '500px'
// 							}}
// 							onPlaceSelected={ this.onPlaceSelected }
// 							types={['(regions)']}
// 						/>
// 					</GoogleMap>
// 				)
// 			)
// 		);
// 		let map;
// 		if( this.props.center.lat !== undefined ) {
// 			map = <div>
// 				<div>
// 					<div className="form-group">
// 						<label htmlFor="">City</label>
// 						<input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.city }/>
// 					</div>
// 					<div className="form-group">
// 						<label htmlFor="">Area</label>
// 						<input type="text" name="area" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.area }/>
// 					</div>
// 					<div className="form-group">
// 						<label htmlFor="">State</label>
// 						<input type="text" name="state" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.state }/>
// 					</div>
// 					<div className="form-group">
// 						<label htmlFor="">Address</label>
// 						<input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
// 					</div>
// 				</div>

// 				<AsyncMap
// 					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBH25vJPuLlWGlr5mnzTdZjeYeMjeU_hyE&libraries=places"
// 					loadingElement={
// 						<div style={{ height: `100%` }} />
// 					}
// 					containerElement={
// 						<div style={{ height: this.props.height }} />
// 					}
// 					mapElement={
// 						<div style={{ height: `100%` }} />
// 					}
// 				/>
// 			</div>
// 		} else {
// 			map = <div style={{height: this.props.height}} />
// 		}
// 		return( map )
// 	}
// }
// export default Map

// // import React from 'react';
// // import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

// // import Paper from '@material-ui/core/Paper';
// // import Typography from '@material-ui/core/Typography';

// // class Google extends React.Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             showingInfoWindow: false,
// //             activeMarker: {},
// //             selectedPlace: {}
// //         }
// //         // binding this to event-handler functions
// //         this.onMarkerClick = this.onMarkerClick.bind(this);
// //         this.onMapClick = this.onMapClick.bind(this);
// //     }

// //     onMarkerClick = (props, marker, e) => {
// //         //alert(props.zoom);
// //         this.setState({
// //             selectedPlace: props,
// //             activeMarker: marker,
// //             showingInfoWindow: true
// //         });
// //     }

// //     onMapClick = (props) => {
// //         //alert(props.xs);
// //         if (this.state.showingInfoWindow) {
// //             this.setState({
// //                 showingInfoWindow: false,
// //                 activeMarker: null
// //             });
// //         }
// //     }

// //     createMarkers = (props) => {
// //         for (var i = 0; i < 20; i++) {
// //             this.onMarkerClick(results[i])
// //         }
// //     }

// //     render() {
// //         const style = {
// //             width: '100vw',
// //             height: '150vh',
// //             'marginLeft': 'auto',
// //             'marginRight': 'auto'
// //         }

// //         return (
// //             <Map
// //                 item
// //                 xs={12}
// //                 style={style}
// //                 google={this.props.google}
// //                 onClick={this.onMapClick}
// //                 zoom={14}
// //                 initialCenter={{ lat: 1.346648, lng: 103.84991200 }}
// //             >
// //                 <Marker
// //                     onClick={this.onMarkerClick}
// //                     title={'Home'}
// //                     position={{ lat: 1.346648, lng: 103.84991200 }}
// //                     name={'Home'}
// //                 />
// //                 <InfoWindow
// //                     marker={this.state.activeMarker}
// //                     visible={this.state.showingInfoWindow}
// //                 >
// //                     <Paper>
// //                         <Typography
// //                             variant='headline'
// //                             component='h4'
// //                         >
// //                             Home
// //             </Typography>
// //                         <Typography
// //                             component='p'
// //                         >
// //                             Bishan
// //             </Typography>
// //                     </Paper>
// //                 </InfoWindow>
// //                 <Marker />
// //                 <button onClick={this.createMarkers}>Try Me</button>


// //                 <InfoWindow
// //                     marker={this.state.activeMarker}
// //                     visible={this.state.showingInfoWindow}
// //                 >
// //                     <Paper>
// //                         <Typography
// //                             variant='headline'
// //                             component='h4'
// //                         >
// //                             {props.name}
// //                         </Typography>
// //                         <Typography
// //                             component='p'
// //                         >
// //                             {props.vicinity}
// //                         </Typography>
// //                     </Paper>
// //                 </InfoWindow>

// //             </Map>




// //         );
// //     }
// // }

// // export default GoogleApiWrapper({
// //     api: ('AIzaSyBH25vJPuLlWGlr5mnzTdZjeYeMjeU_hyE')
// // }) (Google)