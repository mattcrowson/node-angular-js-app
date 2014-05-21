module.exports = function(app) {
  var express = require('express');
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
    });  });

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

  app.use('*', function(req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendfile('./public/index.html');
  });
};
