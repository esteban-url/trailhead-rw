import PublicLayout from 'src/layouts/PublicLayout/PublicLayout'

const PrivatePage = () => {
  return (
    <PublicLayout>
      <h1>Private Page</h1>
      <p>this is for logged in trailhead users only</p>
    </PublicLayout>
  )
}

export default PrivatePage
