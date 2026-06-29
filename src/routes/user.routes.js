import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser
} from "../controllers/user.controller.js";

import { upload } from "../db/middlewares/multer.middleware.js";
import { verifyJWT } from "../db/middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  registerUser
);

router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);

export default router;