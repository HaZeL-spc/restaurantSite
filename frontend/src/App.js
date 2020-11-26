import  {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Main from './pages/Main'
import Menu from './pages/Menu'
import ItemDetail from './pages/ItemDetail'
import './App.css';
import React, { useEffect, useState } from 'react';
import Contact from './pages/Contact';
import About from './pages/About';
import Messages from './pages/Messages'
import CreateMeal from './components/CreateMeal';

const App = () => {

  return (
    // <Router>
    //     <Switch>

    //     </Switch>
    // </Router>
    <Router>
      <div>
        <Switch>          
          <Route path="/" exact component={Main}/>
          <Route path="/menu/:slug" component={ItemDetail}/>
          <Route path="/menu" component={Menu}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/about" component={About}/>
          <Route path="/admin/messages" component={Messages}/>
          <Route path="/admin/add-meal" component={CreateMeal}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
