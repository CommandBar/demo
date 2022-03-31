import { MenuAlt2Icon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { Dispatch, SetStateAction } from 'react';
import { useSnapshot } from 'valtio';
import _ from '../store/store';

export default function Header({ setSidebarOpen }: { setSidebarOpen: Dispatch<SetStateAction<boolean>> }) {
  const { currentUser } = useSnapshot(_);

  return (
    <div className="flex sticky top-0 z-10 shrink-0 h-16 bg-white border-b border-gray-200">
      <button
        type="button"
        className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 justify-between px-4 md:px-0">
        <div className="flex flex-1">
          <form className="flex w-full md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600 flex items-center cursor-pointer">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex items-center h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm">
                Search for anything (cmd+k)
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center ml-4 md:ml-6">
          <button
            type="button"
            className="inline-flex items-center p-1 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm"
          >
            <img className="w-8 h-8 rounded-full" src={currentUser.imgURL} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
