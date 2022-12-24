// import * as React from "react";
import { Component } from "react";
import React, {useState, useEffect} from 'react';
import "./css/scss/main.css";
import "./css/scss/main.css.map";
import Navigation from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutUsPage from "./pages/AboutUsPage";
import Error404 from "./Error404";
import Login from "./components/Login";
import CreateUserForm from "./components/CreateUserForm";

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import bodyParser from "body-parser";

// import CurrentUserProvider from './contexts/CurrentUser'
// import * as serviceWorker from "./serviceWorker";

function App() {
  const [users, setUsers] = useState(false);
  useEffect(() => {
    getUser();
  }, []);
  function getUser() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setUsers(data);
      });
  }
  function createUser() {
    let email = prompt('Enter email');
    let hashedPassword = prompt('Enter password');
    fetch('http://localhost:3001/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, hashedPassword}),
    })
      .then(response => {
        return response.text(Welcome);
      })
      .then(data => {
        alert(data);
        getUser();
      });
  }
  function deleteUser() {
    let id = prompt('Enter user id');
    fetch(`http://localhost:3001/user/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUser();
      });
  
  // return (
  //   <div>
  //     {users ? users : 'There is no user data available'}
  //     <br />
  //     <button onClick={createUser}>Add User</button>
  //     <br />
  //     <button onClick={deleteUser}>Delete User</button>
  //   </div>
  // );
}

 

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       greeting: "",
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ name: event.target.value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
//       .then((response) => response.json())
//       .then((state) => this.setState(state));
//   }

  // render() 
  {
    return (
      <div className="App">
        <Navigation />
        {/* <header className="App-header"></header> */}
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/products" element={<ProductsPage />} />
            <Route exact path="/aboutus" element={<AboutUsPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route
              exact
              path="/ordercomplete"
              element={<OrderConfirmationPage />}
            />
            <Route exact path="/checkout" element={<CheckoutPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<CreateUserForm />} />
            {/* <Route exact path="/product/:productid" element={<ProductDetails />}/> */}
            <Route exact path="/profile/:userid" element={<ProfilePage />} />
            <Route path="/" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
        <br />
        <div>
      {users ? users : 'There is no user data available'}
      <br />
      <button onClick={createUser}>Add User</button>
      <br />
      <button onClick={deleteUser}>Delete User</button>
    </div>
        <br />
        {/* <audio controls autoplay>
          <source src="src\Fire_Burning-JaBa-810606813.mp3" type="audio/mpeg" />
          <source src=".src/Fire_Burning-JaBa-810606813.wav" type="audio/wav" />
        </audio> */}
        <Footer />
      </div>
    );
      }
    }
  


export default App;
