import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

function AdminTable(props) {
  const [result, setResult] = useState([]); //Выборка
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const columns = [
    { id: "group", label: "Група" },
    { id: "code", label: "Имя" },
    { id: "lesson", label: "Пара №" },
    { id: "mark", label: "Відмітка" },
  ];

  //Отображение количества записей
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };
  //-------------------------

  //Перерисовка на основе выборки
  useEffect(() => {
    setResult(props.selection);
  }, [props.selection]);
  //----------------------
  console.log(result);

  return (
    <div>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {result
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((result) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={Math.random()}
                  >
                    <TableCell key={Math.random()}>
                      {result.studentGroup}
                    </TableCell>
                    <TableCell key={Math.random()}>{result.fullName}</TableCell>
                    <TableCell key={Math.random()}>
                      {result.lessonNumber}
                    </TableCell>
                    <TableCell key={Math.random()}>
                      {result.value === "absent" ? (
                        <b>Відсутній</b>
                      ) : (
                        <i>Присутній</i>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[4, 10, 15, 20, 25, 30, 100]}
          component="div"
          count={result.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default AdminTable;
