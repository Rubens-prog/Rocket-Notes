const { Router, request } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const upload = multer(uploadConfig.MULTER);
const usersRoutes = Router();

const usersController = new UsersController();
const userAvatarControllerController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarControllerController.update
);

module.exports = usersRoutes;
