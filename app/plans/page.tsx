import { Search, Filter } from 'lucide-react'
import React from 'react'
import { plans } from '@/data/planes'
import MainCard from '@/ui/components/cards/MainCard'

function page() {
  const displayPlans = [...plans, ...plans, ...plans, ...plans]

  return (
    <div className='w-full min-h-screen pt-20 bg-gray-50/50'>
      <div className='w-11/12 mx-auto h-[60vh] md:h-[80vh] mt-6 rounded-2xl bg-center bg-cover bg-no-repeat bg-[url("/plans/hero.png")]'>
        <div className='w-full h-full rounded-2xl backdrop-brightness-75 flex items-center justify-center flex-col gap-5'>
            <h1 className='text-white font-bold text-3xl md:text-5xl text-center mb-10'>Explore Volunteering Opportunities</h1>
            <form className='bg-transparent border-1 border-white rounded-full  flex items-center justify-between w-11/12 md:w-1/2'>
                <input type="text" placeholder='Enter a city or region' className='ml-6 bg-transparent text-white outline-none border-none p-2 w-full' />
                <button className='bg-white text-white text-center rounded-full p-2 flex items-center gap-3 px-6'>
                    <span className='hidden md:block text-black'>
                    Search
                    </span>
                    <Search className='text-black'/>
                </button>
            </form>
        </div>
      </div>

      {/* Available Projects Section */}
      <div className="w-11/12 mx-auto py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Available Volunteering Projects</h2>
          <button className="flex items-center gap-2 text-gray-700 font-semibold border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {displayPlans.map((plan, index) => (
            <MainCard key={`${plan.id}-${index}`} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
