<<<<<<< HEAD
import { StatusCodes } from "http-status-codes";
import { listQuestionsService } from "../service/question.service.js";

/**
 * GET /api/questions
 * Query: search, mine, page, limit
 */
// Logic fotr getting the list of all questions
export const listQuestionsController = async (req, res, next) => {
  try {
    const { search, mine, page, limit } = req.query;

    const result = await listQuestionsService({
      userId: req.user.id,
      search: search || "",
      mine: mine === "true" || mine === "1",
      page,
      limit,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      count: result.questions.length,
=======
import { StatusCodes } from 'http-status-codes';
import { getSingleQuestionService } from '../service/question.service.js';

export const getSingleQuestionController = async (req, res, next) => {
  try {
    const { questionHash } = req.params;

    const result = await getSingleQuestionService(questionHash);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Question fetched successfully',
>>>>>>> origin/main
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
