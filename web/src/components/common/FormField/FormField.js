import { Label, FieldError } from '@redwoodjs/forms'

const FormField = ({
  as: As,
  name,
  label,
  register,
  validation,
  className,
  children,
  ...rest
}) => {
  return (
    <div className={`${className ? className : 'sm:col-span-3'}`}>
      <Label
        name={name}
        className="block text-sm font-medium text-gray-700"
        errorClassName=""
      >
        {label}
      </Label>
      <div className="mt-1">
        {children ? (
          children
        ) : (
          <>
            <As
              name={name}
              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              errorClassName="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              ref={register}
              validation={validation}
              {...rest}
            />
            <FieldError name={name} className="" />
          </>
        )}
      </div>
    </div>
  )
}

export default FormField
