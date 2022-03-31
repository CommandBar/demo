import { Dispatch, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InboxIcon, UsersIcon, XIcon } from '@heroicons/react/outline';
import classNames from './utils';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Leads', href: '/leads', icon: UsersIcon },
  {
    name: 'Integrations',
    href: '/integrations',
    icon: InboxIcon,
  },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const location = useLocation();

  const isActive = (menuElemPath: string) => (location.pathname + location.hash).startsWith(menuElemPath);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="flex fixed inset-0 z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600/75" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="flex relative flex-col flex-1 pt-5 pb-4 w-full max-w-xs bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    className="flex justify-center items-center ml-1 w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>

              <div className="flex shrink-0 items-center px-4">
                <img
                  className="w-auto h-8"
                  src="https://staticassets.commandbar.com/brand/logo_wordmark.svg"
                  alt="CommandBar"
                />
              </div>

              <div className="overflow-y-auto flex-1 mt-5 h-0">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      to={item.href}
                      key={item.name}
                      //   href={item.href}
                      className={classNames(
                        isActive(item.href)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group rounded-md py-2 px-2 flex items-center text-base font-medium',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isActive(item.href) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 flex-shrink-0 h-6 w-6',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="shrink-0 w-14">{/* Dummy element to force sidebar to shrink to fit close icon */}</div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:fixed md:inset-y-0 md:flex-col md:w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex overflow-y-auto flex-col grow pt-5 bg-white border-r border-gray-200">
          <div className="flex shrink-0 items-center px-4">
            <img
              className="w-auto h-8"
              src="https://staticassets.commandbar.com/brand/logo_wordmark.svg"
              alt="CommandBar"
            />
          </div>

          <div className="flex flex-col grow mt-5">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    isActive(item.href)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group rounded-md py-2 px-2 flex items-center text-sm font-medium',
                  )}
                >
                  <item.icon
                    className={classNames(
                      isActive(item.href) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6',
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
