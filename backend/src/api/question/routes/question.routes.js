<<<<<<< HEAD
import express from "express";
import { authenticateUser } from "../../../middleware/authentication.js";
import { listQuestionsController } from "../controller/question.controller.js";
import { listQuestionsValidation } from "../validations/question.validation.js";

const router = express.Router();

/**
 * @route GET /api/questions
 * @desc List questions (optional ?search=keyword, ?mine=true, ?page, ?limit)
 * @access Private
 */
router.get(
  "/",
  authenticateUser,
  listQuestionsValidation,
  listQuestionsController,
);

//implement your other routes here (declare /search before /:questionHash)
=======
import express from 'express';
import { getSingleQuestionController } from '../controller/question.controller.js';
import { singleQuestionValidation } from '../validations/question.validation.js';
import { authenticateUser } from '../../../middleware/authentication.js';

const router = express.Router();

router.get(
  '/:questionHash',
  authenticateUser,
  singleQuestionValidation,
  getSingleQuestionController
);
>>>>>>> origin/main

export default router;
