const db = require('../../util/db.config');
const { reponseData } = require('.')
const sequelize = db.sequelize;
const Mean = db.mean;
var message = require('../../util/message')

let transaction;

const config = {
    limit : 10
}

exports.index = async function(req, res) {
    try {
        const items = await Mean.findAll({
            limit: req.body.limit ? parseInt(req.body.limit) : config.limit
        });
        if(items){
            return res.status(200).json( reponseData( req, items, message.success.success, 200 ) );
        }else{
            return res.status(404).json( reponseData( req, [], message.failed.dataNotFound, 404 ) );
        }
    } catch (err) {
        return res.status(500).json( reponseData( req, err, message.failed.serverError, 500 ) );
    }
};

exports.store = async function(req, res) {
    try {
        let apply = req.body.apply ? req.body.apply : false;

        const inputs = {
            name : req.body.name ? req.body.name : null,
            publish : req.body.publish ? req.body.publish : 0
        }

        transaction = await sequelize.transaction();
        await Mean.create(inputs, { transaction });
        await transaction.commit();

        const item = await Mean.findOne({ where:{ name: inputs.name } }).then(data => {
            if(data) return data;
        }).catch(err => {
            return err
        })

        if(apply){
            return res.status(200).json( reponseData( req, item, message.success.create, 200 ) );
        }else{
            return res.status(200).json( reponseData( req, [], message.success.create, 200 ) );
        }
    } catch (err) {
        return res.status(404).json( reponseData( req, err, message.failed.fillOutAll, 404 ) );
    }
};

exports.edit = async function(req, res) {
    try {
        var id = req.params.id ? req.params.id : null;
        var isnum = /^\d+$/.test(id);
    
        if(isnum){
            const item = await Mean.findOne({ where:{ id: id } });
            if(item){
                return res.status(200).json( reponseData( req, item, null, 200 ) );
            }else{
                return res.status(404).json( reponseData( req, item, message.failed.dataNotFound, 404 ) );
            }
        }else{
            return res.status(404).json( reponseData( req, [], message.failed.invalid, 404 ) );
        }
    } catch (err) {
        return res.status(500).json( reponseData( req, err, message.failed.serverError, 500 ) );
    }
};

exports.update = async function(req, res) {
    try {
        var id = req.body.id ? req.body.id : null;
        var isnum = /^\d+$/.test(id);

        if(isnum){
            let apply = req.body.apply ? req.body.apply : false;

            const inputs = {
                name : req.body.name ? req.body.name : null,
                publish : req.body.publish ? req.body.publish : 0
            }

            transaction = await sequelize.transaction();
            await Mean.findOne({ where:{ id: id } }).then( data => {
                if(data) data.update(inputs, { transaction });
            }).catch(err => {
                return err;
            })
            await transaction.commit();

            const item = await Mean.findOne({ where:{ id: id } }).then(data => {
                if(data) return data;
            }).catch(err => {
                return err
            })
    
            if(apply){
                return res.status(200).json( reponseData( req, item, message.success.update, 200 ) );
            }else{
                return res.status(200).json( reponseData( req, [], message.success.update, 200 ) );
            }
        }else{
            return res.status(404).json( reponseData( req, [], message.failed.invalid, 404 ) );
        }
    } catch (err) {
        return res.status(404).json( reponseData( req, err, message.failed.fillOutAll, 404 ) );
    }
}

exports.delete = function(req, res) {
    try {
        var ids = req.body.ids ? req.body.ids : [];

        if( Array.isArray(ids) ){
            ids.forEach(async function(id){
                let isnum = /^\d+$/.test(id);
                if(isnum){
                    transaction = await sequelize.transaction();
                    await Mean.destroy({ where:{ id:id } },transaction);
                    await transaction.commit();
                }else{
                    return res.status(404).json( reponseData( req, [], message.failed.invalid, 404 ) );
                }
            })

            return res.status(200).json( reponseData( req, [], message.success.delete, 200 ) );

        }

        return res.status(404).json( reponseData( req, [], message.failed.invalid, 404 ) );

    }catch(err){
        return res.status(500).json( reponseData( req, err, message.failed.serverError, 500 ) );
    }
}
