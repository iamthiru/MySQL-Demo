const sql = require("../../config/db.config");

module.exports = {
  getAllEmp: (callback) => {
    sql.query(` call getAllEmployee()`, [], (err, result) => {
      if (err) {
        callback(err);
      }
      return callback(null, result);
    });
  },

  //get all Employee table and Project table by using Left Join
  getEmployeeTable: (callback) => {
    sql.query(`call getEmpWithProject()`, [], (err, result) => {
      if (err) {
        callback(err);
      }
      return callback(null, result);
    });
  },

  //get Employee details , where emp salary is greater than user given amount
  getEmpBySalary: (salary, callback) => {
    sql.query(`call getEmpBySalaryFilter(${salary})`, [], (err, result) => {
      if (err) {
        callback(err);
      }
      return callback(null, result[0]);
    });
  },

  //get Employee who has working on multiple projects
  getEmpByMultiProjects: (callback) => {
    sql.query(`call getEmpByMultiProjects()`, [], (err, result) => {
      if (err) {
        callback(err);
      }
      return callback(null, result[0]);
    });
  },

  //get the Employee Details whose worked in same projects
  getEmpByProjectId: (p_id, callback) => {
    sql.query(`call getEmpByProjectId(${p_id})`, [], (err, result) => {
      if (err) {
        callback(err);
      }
      return callback(null, result[0]);
    });
  },

  //get employee based on search and sorting
  getEmpBySearchingAndSorting: (data, callback) => {
    const searchElement = data.searchElement;
    const sortType = data.sortType;
    const sortField = data.sortField;
    sql.query(`call getEmpBySearchingAndSorting("${searchElement}", "${sortField}", "${sortType}")`,[], (err, result)=>{
      if(err){
        callback(err);
      }
      return callback(null, result[0]);
    });
  },
};
