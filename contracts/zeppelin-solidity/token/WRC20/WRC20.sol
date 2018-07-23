pragma solidity ^0.4.23;

import "./WRC20Basic.sol";


/**
 * @title WRC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract WRC20 is WRC20Basic {
  function allowance(address owner, address spender)
    public view returns (uint256);

  function transferFrom(address from, address to, uint256 value)
    public returns (bool);

  function approve(address spender, uint256 value) public returns (bool);
  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}
