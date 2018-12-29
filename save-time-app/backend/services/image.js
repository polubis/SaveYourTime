const fs = require('fs');

module.exports = {
  deleteImage: (picPath, cb, delPath = '/backend/images/products/') => {
    if(picPath === undefined || picPath === null || picPath === '') {
      cb(null);
    }
    else {
      const indexOfLastSlash = picPath.lastIndexOf("/");
      const picName = picPath.slice(indexOfLastSlash + 1, picPath.length);
      const initPath = process.cwd() + delPath + picName;

      fs.stat(initPath, function(err, stats) {
        if(!err) {
          fs.unlink(initPath, function(err){
            cb(err);
          });
        }
        else {
          cb(err);
        }
      })
    }
  }
}
