var express = require('express');
var router = express.Router();
var posts = require('../db.json');
var request = require("request");


// can import code directly from file
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'News Trendz' , posts:posts.posts});
});


/* GET New blog page. */
router.get('/new', function (req, res, next) {
  res.render('new', { title: 'New Article', posts: posts.posts});
});
// Get contact page
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'New Article', posts: posts.posts});
});
/* GET archive page. */
router.get('/archive', function (req, res, next) {
  res.render('archive', { title: 'New Article', posts: posts.posts});
});
module.exports = router;

// get single page to view whole post
router.get('/view/:id', function (req, res, next) {
  var id = req.params.id;
  var data = posts.posts[id-1];
  res.render('view', { title: 'View', posts: data});
});

/* GET New blog page. */
router.post('/new', function (req, res, next) {
  // res.send(req.body)

// create variable to post
  var obj = {
    "title": req.body.title,
    "author": req.body.author,
    "image": req.body.image,
    "date": req.body.date,
    "content": req.body.content,
    "summary": req.body.summary,


  }

  //write logic that saves this data
  request.post({
    url:'http://localhost:8000/posts',
    body:obj,
    json:true
  },function(error,responsive,body){
    res.redirect('/');
  });

});

/* ContactUs page. */
router.get('/contactUs', function (req, res, next) {
  res.render('contactUs', { title});
});

// UPDATE ROUTES
router.get('/update/:id', function(req, res, next) {

 //make a post request to our database
 request({
 uri: "http://localhost:8000/posts/" + req.params.id,
 method: "GET",
 }, function(error, response, body) {
     console.log(JSON.parse(body));
     //send a response message
     res.render('update', {message: false, posts: JSON.parse(body)});
 });

});

router.post('/update/:id', function(req, res, next) {
 request({
   uri: "http://localhost:8000/posts/" + req.params.id,
 method: "PATCH",
 form: {
     title: req.body.title,
     content: req.body.content,
     author: req.body.author
 }
 }, function(error, response, body) {
     // console.log(body);
     //send a response message
     res.render('update', {message: 'Successfully Changed.', posts: JSON.parse(body)});
 });
});
//DELETE BUTTON
router.get('/delete/:id', function(req, res, next) {
 console.log(req.params.id)

request({
 uri: "http://localhost:8000/posts/"  + req.params.id,
 method: "DELETE",
 }, function(error, response, body) {

     let data = {
         message: 'Successfully Removed.',
     }

     res.redirect('/');
 });
});

module.exports = router;
