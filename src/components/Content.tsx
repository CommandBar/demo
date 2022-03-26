import { Navigate, Route, Routes } from "react-router-dom";
import CompaniesTable from "./content/CompaniesTable";
import CompanyDetail from "./content/CompanyDetail";
import CompanyEdit from "./content/CompanyEdit";

const Content = () => {
  return (
    <Routes>
      <Route path="/leads" element={<CompaniesTable />} />
      <Route path="/leads/:id" element={<CompanyDetail />} />
      <Route path="/leads/:id/edit" element={<CompanyEdit />} />
      <Route path="*" element={<Navigate to="/leads" replace />} />
    </Routes>
  );
};
export default Content;
