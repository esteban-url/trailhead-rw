import { Button, Submit } from './Button'

export const primary = () => {
  return (
    <>
      <Button variant="primary" size="xl">
        Button
      </Button>{' '}
      <Button variant="primary" size="lg">
        Button
      </Button>{' '}
      <Button variant="primary">Button</Button>{' '}
      <Button variant="primary" size="sm">
        Button
      </Button>{' '}
      <Button variant="primary" size="xs">
        Button
      </Button>
    </>
  )
}
export const deleteButton = () => {
  return (
    <>
      <Button size="xl" variant="delete">
        Button
      </Button>{' '}
      <Button size="lg" variant="delete">
        Button
      </Button>{' '}
      <Button variant="delete">Button</Button>{' '}
      <Button size="sm" variant="delete">
        Button
      </Button>{' '}
      <Button size="xs" variant="delete">
        Button
      </Button>
    </>
  )
}
export const basicButton = () => {
  return (
    <>
      <Button size="xl">Button</Button> <Button size="lg">Button</Button>{' '}
      <Button>Button</Button> <Button size="sm">Button</Button>{' '}
      <Button size="xs">Button</Button>
    </>
  )
}

export const SubmitButton = () => {
  return (
    <>
      <Submit size="xl">Submit</Submit> <Submit size="lg">Submit</Submit>{' '}
      <Submit>Submit</Submit> <Submit size="sm">Submit</Submit>{' '}
      <Submit size="xs">Submit</Submit>
    </>
  )
}

export default { title: 'Components/Button' }
