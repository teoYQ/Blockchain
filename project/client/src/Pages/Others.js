import React, { Component } from 'react';
//import { Button, ButtonGroup, TextField, Input } from "@material-ui/core";
//import { Form, Row, Col, Alert } from "react-bootstrap"
import Web3 from 'web3';
import Will_maker from "../artifacts/Will_maker.json"
import { keys } from '@material-ui/core/styles/createBreakpoints';
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
        const will_maker = new web3.eth.Contract(abi, address)
        this.setState({ contract_addr: address })
        //const will_maker = await _will_maker.methods.deployed()
        console.log(will_maker)
        this.setState({ will_maker })
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
            owner: 0,
            inheritant: 0,
            value: 0,
            open:false,
            to_remove: 0
        }
        this.handle3 = this.handle3.bind(this);
    }
    triggerAddTripState = () => {
        this.setState({
          ...this.state,
          isEmptyState: false,
          isAddTripState: true
        })}
    handle1 = async (event) => {
        event.preventDefault()
        console.log(this.state.owner)
        var owner = await this.state.will_maker.methods.execute(this.state.owner).send({ from: this.state.account })
        var dead = await this.state.will_maker.methods.wills(this.state.owner).call()
        console.log(dead["expiry"])
        alert("expiry set to block "+ dead["expiry"] + ", which is the current block, will is unlocked now")
    }
    handle2 = async (event) => {
        event.preventDefault()
        var owner = await this.state.will_maker.methods.still_alive().send({ from: this.state.account })
        var dead = await this.state.will_maker.methods.wills(this.state.account).call()
        console.log(dead)
        alert("expiry extended by 1, new expiry is " + (dead["expiry"]).toString())
    }
    handle3 = async (event) => {
        event.preventDefault()
        //var dead = await this.state.will_maker.methods.wills(this.state.account).call()
        var dead = await this.state.will_maker.methods.remove_beneficiary(this.state.to_remove).send({from: this.state.account})
        var beneficiaries = await this.state.will_maker.methods.get_beneficiaries().call()
        console.log(beneficiaries)
        alert(beneficiaries)
    }
    render() {

        var left = 30 + 'vw';
        var top = 10 + 'vw';
        var padding = 10 + 'vw';
        let will;
        if (this.state.open) {
            will = <div><p></p></div>
        }
        return (
            <div style={{ padding: padding, left: left, top: top }}>
                <h3>Additional functionalities</h3>


                <br></br>
                <form onSubmit={this.handle1}>
                    <p>Execute the will</p>
                    <input type="text" placeholder="owner" name="owner" onChange={(e) => this.setState({ owner: e.target.value })}></input>
                    <br></br>
                    <button>Execute</button>
                </form>
                <br></br>
                <form onSubmit={this.handle2}>
                    <p>Extend Will <p>Not dying soon? Click below</p></p>
                    <button>Extend Will</button>
                </form>
                <br></br>
                <form onSubmit={this.handle3}>
                    <p>Remove beneficiary</p>
                    <input type="text" placeholder="Address to remove" name="toremove" onChange={(e) => this.setState({ to_remove: e.target.value })}></input>
                    <br></br>
                    <button>Remove!</button>
                </form>



                
                

            </div>
        )
    }
}

export default Claim