import express from "express";
import {
  deleteAllUsers,
  deleteUser,
  userDataUpdate,
  userInsert,
  viewUsers,
} from "../controllers/userController.js";
const router = express.Router();

//* url = http://localhost:8000/api/users/

router.post("/user-insert", userInsert);
router.get("/users-view", viewUsers);
router.delete("/user-delete/:id", deleteUser);
router.put("/user-update/:id", userDataUpdate);
router.delete("/all-user-delete", deleteAllUsers);

export default router;
