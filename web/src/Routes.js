// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private, Set } from '@redwoodjs/router'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import PublicLayout from './layouts/PublicLayout/PublicLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={PublicLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={AboutPage} name="about" />
        <Private unauthenticated="home">
          <Route path="/private" page={PrivatePage} name="private" />
        </Private>
      </Set>
      <Set wrap={AdminLayout}>
        <Private unauthenticated="home" role="admin">
          <Route path="/admin/users/{id}/update" page={AdminUserUpdatePage} name="adminUserUpdate" />
          <Route path="/admin/users/new" page={AdminUserNewPage} name="adminUserNew" />
          <Route path="/admin/users/{id}" page={AdminUserViewPage} name="adminUserView" />
          <Route path="/admin/users" page={AdminUsersPage} name="adminUsers" />
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
