import Navigation from 'src/components/Navigation/Navigation'
import { Toaster } from '@redwoodjs/web/toast'

import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  UserAddIcon,
  UserGroupIcon,
  ViewGridAddIcon,
} from '@heroicons/react/outline'
import { usePageTitle } from 'src/utils/PageTitle'
import { Link, routes, useMatch } from '@redwoodjs/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AdminLayout = ({ children }) => {
  const [pageTitle] = usePageTitle()
  const subNavigation = [
    {
      name: 'Users',
      to: routes.adminUsers(),
      icon: UserGroupIcon,
    },
    { name: 'Create New User', to: routes.adminUserNew(), icon: UserAddIcon },
    // { name: 'Account', to: '#', icon: CogIcon },
    // { name: 'Notifications', to: '#', icon: BellIcon },
    // { name: 'Billing', to: '#', icon: CreditCardIcon },
    // { name: 'Integrations', to: '#', icon: ViewGridAddIcon },
  ]
  return (
    <div>
      <div className="bg-gray-800 pb-32">
        <Navigation />
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">{pageTitle}</h1>
          </div>
        </header>
      </div>
      <main className="relative -mt-32">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="space-y-1">
                  {subNavigation.map((item) => (
                    <NavItem key={item.name} item={item} />
                  ))}
                </nav>
              </aside>
              <div className="divide-y divide-gray-200 lg:col-span-9">
                <div className="py-6 px-6 sm:p-6 lg:pb-8">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toaster position="top" toastOptions={{ success: { duration: 3000 } }} />
    </div>
  )
}
const NavItem = ({ item }) => {
  const active = useMatch(item.to).match
  return (
    <Link
      to={item.to}
      className={classNames(
        active
          ? 'bg-primary-50 border-primary-500 text-primary-700 hover:bg-primary-50 hover:text-primary-700'
          : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
        'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
      )}
      aria-current={item.current ? 'page' : undefined}
    >
      <item.icon
        className={classNames(
          active
            ? 'text-primary-500 group-hover:text-primary-500'
            : 'text-gray-400 group-hover:text-gray-500',
          'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
        )}
        aria-hidden="true"
      />
      <span className="truncate">{item.name}</span>
    </Link>
  )
}

export default AdminLayout
