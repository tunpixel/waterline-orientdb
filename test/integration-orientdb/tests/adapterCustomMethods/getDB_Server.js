var assert = require('assert'),
    _ = require('lodash');

describe('Adapter Custom Methods', function() {

  describe('getDB', function() {
    
    /////////////////////////////////////////////////////
    // TEST SETUP
    ////////////////////////////////////////////////////
    
    var user;
    
    before(function(done) {
      Associations.Friend.create({ name: 'friend getDB' }, function(err, createdUser) {
        if(err) return done(err);
        
        user = createdUser;
        done();
      });
    });
    
    after(function(done) {
      Associations.Friend.destroy(user.id, done);
    });
    
    
    describe('query user', function() {
      
      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////
      
      it('should return user', function(done) {
        Associations.Friend.getDB(function(db){
          db.select().from('friendTable').where({name: 'friend getDB'}).one()
            .then(function(retrievedUser){
              assert.equal(retrievedUser['@rid'].toString(), user.id);
              done();
            })
            .catch(done);          
        });
      });
      
    });
    
  });
  
  
  describe('getServer', function() {
    describe('list databases', function() {
      
      /////////////////////////////////////////////////////
      // TEST METHODS
      ////////////////////////////////////////////////////
      
      it('should return more than 0 dbs', function(done) {
        Associations.Friend.getServer(function(server){
          server.list()
            .then(function (dbs) {
              assert(dbs.length >= 1);
              done();
            })
            .catch(done);
        });
      });
    });
  });
});