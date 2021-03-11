import { Link, routes } from '@redwoodjs/router'

const AboutPage = () => {
  return (
    <>
      <h1>About Trailhead</h1>
      <Link to={routes.home()}>Home</Link>
    </>
  )
}

export default AboutPage
