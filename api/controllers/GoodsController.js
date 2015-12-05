/**
 * GoodsController
 *
 * @description :: Server-side logic for managing Goods
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `GoodsController.create()`
   */
  create: function (req, res) {
    var params = req.params.all();
    req.wantsJSON  = true;

    Goods.create(params, function(err, sleep) {

      	          if (err) return res.serverError({
                    code:'500',
                    message: 'Server Error',
                    description : err
                  });

        res.status(201);

        res.json(sleep);

    });
  },


  /**
   * `GoodsController.update()`
   */
  update: function (req, res) {
    var criteria = {};
    req.wantsJSON  = true;

        criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');

        if (!id) {
            return res.badRequest({
              code:'400',
              message: 'Bad Request',
              description : 'No id provided.'
            });
        }

        Goods.update(id, criteria, function (err, goods) {

      	          if (err) return res.serverError({
                    code:'500',
                    message: 'Server Error',
                    description : err
                  });


            if(goods.length === 0) return res.notFound({
                    code:'404',
                    message: 'Not found'
                  });


            res.json(goods);

        });
  },


  /**
   * `GoodsController.destroy()`
   */
  destroy: function (req, res) {
   var id = req.param('id');
   req.wantsJSON  = true;

        if (!id) {
            return res.badRequest({
              code:'400',
              message: 'Bad Request',
              description : 'No id provided.'
            });
        }

        Goods.findOne(id, function(err, result) {
      	          if (err) return res.serverError({
                    code:'500',
                    message: 'Server Error',
                    description : err
                  });

            if (!result) return res.notFound({
                    code:'404',
                    message: 'Not found'
                  });

            Goods.destroy(id, function (err) {

      	          if (err) return res.serverError({
                    code:'500',
                    message: 'Server Error',
                    description : err
                  });

                return res.json(result);
            });

        });
  },


  /**
   * `GoodsController.find()`
   */
  find: function (req, res) {
  	req.wantsJSON  = true;
    var id = req.param('id');

  var idShortCut = isShortcut(id);

  if (idShortCut === true) {
      return res.badRequest({
              code:'400',
              message: 'Bad Request'
            });
  }

  if (id) {

      Goods.findOne(id, function(err, goods) {

      	          if (err) return res.serverError({
                    code:'500',
                    message: 'Server Error',
                    description : err
                  });

          if(goods === undefined) return res.notFound({
                    code:'404',
                    message: 'Not found'
                  });

          res.json(goods);

      });

  } else {

      var where = req.param('where');

      if (_.isString(where)) {
              where = JSON.parse(where);
      }

      var options = {
                  limit: req.param('limit') || 10, 
                  skip: req.param('skip')  || 1,
                  sort: req.param('sort') || {createdAt: 'desc'},
                  where: where || {}
          };

          console.log("This is the options", options);
              
      Goods.find(options, function(err, goods) {

      	          if (err) return res.serverError({
                    code:'500',
                    message: 'Server Error',
                    description : err
                  });

          if(goods === undefined) return res.notFound({
                    code:'404',
                    message: 'Not found'
                  });

          res.json(goods);

      });
  } 

  function isShortcut(id) {
      if (id === 'find'   ||  id === 'update' ||  id === 'create' ||  id === 'destroy') {
      return true;
      }
  }
}


};

