const service = require("../services/blogService");

const getBlogs = async (req, res) => {
  const blogs = await service.getBlogs(req);
  res.send(blogs);
};

const getTop3Blogs = async (req, res) => {
  const top3blogs = await service.getTop3Blogs();
  res.send(top3blogs);
};
const getBlogCommentsByID = async (req, res) => {
  const comments = await service.getBlogCommentsByID(req.params.id);
  res.send(comments);
};
const insertCommentIntoBlog = async (req, res) => {
  const insertedComment = await service.insertCommentIntoBlog(req.body);
  res.send(insertedComment);
};
const countBlogs = async (req, res) => {
  const countblogs = await service.countBlogs();
  res.send(countblogs);
};
const postRequestBlog = async (req, res) => {
  const response = await service.postRequestBlog(req, req.body);
  res.send(response);
};
module.exports = {
  getBlogs,
  getTop3Blogs,
  getBlogCommentsByID,
  insertCommentIntoBlog,
  countBlogs,
  postRequestBlog,
};
