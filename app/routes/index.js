const usersRoutes = require('./mc_routes');
module.exports = function(app, db) {
  usersRoutes(app, db);
  // Тут, позже, будут и другие обработчики маршрутов 
};