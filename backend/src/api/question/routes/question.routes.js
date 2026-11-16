import express from "express";
import { authenticateUser } from "../../../middleware/authentication.js";
import { listQuestionsController } from "../controller/question.controller.js";
import { listQuestionsValidation } from "../validations/question.validation.js";

const router = express.Router();

// All question routes require authentication
router.use(authenticateUser);

/**
 * @route GET /api/questions
 * @desc List questions (optional ?search=keyword, ?mine=true, ?page, ?limit)
 * @access Private
 */
router.get("/", listQuestionsValidation, listQuestionsController);

//implement your other routes here (declare /search before /:questionHash)

export default router;
