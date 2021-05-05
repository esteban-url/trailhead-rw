import RadioGroup from './RadioGroup'
import { options } from './RadioGroup.mock'

export const generated = () => {
  return <RadioGroup {...options()} onChange={console.log} />
}

export default { title: 'components/common/RadioGroup' }
