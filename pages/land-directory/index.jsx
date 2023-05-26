import React, { useState } from 'react'
import Link from 'next/link'
import image from '../../public/home.jpg'
import Image from 'next/image'
import permitData from '../../data/permits.js'
import addHyphens from '@/utils/urlFormat'

export default function index() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPermits, setFilteredPermits] = useState([])

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)

    const filteredPermits = permitData.filter((item) =>
      item.listingNames.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPermits(filteredPermits)
  }

  const permitsToDisplay = searchTerm ? filteredPermits : permitData

  return (
    <div className='flex justify-center mt-12 px-4'>
      <div className='max-w-7xl'>
        <h1 className='text-3xl md:text-5xl font-bold  '>
          Major planning projects
        </h1>
        <section className='mt-8 md:mt-12 flex flex-col justify-center  w-full gap-4'>
          <h2 className='text-2xl font-medium'>Current projects</h2>
          <p className='max-w-xl'>
            Below are some of the development projects in Orange County,
            California. The project links will take you to more detailed project
            descriptions, images, environmental documents, and supplementary
            information. If you would like additional information, feel free to
            contact our support team, or you may also contact the assigned case
            planner of the respective project.
          </p>
        </section>
        <section className='mt-12'>
          <h3 className='text-2xl font-medium'>
            Major Projects map and monthly development reports
          </h3>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4 justify-between max-w-xl mt-4'>
            <article className='flex flex-col gap-2  justify-center p-4 border   rounded-md'>
              <Image
                src={image}
                width={200}
                height={200}
                className='flex justify-center place-items-center w-full'
              />
              <Link
                href='/maps'
                className='text-blue-600 hover:text-blue-500 text-xl'
              >
                Interactive map
              </Link>
              <p className=''>
                Check out our interactive map for a list of major planning
                projects in different cities.
              </p>
            </article>
            <article className='flex flex-col gap-2 justify-center p-4 border  rounded-md'>
              <Image
                src={image}
                width={200}
                height={200}
                className='flex justify-center place-items-center w-full'
              />
              <Link
                href='/land-directory'
                className='text-blue-600 hover:text-blue-500 text-xl'
              >
                Monthly development project reports
              </Link>
              <p className=''>
                You can find a full list of pending development projects here.
              </p>
            </article>
          </div>
        </section>
        <section className='mt-12'>
          <div className='flex flex-col gap-4'>
            <h4 className='text-2xl font-medium'>All planning projects</h4>
            <p>Click on any of the projects below to see more information.</p>
            {/* list of planning projects */}
            <form className='w-full max-w-2xl'>
              <input
                className='w-full rounded-sm'
                type='text'
                placeholder='Search a project ListingName...'
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <header className='grid grid-cols-5 w-full gap-2 border mt-4 p-2 rounded-sm border-b-2'>
                <p className='text-left w-full'>Project Name</p>
                <p className='text-left w-full'>Address</p>
                <p className='text-left w-full'>Applicant</p>
                <p className='text-left w-full'>Lot Size</p>
                <p className='text-left w-full'>Project Status</p>
              </header>
              <ul>
                {permitsToDisplay.map((item) => (
                  <li
                    key={item.listingNames}
                    className='grid grid-cols-5 w-full  border  p-2 '
                  >
                    <Link
                      className='text-sm text-blue-600 hover:text-blue-500 underline'
                      href={`/land-directory/list-view/${addHyphens(
                        item.listingNames
                      )}`}
                    >
                      {item.listingNames}
                    </Link>
                    <p>{item.location}</p>
                    <p className='text-sm'>{item.projectManager}</p>
                    <p>{item.lotSize}</p>
                    <p>{item.status}</p>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
