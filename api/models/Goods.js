/**
* Goods.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

  	attributes: {
		name: {
	    		type: 'string',
	    		required: true
	  	},

	  	price: {
			type: 'float',
			defaultsTo: '0.00',
			required: true
		},

		count: {
			type: 'integer',
			defaultsTo: '0',
			required: true
		}
  	}
};

