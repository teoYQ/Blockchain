import React, { Component } from 'react';
import { Button, ButtonGroup, TextField, Input } from "@material-ui/core";
import { Form, Row, Col, Alert } from "react-bootstrap"
import Web3 from 'web3';
import Will_maker from "../artifacts/Will_maker.json"
import contract from "truffle-contract"
class Create extends Component {
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
            beneficiaries: [],
            values: [],
            bene: "0",
            value: 0,
            executor: 0,
            secret:0,
            value_t:0,
            contract_addr:0,
            inheritant:0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSecondForm = this.handleSecondForm.bind(this);
        this.handle3 = this.handle3.bind(this);
    }
    
    handleSubmit= (event)=>{
        event.preventDefault()
        console.log(event.target.value)
        this.state.beneficiaries.push(this.state.bene)
        this.state.values.push(this.state.value)
        console.log(this.state)
        console.log(this.state.beneficiaries)
    }
    handleSecondForm=async(event)=>{
        event.preventDefault()
        console.log(event.target.inheritance.value)
        //this.setState({executor: event.target.Executor})
        //this.setState({secret: event.target.secret})
        //this.setState({value_t: event.target.inheritance})
        var total = 0
        for (var i=0; i<this.state.values.length;i++){
            total+=this.state.values[i]
        }
        console.log(this.state)
        console.log(this.state.executor)
        //await window.web3.eth.sendTransaction({from:this.state.account,to:this.state.contract_addr, value: window.web3.utils.toWei("1","ether")})
        const res = await this.state.will_maker.methods.create_will(this.state.executor,[...this.state.beneficiaries],[...this.state.values],this.state.secret.toString).send({from:this.state.account,value:window.web3.utils.toWei(total.toString(),"ether")})
        var beneficiaries = await this.state.will_maker.methods.get_beneficiaries().call()
        console.log(beneficiaries[0])
        console.log(res)
    }
    handle3= async(event) =>{
        event.preventDefault()
        console.log(this.state.inheritant)
        var owner = await this.state.will_maker.methods.gethash(this.state.inheritant).call()
        console.log(owner)
        this.setState({inheritant:owner})
    }
    render() {
        const benef = this.state.beneficiaries.map(function(ben){
            return <li>{ben}</li>
        })
        var left = 30 + 'vw';
        var top = 10 + 'vw';
        var padding = 10 + 'vw';
        return (
            <div style={{padding:padding, left: left, top:top}}>
            <h3>Create a Will</h3>
            
            <form onSubmit={this.handleSubmit}>
                <p>Enter the address of beneficiary and his inheritance</p>
                <input type= "text" placeholder="Address" name="Address" onChange={(e)=> this.setState({bene:e.target.value})}></input>
                <input type= "text" placeholder="Value" name="Value" onChange={(e)=> this.setState({value:e.target.value})}></input>
                <br></br>
                <br></br>
                <button>Add beneficiaries</button>
            </form>
        <div>{benef}</div>
            <br></br>
            <form onSubmit={this.handleSecondForm}>
                <p>Enter the executor's address</p>
                <input type = "text" placeholder="Executor" name="Executor" onChange={(e)=> this.setState({executor:e.target.value})}></input>
                <br></br>
                <p>Enter the will's value</p>
                <input type = "text" placeholder="inheritance" name="inheritance" onChange={(e)=> this.setState({value_t:e.target.value})}></input>

                <p>Enter the will's secret</p>
                <input type = "text" placeholder="Secret" value={this.state.inheritant} name="Secret"onChange={(e)=> this.setState({secret:e.target.value})}></input>
                
                <br></br>
                <br></br>
                <button>Create Will</button>
            </form>
            <br></br>
            <form onSubmit = {this.handle3}>
            <p>Helper hash converter</p>
                <input type = "text" placeholder="Enter something to hash here" name="inheritant" onChange={(e)=> this.setState({inheritant:e.target.value})}></input>
                <br></br>
                
                <button>Generate Hash</button>
            </form>
           </div>
        )
    }
}

export default Create