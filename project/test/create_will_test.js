const Will_maker = artifacts.require("Will_maker");

require("chai").use(require("chai-as-promised")).should()

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
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],5)
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
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],5)
            var inherit = await will_maker.get_inheritance(accounts[0],{from:accounts[1]})
            assert(inherit,1)
        })
    })

    describe("add_beneficiaries",async()=>{
        it("successfully creates a will",async()=>{
            const account_one = accounts[1];
            const account_two = accounts[2];
            
            await will_maker.create_will(account_one,[account_one,account_two],[1,2],5)
            await will_maker.add_beneficiaries([accounts[3],accounts[4]],[3,4])
            var beneficiaries = await will_maker.get_beneficiaries()
            console.log(beneficiaries)
            
            for (var i=0; i<beneficiaries.length;i++){
                assert.equal(beneficiaries[i],accounts[i+1])
            }

        })
    });


})

