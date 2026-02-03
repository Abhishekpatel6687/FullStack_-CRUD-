import { Router } from "express";
import { upload } from "../middleware/multer.js";

import { addEmpController, getAllController, updateController, deleteController , deleteAllController} from "../controller/empController.js";

const router = Router();

router.post("/saveData",upload.single("image"), addEmpController);// 👈 SAME NAME as frontend
// router.post("/saveData", addEmpController)
router.get("/getAllData", getAllController)
router.patch("/updateData/:empid", updateController) // params se id le rahe hai 
router.delete("/deleteData/:empid", deleteController)
router.delete("/deleteAll", deleteAllController)




export default router 
