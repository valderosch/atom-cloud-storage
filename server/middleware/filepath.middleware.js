function filePath (path) {
   return function(request, response, next) {
       request.filePath = path
       next();
   }
}

module.exports = filePath