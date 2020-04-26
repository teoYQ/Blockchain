import React, { Component } from 'react';
import { Button, ButtonGroup, TextField, Input } from "@material-ui/core";
import { Form, Row, Col, Alert } from "react-bootstrap"
import Web3 from 'web3';

class Create extends Component {
    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        console.log(this.state.account)
        
        console.log(this.state.bene)
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
            value: 0

        }
    }
    handleAddr=(event)=>{
        console.log(event.target.value)
        console.log(this.state)
        this.setState({bene:event.target.value})
        //this.state.beneficiaries.push(this.state.bene)
        console.log(this.state.beneficiaries)
    }
    handleVal=(event)=>{
        console.log(event.target.value)
        console.log(this.state)
        this.setState({value:event.target.value})
        //this.state.beneficiaries.push(this.state.bene)
        console.log(this.state.beneficiaries)
    }
    handleSubmit= (event)=>{
        event.preventDefault()
        console.log(event.target.value)
        this.state.beneficiaries.push(this.state.bene)
        this.state.values.push(this.state.value)
        console.log(this.state)
        console.log(this.state.beneficiaries)
        

    }
    render() {
        return (
            <div>
            <h3>Create a Will</h3>
            
            <form onSubmit={this.handleSubmit}>
                <p>Enter the address of beneficiary and his inheritance</p>
                <input type= "text" placeholder="Address" name="Address" onChange={this.handleAddr}></input>
                <input type= "text" placeholder="Value" name="Value" onChange={this.handleVal}></input>
                <br></br>
                <br></br>
                <button>Add beneficiaries</button>
            </form>
            <i>{this.state.beneficiaries.toString}</i>
            <br></br>
            <form onSubmit={this.handleCreate}>
                <p>Enter the executor's address</p>
                <input type = "text" placeholder="Executor" name="Executor"></input>
                <br></br>
                <p>Enter the will's value</p>
                <input type = "text" placeholder="inheritance" name="inheritance"></input>

                <p>Enter the will's secret</p>
                <input type = "text" placeholder="Secret" name="Secret"></input>
                
                <br></br>
                <br></br>
                <button>Create Will</button>
            </form>
          
           </div>
        )
    }
}

export default Create