import { useState } from 'react'
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const RadioGroup = ({ options = [], defaultValue, label, onChange }) => {
  const [selected, setSelected] = useState(() =>
    options.find((x) => x.value === defaultValue?.value)
  )
  const handleChange = (value) => {
    setSelected(value)
    onChange(value)
  }
  return (
    <HeadlessRadioGroup value={selected} onChange={handleChange}>
      <HeadlessRadioGroup.Label className="sr-only">
        {label}
      </HeadlessRadioGroup.Label>
      <div className="bg-white rounded-md -space-y-px">
        {options.map((option, optionIdx) => (
          <HeadlessRadioGroup.Option
            key={option.name}
            value={option}
            className={({ checked }) =>
              classNames(
                optionIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                optionIdx === options.length - 1
                  ? 'rounded-bl-md rounded-br-md'
                  : '',
                checked
                  ? 'bg-primary-50 border-primary-200 z-10'
                  : 'border-gray-200',
                'relative border p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked
                      ? 'bg-primary-600 border-transparent'
                      : 'bg-white border-gray-300',
                    active ? 'ring-2 ring-offset-2 ring-primary-500' : '',
                    'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <div className="ml-3 flex flex-col">
                  <HeadlessRadioGroup.Label
                    as="span"
                    className={classNames(
                      checked ? 'text-primary-900' : 'text-gray-900',
                      'block text-sm font-medium'
                    )}
                  >
                    {option.name}
                  </HeadlessRadioGroup.Label>
                  <HeadlessRadioGroup.Description
                    as="span"
                    className={classNames(
                      checked ? 'text-primary-700' : 'text-gray-500',
                      'block text-sm'
                    )}
                  >
                    {option.description}
                  </HeadlessRadioGroup.Description>
                </div>
              </>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </div>
    </HeadlessRadioGroup>
  )
}

export default RadioGroup
