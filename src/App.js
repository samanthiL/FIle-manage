import React, { Component } from 'react';
import './App.css';
import FilesUploadComponent from './components/files-upload-component';
import Userlist from './components/Userlist';
import Profile from './components/Userprofile';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
 return (
   <div className="App">
     <BrowserRouter>
 
       <Switch>
        <Route exact path="/" component={FilesUploadComponent}  /> 
       <Route exact path="/Profile" component={Profile} />
       <Route exact path="/Userlist" component={Userlist} />
       </Switch>

     </BrowserRouter>
   </div>
 );
}

export default App;
