function cors(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
}

module.exports = cors