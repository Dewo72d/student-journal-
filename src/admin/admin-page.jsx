import React from "react";
import AdminTable from "./table/admin-table";
import FilterForm from "./filter-form/filter-form";
import Paper from "@material-ui/core/Paper";

function AdminPage() {
  return (
    <Paper>
      <AdminTable />
      <FilterForm />
    </Paper>
  );
}
export default AdminPage;
