import React from 'react';
import { useSnapshot } from 'valtio';
import _ from './store/store';
import { init } from 'commandbar';
import { useNavigate } from 'react-router-dom';
import { editCompanyDetails } from './store/actions';

init('03daf5d9');

const useCommandBar = () => {
  const snapshot = useSnapshot(_);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.CommandBar.boot('424242');

    // add callback for changing company state
    const updateCompanyStage = (args: any, context: any) => {
      editCompanyDetails(context.activeCompany.id, 'stageId', args.stage.id);
    };
    window.CommandBar.addCallback('editCompanyStage', updateCompanyStage);
  }, []);

  // add router
  React.useEffect(() => {
    // add router for quick navigation
    const routerFunc = (newUrl: string) => navigate(newUrl);
    window.CommandBar.addRouter(routerFunc);
  }, [navigate]);

  // add companies to context (and subscribe to changes)
  React.useEffect(() => {
    window.CommandBar.addContext('leads', snapshot.companies);
  }, [snapshot.companies]);

  // add stages to context (and subscribe to changes, though none are made in this demo)
  React.useEffect(() => {
    window.CommandBar.addContext('stages', snapshot.stages);
  }, [snapshot.stages]);

  // add active company to context (and subscribe to changes)
  React.useEffect(() => {
    window.CommandBar.addContext('activeLead', snapshot.activeCompany);
  }, [snapshot.activeCompany]);
};

export default useCommandBar;
