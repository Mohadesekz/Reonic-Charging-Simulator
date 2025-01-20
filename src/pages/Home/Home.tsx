import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-full">
        <div className="hidden md:block absolute z-0 left-[300px] top-0 w-full rotate-[70deg]">
          <div className="-mx-[1000px] h-[60px] bg-reonic-yellow"></div>
          <div className="-mx-[1000px] h-[60px] bg-reonic-green"></div>
          <div className="-mx-[1000px] h-[60px] bg-reonic-red"></div>
          <div className="-mx-[1000px] h-[60px] bg-reonic-blue"></div>
        </div>
        <div className="md:hidden absolute top-0 z-0 w-full rotate-[55deg] left-[100px]">
          <div className="-mx-[500px] h-[20px] bg-reonic-yellow"></div>
          <div className="-mx-[500px] h-[20px] bg-reonic-green"></div>
          <div className="-mx-[500px] h-[20px] bg-reonic-red"></div>
          <div className="-mx-[500px] h-[20px] bg-reonic-blue"></div>
        </div>
      </div>

      <div className="absolute bg-gradient-to-t z-40 from-gray-100 to-transparent bottom-0 left-0 w-full md:pt-14 pb-8" />
      <div className="flex items-center justify-center md:justify-start h-full z-10 px-5 lg:px-10">
        <div className="max-w-xl">
          <p className="font-medium text-wrap mb-4">EV Charging Simulation</p>
          <p className="text-[13px] text-wrap mt-4 leading-[18px] text-gray-500">
            Experience the efficiency of electric vehicle charging with our
            advanced simulation tool. Get insights into charging dynamics and
            optimize your charging experience.
          </p>
          <div className="mt-5 md:mb-24 md:10">
            <Link
              to="/simulation"
              className="font-medium w-fit flex whitespace-nowrap items-center rounded-full py-1.5 px-4 text-sm transition-transform  bg-black text-white hover:text-white"
            >
              Start Simulation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
