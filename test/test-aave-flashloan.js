const BN = require("bn.js")
const { sendEther, pow } = require("./util")
const { DAI, DAI_WHALE, USDC, USDC_WHALE, USDT, USDT_WHALE } = require("./config")

const IERC20 = artifacts.require("IERC20")
const TestAaveFlashLoan = artifacts.require("TestAaveFlashLoan")

contract("TestAaveFlashLoan", (accounts) => {
  const WHALE = USDC_WHALE  // 
  const TOKEN_BORROW = USDC // token to be borrowed
  const DECIMALS = 6
  const FUND_AMOUNT = pow(10, DECIMALS).mul(new BN(2000)) //fund contract
  const BORROW_AMOUNT = pow(10, DECIMALS).mul(new BN(1000)) //borrow funds

  // Aave lending pool address provider.
  const ADDRESS_PROVIDER = "0x88757f2f99175387ab4c6a4b3067c77a695b0349"

  let testAaveFlashLoan
  let token
  beforeEach(async () => { // before each test
    token = await IERC20.at(TOKEN_BORROW) // usdc token
    testAaveFlashLoan = await TestAaveFlashLoan.new(ADDRESS_PROVIDER) // new flashloan object

    await sendEther(web3, accounts[0], WHALE, 1) // provider, usdc, aave reserve, ECR20

    // send enough token to cover fee
    const bal = await token.balanceOf(WHALE)
    assert(bal.gte(FUND_AMOUNT), "balance < FUND") // gte = greater than or equal to
    await token.transfer(testAaveFlashLoan.address, FUND_AMOUNT, {
      from: WHALE,
    })
  })

  it("flash loan", async () => {
    const tx = await testAaveFlashLoan.testFlashLoan(token.address, BORROW_AMOUNT, {
      from: WHALE,
    })
    for (const log of tx.logs) {
      console.log(log.args.message, log.args.val.toString())
    }
  })
})