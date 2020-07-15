function reponseData(req=null, data=null, msg=null, status=null){
    var reponse = {
        message : msg,
        data : data,
        status : status
    }
    return reponse;
}

module.exports = {reponseData};