function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
// const colorClass = (color) => {
//  return color?
// }
const Button = ({ size = 'md', icon, type = 'primary', children, ...rest }) => {
  const commonClasses = `inline-flex items-center border border-transparent shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 `
  const typeClasses = {
    primary: 'focus:ring-primary-500 bg-primary-600 hover:bg-primary-700',
    basic: 'focus:ring-gray-300 bg-gray-400 hover:bg-gray-500',
    delete: 'focus:ring-red-500 bg-red-600 hover:bg-red-700',
  }
  const sizeClasses = {
    xs: ' px-2.5 py-1.5 text-xs rounded',
    sm: ' px-3 py-2 text-sm leading-4 rounded-md',
    md: ' px-4 py-2 text-sm rounded-md',
    lg: ' px-4 py-2 text-base rounded-md',
    xl: ' px-6 py-3 text-base rounded-md',
  }
  return (
    <button
      type="button"
      className={classNames(
        commonClasses,
        typeClasses[type],
        sizeClasses[size]
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
