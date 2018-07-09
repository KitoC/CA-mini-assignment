const server = require('../../server-test.js')

//chai tests
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const jwtDecode = require('jwt-decode')
const Post = require('../model')

chai.use(chaiHttp)


let token = null
let tokenDetails = null
let forDeletion = null
let thisPost = null
let post = null

let findPost = (id) => {
     Post.findById(id).then(
         p => post = p
     ).then(
        post => console.log(post)
     )
}

describe('POST /users/login - Successful', function () {
    this.timeout(15000)
    it('Should log the user in if their credentials are right', function (done) {
        chai.request(server)
            .post('/users/login')

            .send({
                email: 'email@email.com',
                password: 'password'
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                res.body.should.have.property('token')
                tokenDetails = jwtDecode(res.body.token)
                console.log(res.body.token)
                token = `Bearer ${res.body.token}`
                done()
            })
    });
});



// Create a new post
describe('POST /posts', function () {
    this.timeout(15000)
    it('Should create a new post if user is signed in.', (done) => {
        chai.request(server)

            .post('/posts')
            .set('Authorization', token)

            .send({
                title: 'It worked',
                content: 'Content blah blah',
                userId: tokenDetails.sub
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                forDeletion = res.body._id
                res.body.should.have.property('title')
                res.body.should.have.property('content')
                thisPost = res.body
               
                done()
            })
    }) 
})


// Delete a specified post if owner, teacher or admin
describe('DELETE /posts/:id', function () {
    this.timeout(15000)
    it('Should delete a specified post if user is signed in, owns the post or is a teach or admin.', (done) => {
        chai.request(server)
 
            .delete(`/posts/${forDeletion}`)
            .set('Authorization', token)
            .send(thisPost)
            
            .end((err, res) => {
                should.equal(err, null)


                res.should.have.status(204)
                done()
            })
    })
})


// Create a new post
describe('POST /posts', function () {
    this.timeout(15000)
    it('Should create a new post if user is signed in.', (done) => {
        chai.request(server)

            .post('/posts')
            .set('Authorization', token)

            .send({
                title: 'It worked',
                content: 'Content blah blah',
                userId: tokenDetails.sub
            })
            .end((err, res) => {
                should.equal(err, null)
                res.should.have.status(200)
                forDeletion = res.body._id
                res.body.should.have.property('title')
                res.body.should.have.property('content')
                thisPost = res.body
                // console.log(thisPost)

                done()
            })
    })
})


// Update a specified post if owner, teacher or admin
describe('Put /posts/:id', function () {
    this.timeout(15000)
    it('Should update a specified post if user is signed in, owns the post or is a teacher or admin.', (done) => {
        chai.request(server)
 
            .put(`/posts/${thisPost._id}`)
            .set('Authorization', token)
            .send({
                title: 'THIS IS A TEST TO SEE IF IT UPDATED!',
                content: 'Content blah blah',
                userId: tokenDetails.sub
            })
            
            .end((err, res) => {
                //  findPost(thisPost._id)
                console.log(res)
               
                should.equal(err, null)
                res.should.have.status(200)
                // should.equal(post.title, 'I updated this post')
                // should.equal(content, 'Content blah blah')

                done()
            })
    })
})


