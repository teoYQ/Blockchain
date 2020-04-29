const Will_maker = artifacts.require("Will_maker");

require("chai").use(require("chai-as-promised")).should()
var Web3 = require("web3")
var web3 = new Web3('http://localhost:8545');
var BN = web3.utils.BN;
const truffleAssert = require('truffle-assertions');
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
            const secret = "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],secret,{value : (web3.utils.toWei("3","ether"))})
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
            const secret = "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],secret,{value : (web3.utils.toWei("3","ether"))})
            var inherit = await will_maker.get_inheritance(accounts[0],{from:accounts[1]})
            console.log(inherit.toString(10))
            assert.equal(inherit.toString(10),web3.utils.toWei("1","ether"))
        })
    })

    describe("claim inheritance",async()=>{
        it("returns correct amount",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            console.log(will_maker.address)
            const bal_bef = await web3.eth.getBalance(will_maker.address);
            const secret = "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],secret,{value : (web3.utils.toWei("3","ether"))})
            await will_maker.claim_money(accounts[0],{from:accounts[1]})
            const bal_aft = await web3.eth.getBalance(will_maker.address);
            assert.isAbove(parseInt(bal_aft,10),parseInt(bal_bef,10),"did not get money")
        })
    })

    describe("claim inheritance with password",async()=>{
        it("returns correct amount",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            console.log(will_maker.address)
            const bal_bef = await web3.eth.getBalance(will_maker.address);
            const secret = await will_maker.gethash(21)
            console.log(secret)
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],secret,{value : (web3.utils.toWei("3","ether"))})
            await will_maker.claim_money_pass(accounts[0],21,{from:accounts[1]})
            
            const bal_aft = await web3.eth.getBalance(will_maker.address);
            assert.isAbove(parseInt(bal_aft,10),parseInt(bal_bef,10),"did not get money")
        })
    })
    describe("cannot claim inheritance with invalid password",async()=>{
        it("returns error",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            console.log(will_maker.address)
            const bal_bef = await web3.eth.getBalance(will_maker.address);
            const secret = await will_maker.gethash(21)
            console.log(secret)
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],secret,{value : (web3.utils.toWei("3","ether"))})
            await truffleAssert.reverts(will_maker.claim_money_pass(accounts[0],20,{from:accounts[1]}))
            //expect(function(){(will_maker.claim_money_pass(accounts[0],20,{from:accounts[1]}))}.to.throw())
            
        })
    })

    describe("add_beneficiaries",async()=>{
        it("successfully creates a will",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            const secret = "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],secret,{value : (web3.utils.toWei("3","ether"))})
            await will_maker.add_beneficiaries([accounts[3],accounts[4]],[3,4])
            var beneficiaries = await will_maker.get_beneficiaries()
            console.log(beneficiaries)
            
            for (var i=0; i<beneficiaries.length;i++){
                assert.equal(beneficiaries[i],accounts[i+1])
            }

        })
    });

    describe("remove_beneficiaries",async()=>{
        it("successfully deletes a beneficiary from will",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            const secret = "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],secret,{value : (web3.utils.toWei("3","ether"))})
            await will_maker.remove_beneficiary(account_two)
            var bal_of_removed = await will_maker.get_inheritance(accounts[0],{from:accounts[2]})
            assert.equal(0,bal_of_removed)

        })
    });
    describe("check expiry",async()=>{
        it("extends and executes",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            console.log(will_maker.address)
            const bal_bef = await web3.eth.getBalance(will_maker.address);
            const secret = "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],secret,{value : (web3.utils.toWei("3","ether"))})
            var  expiry_start = await will_maker.wills(accounts[0]);
            var bn = await web3.eth.getBlockNumber()
            console.log(bn)
            console.log(expiry_start["expiry"].toString(10))
            assert.equal(expiry_start["expiry"].toString(10),bn)
            await will_maker.still_alive({from: accounts[0]})
            expiry_extennd = await will_maker.wills(accounts[0]);
            console.log(parseInt(expiry_extennd["expiry"].toString(10)))
            assert.isAbove(parseInt(expiry_extennd["expiry"].toString(10)),parseInt(expiry_start["expiry"].toString(10)))
            await will_maker.execute(accounts[0],{from:accounts[1]})
            const new_expiry = await will_maker.wills(accounts[0]);
            bn = await web3.eth.getBlockNumber()
            assert.equal(new_expiry["expiry"].toString(10),bn)
        })
    })



})

