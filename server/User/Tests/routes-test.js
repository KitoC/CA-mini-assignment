const server = require('../../server-test.js')

//chai tests
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)




// // Admin route
// describe('GET /user/admin', function () {
//     it('Should show a 403 message if the user is not autorised', function (done) {
//         chai.request(server)
//             .get('/user/admin')
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(403)
//                 done()
//             })
//     })
// })


// // Register route - successful
// describe('POST /user/register - Successful', function () {
//     this.timeout(15000)
//     it('Should create a new user account and then log the user in', function (done) {
//         chai.request(server)
//             .post('/user/register')
//             // .set('content-type','application/json')
//             .send({
//                 email: 'email@email.com',
//                 password: 'password'
//             })
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 res.body.should.have.property('token')
//                 done()
//             })
//     });
// });

// // Profile route
// describe('GET /user/profile', () => {
//     // this.timeout(15000)
//     it('should show a users profile page.', (done) => {
//         chai.request(server)
//             .get('/user/profile')
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 res.text.should.equal('Anyone can view this page')
//                 done()
//             })
//     })
// })

// // Login route - successful
// describe('POST /user/login - Successful', function () {
//     this.timeout(15000)
//     it('Should log the user in if their credentials are right', function (done) {
//         chai.request(server)
//             .post('/user/login')
//             // .set('content-type','application/json')
//             .send({
//                 email: 'email@email.com',
//                 password: 'password'
//             })
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 res.body.should.have.property('token')
//                 done()
//             })
//     });
// });

// // Login route - unsuccessful
// describe('POST /user/login - unsuccessful', function () {
//     this.timeout(10000)
//     it('Should show the user an error message if their credentials are incorrect', function (done) {
//         chai.request(server)
//             .post('/user/login')
//             // .set('content-type','application/json')
//             .send({
//                 email: 'email@email.com',
//                 password: 'passssword'
//             })
//             .end((err, res) => {
//                 should.equal(res.text, 'Unauthorized')
//                 res.should.have.status(401)
//                 done()
//             })
//     });
// });





// Logout route
describe('GET /user/logout', () => {
    // this.timeout(15000)
    it('should log out the user and destroy their session.', (done) => {
        chai.request(server)
            .get('/user/logout')
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.text.should.equal('User has logged out successfully')
                done()
            })
    })
})
