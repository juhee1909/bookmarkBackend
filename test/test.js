const assert = require('assert');
const chai = require('chai');
const _ = require('lodash');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app.js');

const userModel = require('../models/user.js');

chai.use(chaiHttp);

describe('User',function(){
    it('User log in',function(done){
        let user = {
            email : 'akanksha1909singh@gmail.com',
            password : 'password'
        }
        chai.request(server).post('/user/login').send(user).end((err,res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            Authorization = res.body.data;
            done();
        })
    })
})

describe('User',function(){
    it('User signUp in',function(done){
        let user = {
            name : 'Akanksha',
            email : 'akanksha90h@gmail.com',
            password : 'password'
        }
        chai.request(server).post('/user/signup').send(user).end((err,res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            Authorization = res.body.data;
            done();
        })
    })
})

describe('Get all bookmarks',function(){
    it('List Bookmark',function(done){
        chai.request(server).get('/bookmark').set({Authorization}).end((err,res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            _.map(res.body.data,function(o){
                o.should.have.property('url');
                o.should.have.property('title');
                o.should.have.property('tags');
                o.url.should.be.a('string');
                o.title.should.be.a('string');
                o.tags.should.be.a('array');
            });
            _id = res.body.data[0]._id;
            done();
        })
    })
})

describe('Create Bookmark',function(){
    it('Bookmark created',function(done){
        let bookmark = {
            url : 'www.facebook.com',
            title : 'facebook',
            tags : ['fav','famous']
        }
        chai.request(server).post('/bookmark/create').send(bookmark).set({Authorization}).end((err,res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            _.map(res.body.data,function(o){
                o.should.have.property('url');
                o.should.have.property('title');
                o.should.have.property('tags');
                o.url.should.be.a('string');
                o.title.should.be.a('string');
                o.tags.should.be.a('array');
            });
            done();
        })
    })
})

describe('Delete Bookmark',function(){
    
    it('Bookmark deleted',function(done){
        console.log(_id);
        chai.request(server).delete('/bookmark/delete/' + _id ).set({Authorization}).end((err,res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            _.map(res.body.data,function(o){
                o.should.have.property('url');
                o.should.have.property('title');
                o.should.have.property('tags');
                o.url.should.be.a('string');
                o.title.should.be.a('string');
                o.tags.should.be.a('array');
            });
            done();
        })
    })
})