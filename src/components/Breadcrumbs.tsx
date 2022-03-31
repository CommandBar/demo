import { HomeIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

interface Breadcrumb {
  name: string;
  href: string;
}

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  const isLast = (idx: number) => idx === breadcrumbs.length - 1;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="shrink-0 w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {breadcrumbs.map((breadcrumb, idx) => (
          <li key={breadcrumb.name}>
            <div className="flex items-center">
              <svg
                className="shrink-0 w-5 h-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                to={breadcrumb.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={isLast(idx) ? 'page' : undefined}
              >
                {breadcrumb.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
