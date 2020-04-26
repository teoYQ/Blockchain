import React, { Component } from 'react';
import {Button, ButtonGroup } from "@material-ui/core";
import {Link} from "react-router-dom";
import Web3 from 'web3';
class Home extends Component {
  
  async loadBlockchainData(){
    const web3 =  window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    console.log(this.state.account)
  }
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
    await this.loadBlockchainData()
  }

  constructor(props){
    super(props)
    this.state = {
      account:""
    } 
  }

  render() {
    return (
      <div id="body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:"100vh" }} >
        
      <div><h1 > Welcome to etherwill
         </h1></div>
      <br></br>
      <div><ButtonGroup variant="text" aria-label="text primary button group">
          <Link to="/create" style={{ textDecoration: 'none' }}><Button>Create a will</Button></Link>
          <Link to="/claim" style={{ textDecoration: 'none' }}><Button>Claim Inheritance</Button></Link>
        </ButtonGroup></div>
      </div>
    )
  }
}


export default Home