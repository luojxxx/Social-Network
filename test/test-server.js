var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var mongoose = require('mongoose');
var User = require('../models/user');

chai.use(chaiHttp);

// beforeEach(function(done) {
//   mongoose.connect('mongodb://127.0.0.1:27017', done)
// })

// // User.create({googleId: 12345, token: 'abc123'})

// describe('Blobs', function() {
//   it('should list ALL blobs on /blobs GET', function(done){
//     chai.request(server)
//       .get('/api/recommendations/0')
//       .end(function(err,res){
//         console.log(res.body)
//         done()
//       })
//   });
//   // it('should list a SINGLE blob on /blob/<id> GET');
//   // it('should add a SINGLE blob on /blobs POST');
//   // it('should update a SINGLE blob on /blob/<id> PUT');
//   // it('should delete a SINGLE blob on /blob/<id> DELETE');
// });