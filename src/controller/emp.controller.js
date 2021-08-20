const e = require("express");
const {
  getAllEmp,
  getEmployeeTable,
  getEmpBySalary,
  getEmpByMultiProjects,
  getEmpByProjectId,
  getEmpBySearchingAndSorting,
} = require("../service/emp.service");
const {searchValidate, sortValidate} = require('../../validation/emp.validate');
module.exports = {
  getAllEmployees: (request, response) => {
    getAllEmp((err, result) => {
      if (err) {
        return response(err);
      }
      if (result.length === 0) {
        return response.status(404).json({
          success: false,
          message: "Employee table is empty !",
        });
      }
      return response.status(200).json({
        success: true,
        data: result,
      });
    });
  },

  getEmpTable: (request, response) => {
    getEmployeeTable((err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length === 0) {
        return response.status(404).json({
          success: false,
          message: "Employee table is empty !",
        });
      }
      return response.status(200).json({
        success: true,
        data: result,
      });
    });
  },

  getEmployeeBySalary: (request, response) => {
    const salary = request.body.salary;
    if (!salary) {
      return response.status(404).json({
        success: false,
        message: "Invalid Body section !",
      });
    }
    getEmpBySalary(salary, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length === 0) {
        return response.status(404).json({
          success: false,
          message: "Employee table is empty !",
        });
      }
      return response.status(200).json({
        success: true,
        data: result,
      });
    });
  },

  getEmployeeByMultipleProjects: (request, response) => {
    getEmpByMultiProjects((err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length === 0) {
        return response.status(404).json({
          success: false,
          message: "Nobody should working on multiple projects !",
        });
      }
      return response.status(200).json({
        success: true,
        data: result,
      });
    });
  },

  getEmployeeByProjectId: (request, response) => {
    const p_id = request.params.id;
    getEmpByProjectId(p_id, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length === 0) {
        return response.status(404).json({
          success: false,
          message: "No data found based on your search !",
        });
      }
      return response.status(200).json({
        success: true,
        data: result,
      });
    });
  },

  getEmployeeBySearchingAndSorting: (request, response) => {
    const data = request.body;
    let isSortFieldClear = false;
    let sortType;

    searchValidate(data.sortField, (result) => {
      isSortFieldClear = result;
    });
    sortValidate(data.sortType, (result) => {
      sortType = result;
    })

    if(sortType.length > 0 && isSortFieldClear){
      getEmpBySearchingAndSorting(data, (err, result) => {
        if (err) {
          console.log(err);
        }
        return response.status(200).json({
          success: true,
          data: result,
        });
      });
    }else{
      return response.status(400).json({
        success: false,
        message: "Invalid Sort Type in Body Section !, give ( asc or desc )",
      });
    }
  },
};

