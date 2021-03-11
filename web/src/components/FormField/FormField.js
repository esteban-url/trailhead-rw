import { Label, FieldError } from '@redwoodjs/forms'

const FormField = ({ as: As, name, label, register, validation, ...rest }) => {
  return (
    <div className="">
      <Label name={name} className="" errorClassName="">
        {label}
      </Label>

      <As
        name={name}
        className=""
        errorClassName=""
        ref={register}
        validation={validation}
        {...rest}
      />
      <FieldError name={name} className="" />
    </div>
  )
}

export default FormField
