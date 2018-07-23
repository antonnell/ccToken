var Token = artifacts.require('CurveToken');

contract('curvetoken', function(accounts) {
  it("should assert true", function() {
    var token;
    return Token.deployed()
      .then(function(instance){
       token = instance;
       return token.totalSupply.call();
      }).then(function(result){
       assert.equal(result.toNumber(), 0, 'total supply is wrong');
      })
  });

  it('should return the balance of token owner', function() {
    var token;
    return Token.deployed()
      .then(function(instance){
       token = instance;
       return token.balanceOf.call(accounts[0]);
      }).then(function(result){
       assert.equal(result.toNumber(), 0, 'balance is wrong');
      })
  })

  it('should mint tokens for the owner', function() {
    var token;
    return Token.deployed()
      .then(function(instance){
        token = instance;
        return token.mint(accounts[0], 1000000);
      })
      .then(function(result){
        return token.balanceOf.call(accounts[0]);
      })
      .then(function(result){
        assert.equal(result.toNumber(), 1000000, 'balance is wrong');
      })
  })

  it('is the owner', function() {
    var token;
    return Token.deployed()
      .then(function(instance){
        token = instance;
        return token.owner();
      })
      .then(function(result){
        assert.equal(result, accounts[0], 'accounts[0] should be the owner');
      })
  })

  it('is not the owner', function() {
    var token;
    return Token.deployed()
      .then(function(instance){
        token = instance;
        return token.owner();
      })
      .then(function(result){
        assert.notEqual(result, accounts[1], 'accounts[0] should be the owner');
      })
  })

  it("should transfer the tokens to another user and the balance should be transferred", function() {
    var token;

    return Token.deployed()
      .then(function(instance){
        token = instance;
        return token.transfer(accounts[1], 500000);
      }).then(function(){
        return token.balanceOf.call(accounts[0]);
      }).then(function(result){
        assert.equal(result.toNumber(), 500000, 'accounts[0] balance is wrong');
        return token.balanceOf.call(accounts[1]);
      }).then(function(result){
        assert.equal(result.toNumber(), 500000, 'accounts[1] balance is wrong');
      })
  });

  it("should transfer stake the tokens and the balance should be transferred to stake", function() {
    var token;

    return Token.deployed()
      .then(function(instance){
        token = instance;
        return token.stake(250000);
      }).then(function(){
        return token.balanceOf.call(accounts[0]);
      }).then(function(result){
        assert.equal(result.toNumber(), 250000, 'accounts[0] balance is wrong');
        return token.stakeOf.call(accounts[0]);
      }).then(function(result){
        assert.equal(result.toNumber(), 250000, 'accounts[0] stake is wrong');
      })
  });
});
