const topicQueries = require("../db/queries.topics.js");

module.exports = {
    index(req,res,next){
        topicQueries.getAllTopics((err,topics)=>{
            if(err){
                console.log("ERROR:", err);
                res.redirect(500,"static/index");

            }else{
                res.render("topics/index", {topics});
            }
        })
    }
}