/**
 * ShopController
 *
 * @description :: Server-side logic for managing Shop
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var gravatar = require('gravatar');

module.exports = {


  /**
   * `ShopController.find()`
   */
  find: function (req, res) {
    var id = req.param('id');
    id = parseInt(id);

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

                res.view('shop/view', {
                  goods : goods
                });

          //res.json(goods);

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

          //res.json(goods);

           res.view('shop/index', {
                goods : goods
           });

      });
  } 

  function isShortcut(id) {
      if (id === 'find'   ||  id === 'update' ||  id === 'create' ||  id === 'destroy') {
      return true;
      }
  }
},


setting: function(req, res){

    Passport.findOne({
            protocol : 'local',
            user     : req.user.id
        }, function (err, passport) {
            if (passport) {
                    res.view('shop/setting', {
                        user : req.user,
                        'accessToken':passport.accessToken,
                        avatar : gravatar.url(req.user.email, {s: '150', d: 'mm'}, true)
                    });
            }
            else {
                return res.serverError({
                    code:'500',
                    message: 'Server Error'
                  });
            }
        });
  }


};

