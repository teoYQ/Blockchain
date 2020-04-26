import React, { Component } from 'react';
import {Button, ButtonGroup } from "@material-ui/core";
import Web3 from 'web3';
class Claim extends Component {
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
             <h1> HI </h1>
      )
    }
  }

export default Claim