import Switch from './Switch'

export const generated = () => {
  const onChange = (checked) => {
    console.log(checked)
  }
  return <Switch onChange={onChange} />
}

export default { title: 'Components/common/Switch' }
