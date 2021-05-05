import { Switch as HeadlessSwitch } from '@headlessui/react'
import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Switch = ({ defaultValue = false, label, onChange }) => {
  const [checked, setChecked] = useState(defaultValue)
  const handleChange = (val) => {
    setChecked(val)
    onChange(val)
  }
  return (
    <HeadlessSwitch
      checked={checked}
      onChange={handleChange}
      className={classNames(
        checked ? 'bg-primary-600' : 'bg-gray-200',
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
      )}
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className={classNames(
          checked ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
        )}
      />
    </HeadlessSwitch>
  )
}
export default Switch
