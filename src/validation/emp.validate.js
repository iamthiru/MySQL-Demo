module.exports = {
  sortFieldValidate: (empTableColumn, response) => {
    const empTables = [
      "",
      "e_id",
      "e_name",
      "e_age",
      "e_mail",
      "e_phone",
      "e_address",
      "e_salary",
      "e_project_id",
    ];

    if (empTables.indexOf(empTableColumn) !== -1) {
      return response(true);
    }
    return response(false);
  },
  sortTypeValidate: (sortData, response) => {
    if (sortData.length > 0) {
      if (
        !(sortData.toLowerCase() === "asc" || sortData.toLowerCase() === "desc")
      ) {
        sortData = "";
      }
    } else {
      sortData = "asc";
    }
    response(sortData);
  },

  paginationValidate: (paginationData, response) => {
    const startIndex = paginationData.startIndex;
    const noOfRows = paginationData.noOfRows;

    if (startIndex.length > 0 && noOfRows.length > 0) {
      return response(true);
    }
    return response(false);
  },
};
