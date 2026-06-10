import React from 'react'

const DashboardPage = () => {
  return (
   <div className="flex flex-col gap-4">
     <div className="p-4 grid grid-cols-4 gap-4">
      {
        [1,2,3,4].map((item) => (
          <div key={item} className='w-full h-20 border-b bg-gray-200 rounded-md shadow-md'></div>
        ))
      }
    </div>
     <div className="p-4 grid grid-cols-3 gap-4">
      {
        [1,2,3,4,5,6].map((item) => (
          <div key={item} className='w-full h-30 border-b bg-gray-200 rounded-md shadow-md'></div>
        ))
      }
    </div>
     <div className="p-4 grid grid-cols-2 gap-4">
      {
        [1,2].map((item) => (
          <div key={item} className='w-full h-40 border-b bg-gray-200 rounded-md shadow-md'></div>
        ))
      }
    </div>
   </div>
  )
}

export default DashboardPage