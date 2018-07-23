pragma solidity ^0.4.21;

import "../zeppelin-solidity/token/WRC20/BasicToken.sol";
import "../zeppelin-solidity/token/WRC20/MintableToken.sol";

/**
 * @title CrossChain Token
 * @dev Token that can be decreased on this chain to be incremented on another chain
 * @dev The CrossChain Transfer event will be used as input for the other chain
 */
contract CrossChainToken is BasicToken, MintableToken {

    event CrossChainTransfer(address indexed from, address indexed to, uint256 value);
    event CrossChainReceive(address indexed from, address indexed to, uint256 value);
    /**
     * @dev Crosschain transfer a specific amount of tokens.
     * @param _value The amount of token to be transfered.
     */
    function crossChainTransfer(address _to, uint256 _value) public {
        _crossChainTransfer(msg.sender, _to, _value);
    }
    /**
     * @dev Crosschain receive a specific amount of tokens.
     * @param _value The amount of token to be introduced to this chain.
     */
    function crossChainReceive(address _from, address _to, uint256 _value) public {
        _crossChainReceive(_from, _to, _value);
    }

    function _crossChainTransfer(address _from, address _to, uint256 _value) internal {
        require(_value <= balances[_from]);
        balances[_from] = balances[_from].sub(_value);
        totalSupply_ = totalSupply_.sub(_value);
        emit CrossChainTransfer(_from, _to, _value);
        emit Transfer(_from, address(0), _value);
    }

    function _crossChainReceive(address _from, address _to, uint256 _value) internal {
        mint(_to, _value);
        emit CrossChainReceive(_from, _to, _value);
    }
}
