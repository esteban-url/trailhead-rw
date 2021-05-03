import { useAuth } from '@redwoodjs/auth'
import { Link, NavLink, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { Menu, Transition, Disclosure } from '@headlessui/react'
import {
  ChevronDownIcon,
  GlobeIcon,
  MenuIcon,
  UserCircleIcon,
  XIcon,
  BellIcon,
} from '@heroicons/react/outline'
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Navigation = () => {
  const navigation = [
    { name: 'Private', to: routes.private(), autenticated: true },
    { name: 'Admin', to: routes.adminUsers(), role: 'admin' },
    { name: 'About', to: routes.about() },
    {
      name: 'Github',
      href: 'https://github.com/esteban-url/trailhead-rw',
    },
  ]
  return (
    <Disclosure as="nav" className="bg-gray-800 z-20">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link to={routes.home()}>
                      <GlobeIcon className="h-8 w-auto sm:h-10 text-yellow-400" />
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <NavItem
                          key={item.name}
                          item={item}
                          activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  {/* Profile dropdown */}
                  <LoginMenu />
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="border-b border-gray-700 md:hidden">
            <div className="px-2 py-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                />
              ))}
            </div>
            <LoginMenu mobile={true} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

const LoginMenu = ({ mobile }) => {
  const userNavigation = [
    { name: 'Your Profile', to: '#' },
    { name: 'Settings', to: '#' },
  ]
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  if (isAuthenticated) {
    if (mobile) {
      return (
        <>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                {/* <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                /> */}
                <UserCircleIcon className="h-10 w-10 text-gray-400" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {currentUser.user_metadata.full_name}
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  {currentUser.email}
                </div>
              </div>
              <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {userNavigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                />
              ))}
              <button
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <div className="ml-4 flex items-center md:ml-6">
          <button className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <Menu as="div" className="ml-3 relative">
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className="max-w-xs text-gray-400 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 lg:p-2 lg:rounded-md ">
                    <UserCircleIcon className=" h-8 w-8" />
                    {/* <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        /> */}
                    <span className="hidden ml-3  text-sm font-medium lg:block">
                      <span className="sr-only">Open user menu for </span>
                      {currentUser?.user_metadata?.full_name}
                    </span>
                    <ChevronDownIcon
                      className="hidden flex-shrink-0 ml-1 h-5 w-5 lg:block"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                    <Menu.Item key="Logout">
                      <button
                        className="block px-4 w-full py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        onClick={logOut}
                      >
                        Sign out
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      )
    }
  } else {
    return (
      <button
        className={`${
          mobile ? 'w-full' : ''
        } py-2 px-6 bg-primary-500 border border-transparent rounded-md shadow-md text-base font-medium text-white hover:bg-primary-600`}
        onClick={logIn}
      >
        Login
      </button>
    )
  }
}

const NavItem = ({ item, className, activeClassName }) => {
  const { isAuthenticated, hasRole } = useAuth()
  if (item.href) {
    return (
      <a href={item.href} className={className}>
        {item.name}
      </a>
    )
  } else {
    return (
      <>
        {(!item.autenticated && !item.role) ||
        isAuthenticated ||
        hasRole(item.role) ? (
          <NavLink
            to={item.to}
            className={className}
            activeClassName={activeClassName}
          >
            {item.name}
          </NavLink>
        ) : null}
      </>
    )
  }
}
export default Navigation
