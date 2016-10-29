var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res) {

  // SOLUTION:
  // =========
  // use the Cat model to find all cats,
  // and use the include option to grab info from the User model.
  // This will let us show the cat and it's owner.
  models.Crime.findAll({
    include: [ models.User ]
  })
  // connect the findAll to this .then
  .then(function(crimes) {
    // grab the user info from our req.
    // How is it in our req?
    // This info gets saved to req via the users_controller.js file.
    res.render('home/index', {
      username: req.session.username,
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      crimes: crimes
    })
  })
});

router.get('/hanglee', function (req, res) {
  res.render('cases/hlee');
})

router.post('/create', function (req, res) {
  
  // SOLUTION:
  // =========
  // use the Cat model to create a cat based on what's
  // passed in req.body (name, sleepy, user_id)
  models.Crime.create({
    name: req.body.name,
    devoured: false,
    user_id: req.session.user_id
  })
  // connect the .create to this .then
  .then(function() {
    res.redirect('/');
  })
});

router.put('/update/:id', function(req,res) {
  models.Crime.update(
  {
    favorited: req.body.favorited
  },
  {
    where: { id : req.params.id }
  })
  // connect it to this .then.
  .then(function (result) {
    res.redirect('/');
  })
});


router.delete('/delete/:id', function(req,res) {
  // SOLUTION:
  // =========
  // use the Cat model to delete a cat
  // based on the id passed in the url
  models.Crime.destroy({
    where: {
      id: req.params.id
    }
  })
  // connect it to this .then.
  .then(function() {
    res.redirect('/');
  })
});


module.exports = router;