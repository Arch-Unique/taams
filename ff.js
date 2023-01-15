const Attendance = require("./models/attendance");
const { faker } = require("@faker-js/faker");

let users = [];
let codes = ["ENG501", "ENG521", "ENG565", "ENG543", "ENG541", "ENG573"];
let dept = [
  "Civil Engineering",
  "Electronic Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Agric. & Bioresources Engineering",
  "Materials & Metallurgical Engineering",
];
let level = ["100", "200", "300", "400", "500"];

function genStudents() {
  let stds = [];
  for (let index = 0; index < 500; index++) {
    let regno = "2016/200" + index.toString().padStart(3, "0");
    let name = faker.name.fullName();
    let h = Math.floor(Math.random() * 5);
    let hk = Math.floor(Math.random() * 6);

    stds.push({
      name,
      regno,
      faculty: "Engineering",
      department: dept[hk],
      level: level[h],
    });
  }
  return stds;
}

let stds = genStudents();
for (let i = 0; i < 5000; i++) {
  let f = Math.floor(Math.random() * 499); //generate 500 students
  let g = Math.floor(Math.random() * codes.length);
  users.push({
    fullname: stds[f].name,
    regno: stds[f].regno,
    faculty: stds[f].faculty,
    level: stds[f].level,
    department: stds[f].department,
    coursecode: codes[g],
  });
}

Attendance.drop().then(() => {
  // Attendance.bulkCreate(users).then((res) => console.log("success"));
});
