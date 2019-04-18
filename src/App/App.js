import React, { Component } from 'react';
import { Router, Link, navigate } from '@reach/router'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import firebase from './Firebase'
import Index from './components/Info/Index'
import Items from './components/Item/Items'
import Register from './components/User/Register';
import Login from './components/User/Login';
import Account from './components/User/Account';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      userId: null,
      userName: null,
      userEmail: null,
      items: [],
      cartItems: [],
    }
    this.addItem = this.addItem.bind(this)
  }
  registerUser = userName => {
    firebase.auth().onAuthStateChanged(user => {
      user.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
        })
        navigate('/items')
      })
    })
  }
  logoutUser = e => {
    e.preventDefault()
    this.setState({
      userId: null,
      userName: null,
      userEmail: null,
    })
    firebase.auth().signOut().then(() => {
      navigate('/')
    })
  }
  addItem(item){
    firebase.database().ref(`items`).push(item)
    // var newArray = this.state.newItems.slice();    
    // newArray.push(item);
    // this.setState({newItems:newArray})
  }
  sortNewestFirst(a,b){
    if (a.timestamp < b.timestamp)
      return 1;
    if (a.timestamp > b.timestamp)
      return -1;
    return 0;
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        // TODO once items are added to cart count them and add it here
        this.setState({
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
        })
      }else{
        this.setState({
          userId: null,
          userName: null,
          userEmail: null,
        })
      }
    })
    // get all items and send them to items page
    const itemsRef = firebase.database().ref('items/').orderByChild('timestamp')
    itemsRef.on('value', snapshot => {
      let items = snapshot.val()
      let itemsList = []
      for(let item in items){
        itemsList.push({
          id: item,
          title: items[item].title,
          description: items[item].description,
          price: items[item].price,
          timestamp: items[item].timestamp,
          image: items[item].image,
        })
      }
      itemsList.sort(this.sortNewestFirst)
      this.setState({
        items: itemsList,
        itemsLength: itemsList.length
      })
    })
  }
  render() {
    return (
      <div className="app">
        <nav className="navbar navbar-expand-sm sticky-top navbar-dark bg-dark">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Greek Clothing Inc.</Link>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item"><Link to="/items/" className="nav-link">Items</Link></li>
          </ul>
          {
            this.state.userId !== null ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item"><Link to="/account/" className="nav-link">My Account</Link></li>
                <li className="nav-item"><Link onClick={e => this.logoutUser(e)} to="/logout/" className="nav-link">Logout</Link></li>
                <li className="nav-item"><Link to="/cart/" className="nav-link">Cart <span className="badge badge-light">{this.state.cartItems.length}</span></Link></li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item"><Link to="/register/" className="nav-link">Register</Link></li>
                <li className="nav-item"><Link to="/login/" className="nav-link">Login</Link></li>
              </ul>
            )
          }
        </nav>
        <div className="container">
          <Router>
            <Index path="/"/>
            <Items
              path="/items"
              items={this.state.items}
              userEmail={this.state.userEmail}
              addItem={this.addItem}
            />
            <Register path="/register" registerUser={this.registerUser}/>
            <Login path="/login" loginUser={this.loginUser}/>
            <Account path="/account" 
              userId={this.state.userId}
              userName={this.state.userName}
              userEmail={this.state.userEmail}
            />
          </Router>
        </div>    
      </div>
    );
  }
}

export default App;
