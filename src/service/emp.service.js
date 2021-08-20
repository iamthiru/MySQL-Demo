const sql = require("../../config/db.config");

module.exports = {
  getAllEmp: (callback) => {
    sql.query(`SELECT * FROM employee`, [], (err, result) => {
      if (err) {
        callback(err);
      }
      return callback(null, result);
    });
  },

  //get all Employee table and Project table by using Left Join
  getEmployeeTable: (callback) => {
    sql.query(
      `SELECT employee.e_id, employee.e_name, employee.e_mail, employee.e_phone, projects.p_id, projects.p_name 
          FROM employee LEFT JOIN projects ON employee.e_id=projects.e_id`,
      [],
      (err, result) => {
        if (err) {
          callback(err);
        }
        return callback(null, result);
      }
    );
  },

  //get Employee details , where emp salary is greater than user given amount
  getEmpBySalary: (salary, callback) => {
    sql.query(
      `select employee.e_id, employee.e_name, projects.p_id, projects.p_name 
          from employee inner join projects on employee.e_id=projects.e_id where e_salary >= ?`,
      [salary],
      (err, result) => {
        if (err) {
          callback(err);
        }
        return callback(null, result);
      }
    );
  },

  //get Employee who has working on multiple projects
  getEmpByMultiProjects: (callback) => {
    sql.query(
      `select * from employee where e_project_id like'%,%' `,
      [],
      (err, result) => {
        if (err) {
          callback(err);
        }
        return callback(null, result);
      }
    );
  },

  //get the Employee Details whose worked in same projects
  getEmpByProjectId: (p_id, callback) => {
    sql.query(
      `select employee.e_id, employee.e_name, employee.e_project_id
      from employee where employee.e_project_id like '%${p_id}%' `,
      [],
      (err, result) => {
        if (err) {
          callback(err);
        }
        return callback(null, result);
      }
    );
  },

  //get employee based on search and sorting
  getEmpBySearchingAndSorting: (data, callback) => {
    const searchElement = data.searchElement;
    const sortType = data.sortType;
    const sortField = data.sortField;

    let testQuery = ` select * from employee ${
      searchElement.length > 0
        ? `where e_id like '%${searchElement}%' or 
      e_name like '%${searchElement}%' or
      e_age like '%${searchElement}%' or
      e_mail like '%${searchElement}%' or
      e_phone like '%${searchElement}%' or
      e_address like '%${searchElement}%' or
      e_salary like '%${searchElement}%' or
      e_project_id like '%${searchElement}%'`
        : ``
    }
      ${
        sortField.length > 0
          ? `order by ${sortField} ${
              sortType.length > 0 ? `${sortType}` : `asc`
            }`
          : ``
      } `.trim();

    sql.query(testQuery, [], (err, result) => {
      if (err) {
        callback(err);
      }
      return callback(null, result);
    });
  },
};
