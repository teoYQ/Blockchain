const Will_maker = artifacts.require("Will_maker");

require("chai").use(require("chai-as-promised")).should()
var Web3 = require("web3")
var web3 = new Web3('http://localhost:8545');
var BN = web3.utils.BN;
contract("Will_maker",(accounts)=> {
    
    
    let will_maker;
    before(async()=>{
        will_maker = await Will_maker.new()
    })
    describe("Will_maker deploy",async ()=>{
        it("contract deployed",async()=>{
            const deployed = await will_maker.deployed()
            assert.equal(deployed,1)
            
        })
    })
    describe("create a will / get beneficiaries / unlock pass",async()=>{
        it("successfully creates a will",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],5,{value : (web3.utils.toWei("3","ether"))})
            var beneficiaries = await will_maker.get_beneficiaries()
            console.log(beneficiaries)
            console.log([account_one,account_two])
            for (var i=0; i<2;i++){
                assert.equal(beneficiaries[i],accounts[i+1])
            }

        })
    });

    describe("correct inheritance",async()=>{
        it("get correct money",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],5,{value : (web3.utils.toWei("3","ether"))})
            var inherit = await will_maker.get_inheritance(accounts[0],{from:accounts[1]})
            assert.equal(inherit,1)
        })
    })

    describe("claim inheritance",async()=>{
        it("returns correct amount",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            console.log(will_maker.address)
            const bal_bef = await web3.eth.getBalance(will_maker.address);
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],5,{value : (web3.utils.toWei("3","ether"))})
            await will_maker.claim_money(accounts[0],{from:accounts[1]})
            const bal_aft = await web3.eth.getBalance(will_maker.address);
            assert.isAbove(parseInt(bal_aft,10),parseInt(bal_bef,10),"did not get money")
        })
    })

    describe("add_beneficiaries",async()=>{
        it("successfully creates a will",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],5,{value : (web3.utils.toWei("3","ether"))})
            await will_maker.add_beneficiaries([accounts[3],accounts[4]],[3,4])
            var beneficiaries = await will_maker.get_beneficiaries()
            console.log(beneficiaries)
            
            for (var i=0; i<beneficiaries.length;i++){
                assert.equal(beneficiaries[i],accounts[i+1])
            }

        })
    });


})

