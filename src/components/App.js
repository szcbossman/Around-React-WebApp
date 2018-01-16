import React from 'react';
import { Header } from './Header'
import { Main } from './Main'
import '../styles/App.css';



class App extends React.Component {
  state = {
    isLoggedIn: false,
  }

  loginHandler = (response) => {
    this.setState({ isLoggedIn: true});
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Main loginHandler = {this.loginHandler} isLoggedIn = {this.state.isLoggedIn}/>
      </div>
    );
  }
}

export default App;
