import Student from "../models/student.js";

export const getStudent = async (req, res) => {
  try {
    const students = await Student.find();

    res.json({ success: true, data: students });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export const createStudent = (req, res) => {
  if (req.user == null) {
    req.status(401).json({
      message: "please login and try again",
    });
    return;
  }

  if (req.user.role != "admin") {
    res.status(403).json({
      message: "you must be an admin to create a student",
    });
    return;
  }

  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    city: req.body.city,
  });

  student
    .save()
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "student created successfully" });
    })
    .catch(() => {
      res.status(401).json({ success: false, message: "student not added" });
    });
};
