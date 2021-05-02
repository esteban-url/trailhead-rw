import Header from 'src/components/Header/Header'
import { PageTitle } from 'src/utils/PageTitle'

const PrivatePage = () => {
  return (
    <>
      <PageTitle>Private Page</PageTitle>

      <p>This page is for logged in trailhead users only</p>
    </>
  )
}

export default PrivatePage
