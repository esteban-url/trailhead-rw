import { useState, useEffect } from 'react'
import { RadioGroup as HUIRadioGroup } from '@headlessui/react'
import Avatar from 'boring-avatars'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AvatarTypesRadio = ({
  user,
  options,
  defaultValue = 'beam',
  onChange,
}) => {
  const [selected, setSelected] = useState()

  useEffect(() => {
    if (options && defaultValue) {
      setSelected(options.find((x) => x.name === defaultValue.name))
    }
  }, [options, defaultValue])

  const handleChange = (value) => {
    setSelected(value)
    onChange(value)
  }

  return (
    <HUIRadioGroup value={selected} onChange={handleChange}>
      <HUIRadioGroup.Label className="sr-only">Avatar Type</HUIRadioGroup.Label>
      <div className="flex justify-items-center w-full  space-x-4">
        {options?.map((avatarType) => (
          <HUIRadioGroup.Option
            key={avatarType.name}
            value={avatarType}
            className={({ active }) =>
              classNames(
                active ? 'ring-1 ring-offset-2 ring-primary-500' : '',
                'relative block rounded-full border border-gray-300 bg-white shadow-sm p-1.5 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'
              )
            }
          >
            {({ checked }) => (
              <>
                <div className="flex items-center">
                  <div className="text-sm">
                    <HUIRadioGroup.Label className="text-center font-medium text-gray-900">
                      <Avatar
                        className="w-16 h-16"
                        name={user?.email || 'new user'}
                        variant={avatarType.name}
                      />
                      <span
                        data-testid={checked ? avatarType.name : ''}
                        className="sr-only"
                      >
                        {avatarType.name}
                      </span>
                    </HUIRadioGroup.Label>
                  </div>
                </div>
                <div
                  className={classNames(
                    checked ? 'border-primary-500' : 'border-transparent',
                    'absolute -inset-px rounded-full border-2 pointer-events-none'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </HUIRadioGroup.Option>
        ))}
      </div>
    </HUIRadioGroup>
  )
}

export default AvatarTypesRadio
