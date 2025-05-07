const StudentMarks = require('../models/student');

// c) Insert multiple student documents
exports.insertStudents = async (req, res) => {
  try {
    const data = req.body;
    await StudentMarks.insertMany(data);
    res.send('Students inserted successfully');
  } catch (err) {
    res.status(500).send(err);
  }
};

// d) Get count and all documents
exports.getAllStudents = async (req, res) => {
  try {
    const count = await StudentMarks.countDocuments();
    const students = await StudentMarks.find();
    res.send(`<h2>Total Students: ${count}</h2><pre>${JSON.stringify(students, null, 2)}</pre>`);
  } catch (err) {
    res.status(500).send(err);
  }
};

// e) Students with DSBDA > 20
exports.getDSBDAAbove20 = async (req, res) => {
  try {
    const students = await StudentMarks.find({ DSBDA_Marks: { $gt: 20 } }, 'Name');
    res.send(students);
  } catch (err) {
    res.status(500).send(err);
  }
};

// f) Update marks of specified student
exports.updateMarks = async (req, res) => {
  const { name } = req.params;
  try {
    await StudentMarks.updateOne({ Name: name }, {
      $inc: {
        WAD_Marks: 10,
        CC_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        AI_Marks: 10
      }
    });
    res.send(`Marks updated for ${name}`);
  } catch (err) {
    res.status(500).send(err);
  }
};

// g) Students with >25 marks in all subjects
exports.getAbove25AllSubjects = async (req, res) => {
  try {
    const students = await StudentMarks.find({
      WAD_Marks: { $gt: 25 },
      CC_Marks: { $gt: 25 },
      DSBDA_Marks: { $gt: 25 },
      CNS_Marks: { $gt: 25 },
      AI_Marks: { $gt: 25 }
    }, 'Name');
    res.send(students);
  } catch (err) {
    res.status(500).send(err);
  }
};

// h) Students with <40 in Maths and Science (assuming WAD and CC as substitutes)
exports.getLessThan40MathScience = async (req, res) => {
  try {
    const students = await StudentMarks.find({
      WAD_Marks: { $lt: 40 },
      CC_Marks: { $lt: 40 }
    }, 'Name');
    res.send(students);
  } catch (err) {
    res.status(500).send(err);
  }
};

// i) Delete specified student
exports.deleteStudent = async (req, res) => {
  const { name } = req.params;
  try {
    await StudentMarks.deleteOne({ Name: name });
    res.send(`${name} has been deleted`);
  } catch (err) {
    res.status(500).send(err);
  }
};

// j) Tabular display of all students
exports.displayTable = async (req, res) => {
  try {
    const students = await StudentMarks.find();
    let html = `<table border="1" cellpadding="5">
      <tr><th>Name</th><th>Roll No</th><th>WAD</th><th>CC</th><th>DSBDA</th><th>CNS</th><th>AI</th></tr>`;
    students.forEach(s => {
      html += `<tr>
        <td>${s.Name}</td>
        <td>${s.Roll_No}</td>
        <td>${s.WAD_Marks}</td>
        <td>${s.CC_Marks}</td>
        <td>${s.DSBDA_Marks}</td>
        <td>${s.CNS_Marks}</td>
        <td>${s.AI_Marks}</td>
      </tr>`;
    });
    html += `</table>`;
    res.send(html);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Seed database with initial student data
exports.seedStudents = async (req, res) => {
  try {
    // First clear existing data (optional)
    await StudentMarks.deleteMany({});
    
    // Sample student data
    const sampleStudents = [
      {
        Name: "John Doe",
        Roll_No: 101,
        WAD_Marks: 45,
        CC_Marks: 42,
        DSBDA_Marks: 38,
        CNS_Marks: 40,
        AI_Marks: 44
      },
      {
        Name: "Jane Smith",
        Roll_No: 102,
        WAD_Marks: 48,
        CC_Marks: 46,
        DSBDA_Marks: 42,
        CNS_Marks: 43,
        AI_Marks: 47
      },
      {
        Name: "Alex Kumar",
        Roll_No: 103,
        WAD_Marks: 35,
        CC_Marks: 30,
        DSBDA_Marks: 28,
        CNS_Marks: 32,
        AI_Marks: 36
      },
      {
        Name: "Sara Patel",
        Roll_No: 104,
        WAD_Marks: 22,
        CC_Marks: 18,
        DSBDA_Marks: 25,
        CNS_Marks: 20,
        AI_Marks: 24
      },
      {
        Name: "Michael Wong",
        Roll_No: 105,
        WAD_Marks: 49,
        CC_Marks: 47,
        DSBDA_Marks: 45,
        CNS_Marks: 48,
        AI_Marks: 50
      }
    ];
    
    // Insert the sample data
    await StudentMarks.insertMany(sampleStudents);
    
    res.status(200).json({
      success: true,
      message: "Database seeded successfully",
      count: sampleStudents.length
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to seed database",
      error: err.message
    });
  }
};
