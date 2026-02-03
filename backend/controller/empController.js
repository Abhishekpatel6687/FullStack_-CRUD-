import { Employee } from "../database/dbconnection.js";

export const getAllController = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    if (employees.length === 0) {
      return res.status(200).json({ message: "no employees found" });
    }
    return res.status(200).json(employees);
  } catch (e) {
    console.log("Internal Error", e);
    return res.status(500).json({ error: "Enternal Error" });
  }
};

// export const addEmpController = async (req, res) => {


//    console.log("BODY:", req.body);
//     console.log("FILE:", req.file);
//   const { name, email, designation, empid, image } = req.body; // bady , params, query
//   if (!name || !email || !designation || !empid) {
//     return res.status(400).json({ message: "All fields are required !" });
//   }
//   try {
//     const exitstempid = await Employee.findOne({
//       where: {
//         empid,
//       },
//     });
//     if (exitstempid) {
//       return res
//         .status(409)
//         .json({ message: "employee with empid already exist" });
//     }
//     const exitstempemail = await Employee.findOne({
//       where: {
//         email,
//       },
//     });
//     if (exitstempemail) {
//       return res
//         .status(409)
//         .json({ message: "employee with email already exist" });
//     }
//         const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
//     await Employee.create({ name, email, designation, empid, image: imagePath,  });
//     return res.status(201).json({ message: "Employee Created Successfully" });
//   } catch (e) {
//     console.log("Internal Error", e);
//     return res.status(500).json({ error: "Internal Error" });
//   }
// };

export const addEmpController = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { name, email, designation, empid } = req.body;

  if (!name || !email || !designation || !empid) {
    return res.status(400).json({ message: "All fields are required !" });
  }

  try {
    const exitstempid = await Employee.findOne({ where: { empid } });
    if (exitstempid) {
      return res.status(409).json({ message: "employee with empid already exist" });
    }

    const exitstempemail = await Employee.findOne({ where: { email } });
    if (exitstempemail) {
      return res.status(409).json({ message: "employee with email already exist" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    await Employee.create({
      name,
      email,
      designation,
      empid,
      image: imagePath,
    });

    return res.status(201).json({
      message: "Employee Created Successfully",
      image: imagePath,
    });

  } catch (e) {
    console.log("Internal Error", e);
    return res.status(500).json({ error: "Internal Error" });
  }
};


export const updateController = async (req, res) => {
  // patch - It is partial resorces update
  // put - It is entire resorces update (brecreate)
  const { empid } = req.params;
  const { name, email, designation } = req.body;
  try {
    const exitEmp = await Employee.findOne({
      where: {
        empid,
      },
    });
    if (!exitEmp) {
      return res.status(404).json({ message: "Empid not Found " });
    }
    await exitEmp.update({ name, email, designation });
    return res
      .status(200)
      .json({ message: "Emp data is updated successfully !" });
  } catch (e) {
    console.log("Internal Error", e);
    return res.status(500).json({ error: "Intrenal Error" });
  }
};

export const deleteController = async (req, res) => {
  const { empid } = req.params;

  try {
    const deleteData = await Employee.findOne({
      where: {
        empid,
      },
    });
    if (!deleteData) {
      return res.status(404).json({ message: "Empid Not Found !" });
    }

    await deleteData.destroy();
    return res
      .status(200)
      .json({ message: "Emp data is deleted Successfully !" });
  } catch (e) {
    console.log("Internal Error, e");
    return res.status(500).json({ error: "Internal Error" });
  }
};


export const deleteAllController = async (req, res) => {
  try {
    const deletedCount = await Employee.destroy({
      where: {}, 
      truncate: false
    });

    if (deletedCount === 0) {
      return res.status(200).json({ message: "No employees found to delete" });
    }

    return res
      .status(200)
      .json({ message: "All employee data deleted successfully" });
  } catch (e) {
    console.log("Internal Error", e);
    return res.status(500).json({ error: "Internal Error" });
  }
};
