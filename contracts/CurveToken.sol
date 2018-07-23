pragma solidity ^0.4.21;


import "./zeppelin-solidity/math/SafeMath.sol";
import "./zeppelin-solidity/ownership/Ownable.sol";
import "./zeppelin-solidity/token/WRC20/WRC20Basic.sol";
import "./zeppelin-solidity/token/WRC20/BasicToken.sol";
import "./zeppelin-solidity/token/WRC20/PausableToken.sol";
import "./zeppelin-solidity/token/WRC20/BurnableToken.sol";
import "./zeppelin-solidity/token/WRC20/MintableToken.sol";
import "./templates/StakedToken.sol";
import "./templates/CrossChainToken.sol";
import "./templates/NotifyContract.sol";

/**
 * @title CurveToken
 * Ownable
 * Pausable
 * Burnable
 * Mintable
 * Stakeable
 * CrossChainable
 */
contract CurveToken is WRC20Basic, BasicToken, Ownable, PausableToken, BurnableToken, MintableToken, StakedToken, CrossChainToken {
    using SafeMath for uint256;

    string public constant name = "Curve";
    string public constant symbol = "CRV";
    uint8 public constant decimals = 18;

    // Lightweight implementation of WRC820 for basic third party contract interaction
    function transferAndNotify(address _to, uint256 _amount, bytes _data) public returns (bool) {
        require(super.transfer(_to, _amount));
        require(NotifyContract(_to).notify(msg.sender, _amount, _data));
    }
}
