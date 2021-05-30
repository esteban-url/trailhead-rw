import Button from './Button'

export const primary = () => {
  return (
    <>
      <Button size="xl">Button</Button> <Button size="lg">Button</Button>{' '}
      <Button>Button</Button> <Button size="sm">Button</Button>{' '}
      <Button size="xs">Button</Button>
    </>
  )
}
export const deleteButton = () => {
  return (
    <>
      <Button size="xl" type="delete">
        Button
      </Button>{' '}
      <Button size="lg" type="delete">
        Button
      </Button>{' '}
      <Button type="delete">Button</Button>{' '}
      <Button size="sm" type="delete">
        Button
      </Button>{' '}
      <Button size="xs" type="delete">
        Button
      </Button>
    </>
  )
}
export const basicButton = () => {
  return (
    <>
      <Button size="xl" type="basic">
        Button
      </Button>{' '}
      <Button size="lg" type="basic">
        Button
      </Button>{' '}
      <Button type="basic">Button</Button>{' '}
      <Button size="sm" type="basic">
        Button
      </Button>{' '}
      <Button size="xs" type="basic">
        Button
      </Button>
    </>
  )
}

export default { title: 'Components/Button' }
