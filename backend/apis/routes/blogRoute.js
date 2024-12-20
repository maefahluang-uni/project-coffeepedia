const express = require("express");
const controller = require("../controllers/blogController");

const router = express.Router();
router.get("/", controller.getBlogs);
router.get("/top", controller.getTop3Blogs);
router.get("/comments/:id", controller.getBlogCommentsByID);
router.post("/comment", controller.insertCommentIntoBlog);
router.get("/today_comments", controller.getCommentCountToday);
router.get("/view/:id", controller.addViewBlog);
router.get("/count", controller.countBlogs);
router.post("/", controller.postRequestBlog);
module.exports = router;
