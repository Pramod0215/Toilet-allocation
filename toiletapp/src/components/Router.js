import React from 'react';
import { Route } from 'react-router-dom';
import {Home, Toilet}from './index.js';




const BaseRouter = () => (
    <div>

        <Route exact path='/' component={Home} />  
        <Route exact path='/toilet' component={Toilet} />
        {/* <Route exact path='/drivers' component={Driver}/>  */}
        {/* <Route exact path='/location' component={HomeComponent} />   */}
        {/* <Route exact path='/home' component={Home} /> */}
       
        
    </div>
);


export default BaseRouter;