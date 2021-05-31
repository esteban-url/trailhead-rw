import { HelmetProvider } from 'react-helmet-async'
import { PageTitleProvider } from 'src/utils/PageTitle'
import { Loading, Empty, Failure, Success } from './UserCell'
import { standard } from './UserCell.mock'

export const loading = () => {
  return Loading ? <Loading /> : null
}

export const empty = () => {
  return Empty ? <Empty /> : null
}

export const failure = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : null
}

export const success = () => {
  return Success ? (
    <HelmetProvider>
      <PageTitleProvider>
        <Success {...standard()} />{' '}
      </PageTitleProvider>
    </HelmetProvider>
  ) : null
}

export default { title: 'Cells/UserCell' }
