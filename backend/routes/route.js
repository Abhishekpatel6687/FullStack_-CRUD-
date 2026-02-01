import { Router } from "express";
import { addEmpController, getAllController, updateController, deleteController , deleteAllController} from "../controller/empController.js";

const router = Router();

router.get("/getAllData", getAllController)
router.post("/saveData", addEmpController)
router.patch("/updateData/:empid", updateController) // params se id le rahe hai 
router.delete("/deleteData/:empid", deleteController)
router.delete("/deleteAll", deleteAllController)




export default router
