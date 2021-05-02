import Navigation from 'src/components/Navigation/Navigation'

const Header = ({ children, title }) => {
  return (
    <header className={`relative ${children ? 'pb-36' : 'pb-10'} bg-gray-800`}>
      <Navigation />
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://source.unsplash.com/1600x900/?trees,nature,trails,mountains"
          alt=""
        />
        <div
          className="absolute inset-0 bg-gray-700"
          style={{ mixBlendMode: 'multiply' }}
          aria-hidden="true"
        />
      </div>

      <div
        className={`relative ${
          children ? 'mt-24 md:mt-32 ' : 'mt-6'
        } max-w-md mx-auto px-4 ${
          children ? 'pb-32' : 'pb-6'
        } sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8`}
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children}
      </div>
    </header>
  )
}

export default Header
