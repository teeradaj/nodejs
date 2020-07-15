const express = require('express')
var jwt = require('jsonwebtoken');
var config = require('../../util/auth.config');
const { reponseData } = require('.')

const middleware = (req, res, next) => {
  if(req.headers.authorization){
    var token = req.headers.authorization;
    var checkBearer = token.search('Bearer ');

    if( checkBearer != -1 ){
      try {
        var arr = token.split('Bearer ');

        jwt.verify(arr[1], config.secret, function(err, decoded) {
          if (err) {
            return res.status(401).json( reponseData(req, null, 'Token is Invalid', 401 ) );
          }
        });
      }catch(err){
        console.error('err thrown: ' + err.stack);
      }
  
      next();
    }else{
      return res.status(404).json( reponseData(req, null, 'Not parameter authorization', 404 ) );
    }
  }else{
    return res.status(404).json( reponseData(req, null, 'Not parameter authorization', 404 ) );
  }

}; 

module.exports = middleware;