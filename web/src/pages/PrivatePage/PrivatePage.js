import { Link, routes } from '@redwoodjs/router'

const PrivatePage = () => {
  return (
    <>
      <h1>Private Page</h1>
      <p>this is for logged in trailhead users only</p>

      <Link to={routes.home()}>Home</Link>
    </>
  )
}

export default PrivatePage
