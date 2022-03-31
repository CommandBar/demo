import { Navigate, Route, Routes } from 'react-router-dom';
import CompaniesTable from './content/CompaniesTable';
import CompanyDetail from './content/CompanyDetail';
import CompanyEdit from './content/CompanyEdit';
import Integrations from './content/Integrations';
import IntegrationsDetail from './content/IntegrationsDetail';
import ScrollToTop from './ScrollToTop';

const Content = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/leads" element={<CompaniesTable />} />
        <Route path="/leads/:id" element={<CompanyDetail />} />
        <Route path="/leads/:id/edit" element={<CompanyEdit />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/integrations/:title" element={<IntegrationsDetail />} />
        <Route path="*" element={<Navigate to="/leads" replace />} />
      </Routes>
    </ScrollToTop>
  );
};

export default Content;
