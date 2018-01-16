import React from 'react';
import { Header } from './Header'
import { Main } from './Main'
import '../styles/App.css';
import { TOKEN_KEY } from '../constants'



class App extends React.Component {
  state = {
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
  }

  loginHandler = (response) => {
    localStorage.setItem(TOKEN_KEY, response);
    this.setState({ isLoggedIn: true});
  }

  logoutHandler = () => {
    localStorage.removeItem(TOKEN_KEY);
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <div className="App">
        <Header isLoggedIn = {this.state.isLoggedIn} logoutHandler = {this.logoutHandler}/>
        <Main loginHandler = {this.loginHandler} isLoggedIn = {this.state.isLoggedIn}/>
      </div>
    );
  }
}

export default App;
