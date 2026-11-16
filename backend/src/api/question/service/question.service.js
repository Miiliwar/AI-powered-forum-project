import { safeExecute } from "../../../../db/config.js";

const escapeLike = (value) => value.replace(/[\\%_]/g, (ch) => `\\${ch}`);

export const listQuestionsService = async ({
  userId,
  search = "",
  mine = false,
  page = 1,
  limit = 20,
}) => {
  const where = [];
  const params = [];

  if (mine) {
    where.push("q.user_id = ?");
    params.push(userId);
  }

  const keyword = search.trim();
  if (keyword) {
    const pattern = `%${escapeLike(keyword)}%`;
    where.push("(q.title LIKE ? OR q.content LIKE ?)");
    params.push(pattern, pattern);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const countRows = await safeExecute(
    `SELECT COUNT(*) AS total FROM questions q ${whereSql}`,
    params,
  );
  const total = Number(countRows[0].total);

  // limit/offset are validated integers, so they are inlined
  const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
  const safePage = Math.max(parseInt(page, 10) || 1, 1);
  const offset = (safePage - 1) * safeLimit;

  const rows = await safeExecute(
    `SELECT q.question_hash, q.title, q.content, q.created_at, q.updated_at,
            u.user_id, u.first_name, u.last_name,
            (SELECT COUNT(*) FROM answers a WHERE a.question_id = q.question_id) AS answer_count
     FROM questions q
     JOIN users u ON u.user_id = q.user_id
     ${whereSql}
     ORDER BY q.created_at DESC, q.question_id DESC
     LIMIT ${safeLimit} OFFSET ${offset}`,
    params,
  );

  const questions = rows.map((r) => ({
    questionHash: r.question_hash,
    title: r.title,
    content: r.content,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    answerCount: Number(r.answer_count),
    author: {
      id: r.user_id,
      firstName: r.first_name,
      lastName: r.last_name,
    },
  }));

  return {
    questions,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};
