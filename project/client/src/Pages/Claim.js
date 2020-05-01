import React, { Component } from 'react';
//import { Button, ButtonGroup, TextField, Input } from "@material-ui/core";
//import { Form, Row, Col, Alert } from "react-bootstrap"
import Web3 from 'web3';
import Will_maker from "../artifacts/Will_maker.json"
//import contract from "truffle-contract"
class Claim extends Component {
    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        console.log(this.state.account)
        const abi = Will_maker.abi
        const address = Will_maker.networks["5777"].address
        console.log(address)
        const will_maker = new web3.eth.Contract(abi,address)
        this.setState({contract_addr: address})
       //const will_maker = await _will_maker.methods.deployed()
        console.log(will_maker)
        this.setState({will_maker})
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

    constructor(props) {
        super(props)
        this.state = {
            account: "",
            inheritant:0,
            pass:0
        }
        this.handle3 = this.handle3.bind(this);
    }
    
    handle3= async(event) =>{
        event.preventDefault()
        console.log(this.state.inheritant)
        var owner = await this.state.will_maker.methods.claim_money(this.state.inheritant).send({from:this.state.account})
        console.log("done")
    }
    handle2= async(event) =>{
      event.preventDefault()
      console.log(this.state.inheritant)
      console.log(this.state.pass)
      console.log(this.state.account)
      var xsx = await this.state.will_maker.methods.claim_money_pass(this.state.inheritant,this.state.pass).send({from:this.state.account})
      console.log(xsx)
  }
    render() {
        
        var left = 30 + 'vw';
        var top = 10 + 'vw';
        var padding = 10 + 'vw';
        return (
            <div style={{padding:padding, left: left, top:top}}>
            <h3>Claim a Will</h3>
            
            
            <br></br>
            <form onSubmit = {this.handle3}>
            <p>Enter the your owner's address</p>
                <input type = "text" placeholder="Address" name="inheritant" onChange={(e)=> this.setState({inheritant:e.target.value})}></input>
                <br></br>
                <button>Claim Will</button>
            </form>
            <br></br>
            <form onSubmit = {this.handle2}>
              
            <p>Enter the your owner's address</p>
                <input type = "text" placeholder="Address" name="inheritant" onChange={(e)=> this.setState({inheritant:e.target.value})}></input>
                <input type = "text" placeholder="pass" name="pass" onChange={(e)=> this.setState({pass:e.target.value})}></input>
                <br></br>
                <button>Claim Will</button>
            </form>
           </div>
        )
    }
}

export default Claim