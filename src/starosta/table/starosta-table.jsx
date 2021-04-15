import React, { useEffect, useRef, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ReactToExcel from "react-html-table-to-excel"
import image from "../../img/print.webp"
import ReactToPrint from "react-to-print";
import "../../App.css"
import { Button, Checkbox, FormControlLabel, Input } from "@material-ui/core";
function StarostaTable(props) {
    const componentRef = useRef();
    const [result, setResult] = useState([]); //Выборка
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const columns = [
        { id: "code", label: "Имя" },
    ];
    const lessons = [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
      ];
    //Отображение количества записей
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [lesson, setLesson] = useState(lessons[0].value);
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

    return (
        <div>
            <TableContainer>
                <form action="http://localhost:4000/api/marking" method="POST" mode="cors">
                    <Table stickyHeader aria-label="sticky table" id="table-to-xls" ref={componentRef}>
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
                                            <FormControlLabel
                                                control={<Input name="group" value={result.studentGroup}/>}
                                                />
                                            </TableCell>
                                            <TableCell key={Math.random()}>
                                                <FormControlLabel
                                                control={<Checkbox name="mark" value={result.fullName}/>}
                                                label={result.fullName}
                                                />
                                            </TableCell>
                                            {/*-------------------------------------------------*/}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <div>
          <label>Пара</label>
          <select name="lesson">
            {lessons.map((val) => (
              <option key={val.value} value={val.value}>
                {val.label}
              </option>
            ))}
          </select>
        </div>
                    <Button variant="contained" color="secondary" type="submit">Відмітити</Button>
                </form>
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
            <ReactToExcel
                className="download-table-xls-button"
                table="table-to-xls"
                filename="excelFile"
                sheet="sheet 1"
                buttonText="Excel"
            />
            <br />
            <ReactToPrint
                trigger={() => <Button variant="contained" color="secondary"><img src={image} alt="print" className="image" /></Button>}
                content={() => componentRef.current}
            />
        </div>
    );
}

export default StarostaTable;
