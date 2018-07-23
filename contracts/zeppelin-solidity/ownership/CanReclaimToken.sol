pragma solidity ^0.4.23;

import "./Ownable.sol";
import "../token/WRC20/WRC20Basic.sol";
import "../token/WRC20/SafeWRC20.sol";


/**
 * @title Contracts that should be able to recover tokens
 * @author SylTi
 * @dev This allow a contract to recover any WRC20 token received in a contract by transferring the balance to the contract owner.
 * This will prevent any accidental loss of tokens.
 */
contract CanReclaimToken is Ownable {
  using SafeWRC20 for WRC20Basic;

  /**
   * @dev Reclaim all WRC20Basic compatible tokens
   * @param token WRC20Basic The address of the token contract
   */
  function reclaimToken(WRC20Basic token) external onlyOwner {
    uint256 balance = token.balanceOf(this);
    token.safeTransfer(owner, balance);
  }

}
