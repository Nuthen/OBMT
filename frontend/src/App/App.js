import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Home} from './pages/Home';
import List from './pages/List';
import {Landing} from './pages/landing';
import {Main} from './pages/maincontent';
import { NaviBar } from './components/navigation';
import { Structure } from './components/structure';


class App extends Component{
  render(){
    return(
    <React.Fragment>
      <BrowserRouter>
      <div>
      <Structure>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/list' component={List}/>
            <Route path='/landing' component={Landing}/>
            <Route path='/maincontent' component={Main}/>
          </Switch>
      </Structure>
      </div>
      </BrowserRouter>
    </React.Fragment>
    );
  }
}

export default App;