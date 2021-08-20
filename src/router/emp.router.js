const {
  getAllEmployees,
  getEmpTable,
  getEmployeeBySalary,
  getEmployeeByMultipleProjects,
  getEmployeeByProjectId,
  getEmployeeBySearchingAndSorting,
} = require("../controller/emp.controller");
const router = require("express").Router();

router.get("/get-all", getAllEmployees);
router.get("/get-emp", getEmpTable);
router.get("/get-emp/salary-filter", getEmployeeBySalary);
router.get("/get-emp/multi-project", getEmployeeByMultipleProjects);
router.get("/get-emp/project-id/:id", getEmployeeByProjectId);
router.get("/get-emp/searching-and-sorting", getEmployeeBySearchingAndSorting);

module.exports = router;
