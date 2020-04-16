import React, { Component } from 'react';
import Web3 from 'web3';
import { Button, ButtonGroup } from "@material-ui/core";

class App extends Component {


  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert("use chrome or firefox")
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
  }
  routeChange=()=>{
    let path = ""
  }
  render() {
    return (
      <div id="body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:"100vh" }} >
        
        <div><h1 > Welcome to etherwill
           </h1></div>
        <br></br>
        <div><ButtonGroup variant="text" aria-label="text primary button group">
            <Button>Create a will</Button>
            <Button>Claim Inheritance</Button>
          </ButtonGroup></div>
        </div>

    )
  }
}


export default App;
