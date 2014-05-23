module.exports = function(app, passport) {
  var express = require('express');

  (function() {
    var router  = express.Router();
    var Todo    = require('../models/todo');

    router.get('/', function(req, res) {
      Todo.find(function(err, result) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          res.json(result);
        }
      });
    });

    router.post('/', function(req, res, next) {
      Todo.create({
        action : req.body.action
      }, function(err, todo) {
        if (err)
          res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
          if (err)
            res.send(err);
          res.json(todos);
        });
      });
    });

    router.delete('/:todo_id', function(req, res) {
      Todo.remove({
        _id : req.params.todo_id
      }, function(err, todo) {
        if (err)
          res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
          if (err)
            res.send(err);
          res.json(todos);
        });
      });
    });

    // accessed at GET http://host:port/api/todos
    app.use('/api/todos', router);
  })();

  app.route('/login')
    .get(function(req, res) {
      res.sendfile('./public/html/login.html');
    })
    .post(passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

  app.route('/')
    .get(function(req, res) {
      res.sendfile('./public/html/index.html');
  });
};
