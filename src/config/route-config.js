module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const postRoutes = require("../routes/posts");
      const topicRoutes = require("../routes/topics");
      const advertisementRoutes = require("../routes/advertisement");
      const flairRoutes= require ("../routes/flairs");
      app.use(staticRoutes);
      app.use(postRoutes);
      app.use(topicRoutes);
      app.use(advertisementRoutes);
      app.use(flairRoutes);
    }
  }