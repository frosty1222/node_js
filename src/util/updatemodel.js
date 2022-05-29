module.exports={
    editData:function(editId,callback){
       var userData= userTable.findById(editId);
       userData.exec(function(err, data){
        if(err) throw err;
        return callback(data);
     })
    },
    updateData:function(inputData, editId, callback){
                 
     userData= userTable.findByIdAndUpdate(editId, inputData);
     userData.exec(function(err, data){
       if (err) throw err;
        return callback(data);
     })
}
}