import { Switch } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import classNames from '../utils';
import { selectIntegrationByTitle } from '../../store/selectors';
import { useSnapshot } from 'valtio';
import _ from '../../store/store';
import Breadcrumbs from '../Breadcrumbs';
import { changeIntegrationEnabled } from '../../store/actions';

export default function IntegrationsDetail() {
  const { title } = useParams();

  const integration = selectIntegrationByTitle(useSnapshot(_), title);

  if (!integration) return <div>Not found</div>;

  const breadcrumbs = [
    { name: 'Integrations', href: '/integrations' },
    { name: integration.title, href: `/integrations/${integration.title}` },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="m-12 bg-white shadow sm:rounded-lg">
        <Switch.Group as="div" className="py-5 px-4 sm:p-6">
          <Switch.Label as="h3" className="text-lg font-medium leading-6 text-gray-900" passive>
            {integration.title}
          </Switch.Label>

          <div className="mt-2 sm:flex sm:justify-between sm:items-start">
            <div className="max-w-xl text-sm text-gray-500">
              <Switch.Description>{integration.description}</Switch.Description>
            </div>

            <div className="mt-5 sm:flex sm:shrink-0 sm:items-center sm:mt-0 sm:ml-6">
              <Switch
                checked={integration.enabled}
                onChange={(enabled: boolean) => changeIntegrationEnabled(integration.title, enabled)}
                className={classNames(
                  integration.enabled ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    integration.enabled ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  )}
                />
              </Switch>
            </div>
          </div>
        </Switch.Group>
      </div>
    </>
  );
}
