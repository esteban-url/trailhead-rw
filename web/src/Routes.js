// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private, Set } from '@redwoodjs/router'
import { HelmetProvider } from 'react-helmet-async'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'
import PublicLayout from 'src/layouts/PublicLayout/PublicLayout'
import { PageTitleProvider } from 'src/utils/PageTitle'
const Routes = () => {
  return (
    <Router>
      <HelmetProvider>
        <Route path="/" page={HomePage} name="home" />
        <Set wrap={[PageTitleProvider, PublicLayout]}>
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
      </HelmetProvider>
    </Router>
  )
}

export default Routes
