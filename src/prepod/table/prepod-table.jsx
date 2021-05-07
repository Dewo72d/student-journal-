import React, {useEffect, useRef, useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ReactToExcel from "react-html-table-to-excel";
import image from "../../img/print.webp";
import ReactToPrint from "react-to-print";
import {Button} from "@material-ui/core";

function PrepodTable(props) {
    const componentRef = useRef();
    const [result, setResult] = useState([]); //Выборка
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const columns = [
        {id: "group", label: "Група"},
        {id: "code", label: "Имя"},
        {id: "lesson", label: "Пара №"},
        {id: "mark", label: "Відмітка"},
        {id: "date", label: "Дата"},
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

    return (
        <div>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table" id="table-to-xls" ref={componentRef}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
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
                                            {/* ОСТОРОЖНО, МОЖНО ПОВРЕДИТЬ ГЛАЗА*/}
                                            {/* Это нужно что бы "корректно" отображалась последняя строка в таблице*/}
                                            {result.value === "absent" ? <b>Відсутній</b> : result.value === "present" ?
                                                <i>Присутній</i> : ""}
                                        </TableCell>
                                        <TableCell key={Math.random()}>
                                            {typeof result.Date === "undefined" ? "" : new Date(result.Date).toLocaleDateString()}
                                        </TableCell>
                                        {/*-------------------------------------------------*/}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 30]}
                    component="div"
                    count={result.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            <div>
                <p>Відсутніх - {result.map(i => i.countAbsent)}</p>
                <p>Присутніх - {result.map(i => i.countPresent)}</p>
            </div>
            <ReactToExcel
                className="download-table-xls-button"
                table="table-to-xls"
                filename="excelFile"
                sheet="sheet 1"
                buttonText="Excel"
            />
            <br/>
            <ReactToPrint
                trigger={() => <Button variant="outlined" size="medium" color="primary" style={{marginTop:".5em",marginBottom:".5em"}}><img src={image} alt="print"
                                                                                  className="image"/></Button>}
                content={() => componentRef.current}
            />
        </div>
    );
}

export default PrepodTable;
