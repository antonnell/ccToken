pragma solidity ^0.4.23;

import "./WRC20Basic.sol";
import "./WRC20.sol";


/**
 * @title SafeWRC20
 * @dev Wrappers around WRC20 operations that throw on failure.
 * To use this library you can add a `using SafeWRC20 for WRC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeWRC20 {
  function safeTransfer(WRC20Basic token, address to, uint256 value) internal {
    require(token.transfer(to, value));
  }

  function safeTransferFrom(
    WRC20 token,
    address from,
    address to,
    uint256 value
  )
    internal
  {
    require(token.transferFrom(from, to, value));
  }

  function safeApprove(WRC20 token, address spender, uint256 value) internal {
    require(token.approve(spender, value));
  }
}
