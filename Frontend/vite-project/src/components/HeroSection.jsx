
import { HiOutlineArrowRight } from 'react-icons/hi'
import { Button } from 'flowbite-react'


const HeroSection = () => {
  return (
    <div>
      <div className='min-h-screen'>
        <div className='flex mx-auto md:flex-row md:items-center hero-section pt-10 '>
          
          <div className=' text-white w-[45%] mx-10' >
            <h1 className='text-2xl font-semibold '> See the Latest Blog's</h1>
            <p className='mt-10 text-lg'> </p>
            <div className=" mt-5 flex flex-row ">
            
              {/* <Button className="mx-5">
                See Benefits
                <HiOutlineArrowRight className="ml-2 h-5 w-5 " />
              </Button> */}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default HeroSection