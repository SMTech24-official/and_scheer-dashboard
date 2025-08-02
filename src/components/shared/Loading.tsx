
const Loading = () => {
  return (
   <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
      <div className="text-center">
        {/* Spinner */}
        <div
          className="animate-spin border-8 border-t-8 border-solid rounded-full w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-4"
          style={{
            borderColor: 'rgb(100, 149, 237)', // RGB color for the spinner
            borderTopColor: 'rgb(0, 123, 255)', // RGB color for the top part of the spinner
          }}
        ></div>
        {/* Loading Text */}
        <p className="text-lg sm:text-xl md:text-2xl" style={{ color: 'rgb(50, 50, 50)' }}>
          Loading...
        </p>
      </div>
    </div>
  )
}

export default Loading