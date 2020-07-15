var bcrypt = require('bcryptjs')
var config = require('../../util/auth.config')
var jwt = require('jsonwebtoken')
var message = require('../../util/message')
const { reponseData } = require('.')
const db = require('../../util/db.config')
const sequelize = db.sequelize;
const Users = db.users;
let transaction;

exports.index = async function(req, res) {
    const username = req.body.username ? req.body.username : null;
    const password = req.body.password ? req.body.password : null;

    await Users.findOne({
        where:{
            username:username
        }
    }).then( data => {
        if(data){
            if(bcrypt.compareSync(password, data.password)) {
                var msg = `ยินดีต้อนรับ คุณ ${data.username}`
                var token = jwt.sign({ 
                        id: data.id
                    }, 
                        config.secret, 
                    {
                        expiresIn: 60 * 60
                    });

                var response = {
                    token : token,
                    expires_in : 60 * 60,
                    type : 'Bearer'
                }

                return res.status(200).json( reponseData( req, response, msg, 200 ) );
            }else{
                return res.status(404).json( reponseData( req, [], message.user.loginValidate, 404 ) );
            }
        }else{
            return res.status(404).json( reponseData( req, [], 'The Username or Password is incorrect.', 404 ) );
        }
    }).catch( err => {
        return err;
    });
}

exports.store = async function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const inputs = {
        username : req.body.username,
        email : req.body.email,
        password : hashedPassword
    }

    try {
        transaction = await sequelize.transaction();
        newUser = await Users.create(inputs, { transaction });
        if(newUser){
            await transaction.commit();
            return res.status(200).json( reponseData( req, newUser, message.user.success, 200 ) );
        }
    } catch (err) {
        return res.status(500).json( reponseData( req, err, message.user.store.err, 500 ) );
    }
};