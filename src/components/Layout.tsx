import { useState } from 'react';
import Content from './Content';
import Header from './Header';
import NotificationPanel from './NotificationPanel';
import Sidebar from './Sidebar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="md:pl-64">
        <div className="flex flex-col mx-auto max-w-4xl md:px-8 xl:px-0">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="flex-1">
            <div className="py-6">
              <div className="px-4 sm:px-6 md:px-0">
                <Content />
              </div>
            </div>
          </main>
        </div>
      </div>
      <NotificationPanel />
    </div>
  );
}
