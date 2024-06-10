
import './App.css';
import React from 'react';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import AppPage from './components/apps-components/apps';
import AuditorsPage from './components/auditors-groups-components/auditors';
import ScoreScale from './components/score-scale-components/score-scale';
import Catalogs from './components/catalogs-components/catalogs';
import UploadCatalogs from './components/catalogs-components/upload-catalogs';
import Audits from './components/audits-components/audits';
import NewAudits from './components/audits-components/new-audits';
import EvaluateAudit from './components/audits-components/evaluate-audit';
import AdministrateUsers from './components/admin-components/administrate-users';
import Profile from './components/profile-components/profile';

const App: React.FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="profile" element={<Profile />} />
        <Route path="apps" element={<AppPage />} />
        <Route path="auditors" element={<AuditorsPage />} />
        <Route path="score-scale" element={<ScoreScale />} />
        <Route path="catalogs" element={<Catalogs />}>
        </Route>
        <Route path="create-catalog" element={<UploadCatalogs />} />
        <Route path="audits" element={<Audits />}>
        </Route>
        <Route path="create-audit" element={<NewAudits />} />
        <Route path="evaluate-audit" element={<EvaluateAudit />} />
        <Route path="admin-page" element={<AdministrateUsers />} />
      </Route>
    </Routes>
  );
};

export default App;
