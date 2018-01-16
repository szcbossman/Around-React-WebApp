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

  render() {
    return (
      <div className="App">
        <Header isLoggedIn = {this.state.isLoggedIn}/>
        <Main loginHandler = {this.loginHandler} isLoggedIn = {this.state.isLoggedIn}/>
      </div>
    );
  }
}

export default App;
