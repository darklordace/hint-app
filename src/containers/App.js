import React, { Component } from 'react';
import Hint from '../components/Hint/Hint';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hintLst: []
    }
  }

  submitToken = (hintId, token) => {
    fetch(process.env.REACT_APP_API_URL + '/unlock', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        hintId: hintId,
        token: token
      })
    }).then((resp) => resp.json())
      .then((data) => {
        if (data === "not found" || data === "failed") {
          alert("Failed unlocking hint");
        } else {
          let elem = document.getElementById(`hint-desc-${hintId}`);
          elem.innerText = data.hintDesc;
          elem.style.background = "white";
          elem.style.textAlign = "left";
          elem.style.cursor = "auto";
          elem.setAttribute("data-toggle", "");
          alert("Hint unlocked");
        }
      })
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + '/gethints', {
      method: 'post',
      headers: {'Content-Type': 'application/json'}
    }).then((resp) => resp.json())
      .then((data) => {
        this.setState({ hintLst: data.hintLst })
      })
  }

  getHints = () => {
    return this.state.hintLst.map((hintNumber, idx) =>
      <Hint submitToken={this.submitToken} hintNumber={hintNumber} key={idx} hintCount={idx+1} />
    );
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">My Awesome Hint</h1>
        <div className="hints">
          {this.getHints()}
        </div>
      </div>
    );
  }
}

export default App;
