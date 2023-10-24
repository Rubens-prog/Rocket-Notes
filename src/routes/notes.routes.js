const { Router } = require("express");

const notesRoutes = Router();

const NotesController = require("../controllers/NotesController");

const notesController = new NotesController();

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

notesRoutes.use(ensureAuthenticated);

notesRoutes.get("/", notesController.index);
notesRoutes.get("/:id", notesController.show);
notesRoutes.post("/", notesController.create);
notesRoutes.put("/:id", notesController.update);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
