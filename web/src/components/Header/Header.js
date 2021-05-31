import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  GlobeIcon,
  MenuIcon,
  UserCircleIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Button } from '../common/Button/Button'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Header = ({ children, title }) => {
  return (
    <header className={`relative ${children ? 'pb-36' : 'pb-10'} bg-gray-800`}>
      <Nav />
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://source.unsplash.com/1600x900/?trees,nature,trails,mountains"
          alt=""
        />
        <div
          className="absolute inset-0 bg-gray-700"
          style={{ mixBlendMode: 'multiply' }}
          aria-hidden="true"
        />
      </div>

      <div
        className={`relative ${
          children ? 'mt-24 md:mt-32 ' : 'mt-6'
        } max-w-md mx-auto px-4 ${
          children ? 'pb-32' : 'pb-6'
        } sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8`}
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children}
      </div>
    </header>
  )
}
const Nav = () => {
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
    <Popover as="div" className="relative z-20">
      {({ open }) => (
        <>
          <nav
            className="relative max-w-7xl mx-auto flex items-center justify-between pt-6 pb-2 px-4 sm:px-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full lg:w-auto">
                <Link to={routes.home()}>
                  <span className="sr-only">Trailhead</span>
                  {/* <img
                      className="h-8 w-auto sm:h-10"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=primary&shade=500"
                      alt=""
                    /> */}
                  <GlobeIcon className="h-8 w-auto sm:h-10 text-primary-500" />
                </Link>
                <div className="-mr-2 flex items-center lg:hidden">
                  <Popover.Button className="bg-gray-900 bg-opacity-0 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-opacity-100 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden space-x-10 lg:flex lg:ml-10">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </div>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <LoginMenu />
            </div>
          </nav>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top lg:hidden"
            >
              <div className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=emerald&shade=500"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6  divide-y divide-gray-200">
                  <div className="px-2 space-y-1 mb-2">
                    {navigation.map((item) => (
                      <NavItem
                        key={item.name}
                        item={item}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                      />
                    ))}
                  </div>
                  <div className="pt-2 px-2 space-y-1">
                    <LoginMenu mobile={true} />
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
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
          {userNavigation.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            />
          ))}
          <Button
            className="block px-3 text-left w-full py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            onClick={logOut}
          >
            Logout
          </Button>
        </>
      )
    } else {
      return (
        <Menu as="div" className="ml-3 relative">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="max-w-xs text-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 lg:p-2 lg:rounded-md ">
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
                    <Button
                      className="block px-4 w-full py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={logOut}
                    >
                      Sign out
                    </Button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
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

const NavItem = ({ item, className }) => {
  if (!className) {
    className = 'text-base font-medium text-white hover:text-primary-200'
  }
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
          <Link to={item.to} className={className}>
            {item.name}
          </Link>
        ) : null}
      </>
    )
  }
}

export default Header
