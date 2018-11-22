import React, { Component } from 'react';
import axios from 'axios';
import Breached from './breached.jsx';
import './App.css';
import { Button } from 'reactstrap'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      info: [],
      clicked: false,
    }
  }


  handleInput = (e) => {
    this.setState({ email: e.target.value })
  }

  handleSubmit = (email) => {
    this.setState({ info: [], clicked: true })
    axios.get("https://haveibeenpwned.com/api/breachedaccount/" + email)
      .then(res => {
        const site = res.data
        const allInfo = this.state.info
        for (let i = 0; i < site.length; i++) {
          axios.get("https://haveibeenpwned.com/api/v2/breach/" + site[i])
            .then(res => {
              const info = res.data
              allInfo.push(info)
              this.setState({ info: allInfo })
            })
        }
      })
  }



  enterPassword = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(this.state.email)
    }
  }

  render() {
    return (
      <body>
        <section className="input">
        <h1>
          Entre ton adresse mail 
        </h1>
          <input className="emailinput" value={this.state.email} onChange={this.handleInput} onKeyPress={this.enterPassword} placeholder="Email"></input>
          <Button onClick={() => this.handleSubmit(this.state.email)}>Submit</Button>
        </section>
        {this.state.info.length >0  ? 
        <div className="pwned"><h2>Saperlipopette!!</h2><h4>Tes infos ont été compromises sur {this.state.info.length} site{this.state.info.length > 1 ? "s" : ""} piraté{this.state.info.length > 1 ? "s" : ""}.<br></br>
        Va changer ton mot de passe</h4></div>
         : this.state.clicked ? <h2 className="pwned bien">Tout va bien</h2> : ""}
        <div className="list">

          {this.state.info.map(site => <ul><Breached site={site} /></ul>)}


        </div>
      </body >
    );
  }
}

export default App;
