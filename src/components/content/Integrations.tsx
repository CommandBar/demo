import { useSnapshot } from 'valtio';
import classNames from '../utils';
import _ from '../../store/store';
import { Integration } from '../../store/types';
import { useNavigate } from 'react-router-dom';

export default function Integrations() {
  const { integrations } = useSnapshot(_);
  const navigate = useNavigate();
  const openIntegrationDetail = (integration: Integration) => {
    navigate(`/integrations/${integration.title}`);
  };

  return (
    <div className="overflow-hidden m-12 bg-gray-200 rounded-lg divide-y divide-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {integrations.map((integration, idx) => (
        <div
          key={integration.title}
          className={classNames(
            idx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            idx === 1 ? 'sm:rounded-tr-lg' : '',
            idx === integrations.length - 2 ? 'sm:rounded-bl-lg' : '',
            idx === integrations.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'relative group bg-white p-10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 cursor-pointer',
          )}
          onClick={() => openIntegrationDetail(integration)}
        >
          <div>
            <span className={classNames('rounded-lg inline-flex p-3 ring-4 ring-white')}>
              <img className="h-10" aria-hidden="true" src={integration.iconURL} alt="integration icon" />
            </span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {/* Extend touch target to entire panel */}
                {integration.title}
              </h3>
              <div className="text-sm font-semibold text-gray-400">
                {integration.enabled ? 'Enabled' : 'Not enabled'}
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">{integration.subtitle}</p>
          </div>

          <span
            className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400 pointer-events-none"
            aria-hidden="true"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}
