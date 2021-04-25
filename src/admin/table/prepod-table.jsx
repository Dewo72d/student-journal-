import React, {useEffect, useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

function PrepodTable(props) {
    const [list, setList] = useState([]); //Выборка
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const columns = [
        {id: "group", label: "Група"},
        {id: "code", label: "Имя"},
        {id: "login", label: "Логін"},
        {id: "password", label: "Пароль"},
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
    useEffect(() => setList(props.list), [props.list]);

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
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list
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
                                            {result.prepodGroup}
                                        </TableCell>
                                        <TableCell key={Math.random()}>
                                            {result.fullName}
                                        </TableCell>
                                        <TableCell key={Math.random()}>
                                            {result.login}
                                        </TableCell>
                                        <TableCell key={Math.random()}>
                                            {result.password}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={list.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}

export default PrepodTable;
