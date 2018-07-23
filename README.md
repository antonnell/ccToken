# CryptoCurve Smart Contracts

1) The basic WRC20 CURVEToken.
```
  Ownable
  Pausable
  Burnable
  Mintable
  Stakeable
  CrossChainable
  NotifyContract
```

2) CryptoCurve ICO Crowdsale smart contract.
```
  TimedCrowdsale, MintedCrowdsale, WhitelistedCrowdsale
```

## Getting Started

Install the following in order to compile/run the smart contracts
```
node
truffle
```

## Deployment


Set the constant variables in /migrations/2_deploy_contracts.js
```
  const c = {
    _openingTime: '', //Start time of the crowdsale (unix timestamp)
    _closingTime: '', //End time of the crowdsale (unix timestamp)
    _rate: '',        //number of token unites the buyer gets per wei
    _wallet: '',      //wallet that the funds will be deposited to
    _token: ''        //address of the token being sold
  }
```

Update truffle.js to the environment details that you would like to compile to

```
truffle migrate {environment}
```

## Built With

* [OpenZellepin-solidity](https://github.com/OpenZeppelin/openzeppelin-solidity) - Secure Smart Contract framework - partially ported to WRC20 instead of ERC20
