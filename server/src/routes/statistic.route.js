import express from "express"
import StatisticController from "../controllers/statistic.controller.js"
import { Roles } from "../utils/lib.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const StatisticRoute = express.Router()

/**
 * @swagger
 * /statistic/statisticTotalUser:
 *   post:
 *     tags: [Statistics]
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *               FromDate: "2024-05-19T19:26:10.042+00:00"
 *               ToDate: "2024-05-19T19:26:10.042+00:00"
 *     responses:
 *       200:
 *         description: Lấy ra thành công
 *       500:
 *         description: Internal server error
 */
StatisticRoute.post("/statisticTotalUser",
  authMiddleware([Roles.ROLE_ADMIN]),
  StatisticController.statisticTotalUser
)

/**
 * @swagger
 * /statistic/statisticNewRegisteredUser:
 *   get:
 *     tags: [Statistics]
 *     parameters:
 *       - in: query
 *         name: Key
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server error
 */
StatisticRoute.get("/statisticNewRegisteredUser",
  authMiddleware([Roles.ROLE_ADMIN]),
  StatisticController.statisticNewRegisteredUser
)

export default StatisticRoute
