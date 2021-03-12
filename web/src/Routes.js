// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/about" page={AboutPage} name="about" />
      <Private unauthenticated="home">
        <Route path="/private" page={PrivatePage} name="private" />
      </Private>
      <Private unauthenticated="home" role="admin">
        <Route path="/admin/users/{id}/update" page={AdminUpdateUserPage} name="adminUpdateUser" />
        <Route path="/admin/users/new" page={AdminNewUserPage} name="adminNewUser" />
        <Route path="/admin/users/{id}" page={AdminViewUserPage} name="adminViewUser" />
        <Route path="/admin/users" page={AdminUsersPage} name="adminUsers" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
