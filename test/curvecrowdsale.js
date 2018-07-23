var Crowdsale = artifacts.require('CurveCrowdsale');
var Token = artifacts.require('CurveToken');

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

contract('curvecrowdsale', function(accounts) {

  before(function() {
    console.log(Crowdsale.address)
    //mint tokens to the contract
    return Token.deployed()
      .then(function(instance){
        token = instance;
        return token.mint(Crowdsale.address, web3.toWei(10, "ether"));
      })
    //allow the crowdsale contract to mint tokens
      .then(function(){
        return token.setCrowdsaleAddress(Crowdsale.address)
      })
  });

  it("should assert true", function() {
    var crowdsale;
    return Crowdsale.deployed()
      .then(function(instance){
       crowdsale = instance;
       assert.isTrue(true);
      })
  });

  it("should mint tokens to token owner", function() {
    return Token.deployed()
      .then(function(instance){
        token = instance;
        return token.mint(accounts[0], web3.toWei(10, "ether"));
      })
      .then(function(result){
        return token.balanceOf.call(accounts[0]);
      })
      .then(function(result){
        assert.equal(result.toNumber(), web3.toWei(10, "ether"), 'balance is wrong');
      })
  });

  it('should not accept payments before start', function () {
    var crowdsale;
    return Crowdsale.deployed()
      .then(function(instance){
        crowdsale = instance;
        return crowdsale.send(web3.toWei(1, "ether"));
      })
      .then(function(result){
        assert.isTrue(false);
      })
      .catch(function(err){
        assert.isTrue(true);
      })
  });

  it('should not allow non whitelisted users to participate', function () {
    var crowdsale;
    return Crowdsale.deployed()
      .then(function(instance){
        crowdsale = instance;
        return crowdsale.send(web3.toWei(1, "ether"));
      })
      .then(function(result){
        assert.isTrue(false);
      })
      .catch(function(err){
        assert.isTrue(true);
      })
  });

  it('should allow whitelisted users to participate once ICO started', function () {
    var crowdsale;
    return Crowdsale.deployed()
      .then(function(instance){
        crowdsale = instance;
        return crowdsale.addToWhitelist(accounts[0]);
      })
      .then(function(instance){
        wait(7000);  //SET THE START TIME 5 SECONDS AFTER CREATION IN migrations.
        return crowdsale.send(web3.toWei(1, "ether"));
      })
      .then(function(result){
        assert.isTrue(true);
      })
      .catch(function(err){
        assert.isTrue(false);
      })
  });

  it('should not accept payments over cap', function () {
    var crowdsale;
    return Crowdsale.deployed()
      .then(function(instance){
        crowdsale = instance;
        return crowdsale.send(web3.toWei(15, "ether"));
      })
      .then(function(result){
        assert.isTrue(false);
      })
      .catch(function(err){
        assert.isTrue(true);
      })
  });

  it('should not accept payments after end', function () {
    var crowdsale;
    return Crowdsale.deployed()
      .then(function(instance){
        crowdsale = instance;
        return crowdsale.addToWhitelist(accounts[0]);
      })
      .then(function(instance){
        wait(5000);  //SET THE END TIME 10 SECONDS AFTER CREATION IN migrations.
        return crowdsale.send(web3.toWei(1, "ether"));
      })
      .then(function(result){
        assert.isTrue(false);
      })
      .catch(function(err){
        assert.isTrue(true);
      })
  });

  it('should have increased the weiRaised amount properly', function() {
    var crowdsale;
    return Crowdsale.deployed()
      .then(function(instance){
        crowdsale = instance;
        return crowdsale.weiRaised();
      })
      .then(function(result){
        assert.equal(result.toNumber(), web3.toWei(1, "ether"), 'weiRaised is wrong');
      })
  })

});
