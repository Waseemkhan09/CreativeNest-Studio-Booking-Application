import express from "express";
import Studio from "../models/Studio.js";
import { createError } from "../utils/error.js"
import {
  createStudio,
  deleteStudio,
  getStudio,
  getStudios,
  updateStudio,
  countByCity,
  countByType,
} from "../controllers/studio.js";
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

//create
router.post("/", verifyAdmin, createStudio);
//update
router.put("/:id", verifyAdmin, updateStudio);
//delete
router.delete("/:id", verifyAdmin, deleteStudio);
//get
router.get("/find/:id", getStudio);
//get all
router.get("/", getStudios);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);


export default router;