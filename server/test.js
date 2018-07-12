const server = require('./server-test.js')

//chai tests
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)






// Register route - successful
describe('POST /users/register - Successful', function () {
    this.timeout(15000)
    it('Should create a new users account and then log the users in', function (done) {
        chai.request(server)
            .post('/users/register')
            // .set('content-type','application/json')
            .send({
                email: 'email@email.com',
                password: 'password'
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.body.should.have.property('token')
                done()
            })
    });
});

// Profile route
describe('GET /users/profile', () => {
    // this.timeout(15000)
    it('should show a users profile page.', (done) => {
        chai.request(server)
            .get('/users/profile')
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.text.should.equal('Anyone can view this page')
                done()
            })
    })
})


// Login route - unsuccessful
describe('POST /users/login - unsuccessful', function () {
    this.timeout(10000)
    it('Should show the users an error message if their credentials are incorrect', function (done) {
        chai.request(server)
            .post('/users/login')
            // .set('content-type','application/json')
            .send({
                email: 'email@email.com',
                password: 'passssword'
            })
            .end((err, res) => {
                should.equal(res.text, 'Unauthorized')
                res.should.have.status(401)
                done()
            })
    });
});

// Login route - successful
describe('POST /users/login - Successful', function () {
    this.timeout(15000)
    it('Should log the users in if their credentials are right', function (done) {
        chai.request(server)
            .post('/users/login')
            // .set('content-type','application/json')
            .send({
                email: 'email@email.com',
                password: 'password'
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.body.should.have.property('token')
                done()
            })
    });
});


// Admin route
describe('GET /users/admin', function () {
    it('Should show a 403 message if the users is not autorised', function (done) {
        chai.request(server)
            .get('/users/admin')
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(403)
                done()
            })
    })
})



// Logout route
describe('GET /users/logout', () => {
    // this.timeout(15000)
    it('should log out the users and destroy their session.', (done) => {
        chai.request(server)
            .get('/users/logout')
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.text.should.equal('users has logged out successfully')
                done()
            })
    })
})
