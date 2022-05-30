const newsRouter = require('./news');
const cartRouter = require('./carts');
const CourseRouter = require('./courses');
const siteRouter = require('./site');
function route(app) {
  app.use('/news', newsRouter);
  app.use('/carts', cartRouter);
  app.use('/courses',CourseRouter);
  app.use('/', siteRouter);
}
module.exports = route;
