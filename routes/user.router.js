import express from "express";
import {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
} from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/allUsers", getAllUsers);
userRouter.get("/userProfile/:id", getUserProfile);  
userRouter.put("/updateProfile/:id", updateUserProfile);  
userRouter.delete("/deleteProfile/:id", deleteUserProfile);  

export default userRouter;