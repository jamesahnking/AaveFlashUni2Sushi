// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
/*
 // This function Takes an ERC20 asset as an argument 
  // and its amount of an ERC20 asset
  
  // uint bal  - calculates the deployed contracts balance
  
  // require - requires the current balance of deployed contract to
  // be greater than the amount being requested ensure the Flashloan 
  // premium fee can be paid at the end of the transaction 
  
  // address receiver - sets the receiver address to the address that will 
  // receive the funds 

  // * asset and amounts are synced according to their position in the array
 
  // address[] memory assets - adds the desired asset to the asset array, 
  // assets[0] sets the asset to the first position in the array 

  // address[] memory amounts - sets the amount of the asset 
  // amounts[0] sets the amount to the first position in the array 
  // and is now synced to the first asset

  // address[] memory modes - defines what loan type to execute
  // 0 = no debt(pay all thats been loaned), 1 = stable, 2 = variable
   
  // address[] memory onBehalfOf - what address receives the loan
  // when the assicated mode is 0
  
  // uint16 referralCode - 0 means no referral 

*/ 
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/aave/FlashLoanReceiverBase.sol";

contract FlashLoan is FlashLoanReceiverBase {
  using SafeMath for uint;

  event Log(string message, uint val);
 
  constructor(ILendingPoolAddressesProvider _addressProvider)
    
    FlashLoanReceiverBase(_addressProvider)
  {}

  function flashLoanTest(address asset, uint amount) external {
    uint bal = IERC20(asset).balanceOf(address(this));
    require(bal > amount, "bal <= amount");

    address receiver = address(this);

    address[] memory assets = new address[](1);
    assets[0] = asset;

    uint[] memory amounts = new uint[](1);
    amounts[0] = amount;

    // 0 = no debt, 1 = stable, 2 = variable
    // 0 = pay all loaned
    uint[] memory modes = new uint[](1);
    modes[0] = 0;

    address onBehalfOf = address(this);

    bytes memory params = ""; // extra data to pass abi.encode(...)
    uint16 referralCode = 0;

    LENDING_POOL.flashLoan(
      receiver,
      assets,
      amounts,
      modes,
      onBehalfOf,
      params,
      referralCode
    );
  }
    // This function is called by the AAVE protocol
    // on behalf of the 'Flashloan' function
    // It sends us the tokens we are going to borrow
    // Custom logic for strategies is written in this block
    // Fee calculation and reimbursement to the Lending pool 
    // is also handled in this block
/**
    * @dev This function must be called only be the LENDING_POOL and takes care of repaying
    * active debt positions, migrating collateral and incurring new V2 debt token debt.
    *
    * @param assets The array of flash loaned assets used to repay debts.
    * @param amounts The array of flash loaned asset amounts used to repay debts.
    * @param premiums The array of fees incurred as additional debts.
    * @param initiator The address that initiated the flash loan, unused.
    * @param params The byte array containing, in this case, the arrays of aTokens and aTokenAmounts.
    */

  function executeOperation(
    address[] calldata assets,
    uint[] calldata amounts,
    uint[] calldata premiums,
    address initiator,
    bytes calldata params
  ) external override returns (bool) {
  //  
    // This contract now has the funds requested.
    // Your logic goes here.
    // do stuff here (arbitrage, liquidation, etc...)
    // abi.decode(params) to decode params
    
    // At the end of your logic above, this contract owes
    // the flashloaned amounts + premiums.
    // Therefore ensure your contract has enough to repay
    // these amounts.    

    for (uint i = 0; i < assets.length; i++) {
      emit Log("borrowed", amounts[i]);
      emit Log("fee", premiums[i]);
      
      // calculate how much you owe then approve and pay back
      // the amount owed to the LENDING_POOL address 
      uint amountOwing = amounts[i].add(premiums[i]);
      IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
    }
    // repay Aave
    return true;
  }
}