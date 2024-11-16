/* eslint-disable */
import React from 'react'
import { navLinks } from '../../../constants';
import Link from 'next/link';
import Image from 'next/image';
import { Collection } from '../../../components/shared/Collection';
import { getAllImages } from '@/lib/actions/image.action';
 // eslint-disable-next-line 
const Home = async (props: SearchParamProps) => {
  const searchParams = await props.searchParams;
  const page = ( Number(searchParams?.page)) || 1;
  const searchQuery =( (searchParams?.query as string)) || '';
  console.log('hiii');
  const images= await getAllImages({page, searchQuery})

  
  return (
    <div>
      <section className="home">
        <h1 className="home-heading">
          Convert your imagination to visions
        </h1>
        <ul className="flex-center  w-full gap-20">
        {navLinks.slice(1,6).map((link)=>(
          <Link
           key={link.route}
           href={link.route}
           className='text-gray-700 flex-center flex-col  gap-8'>
              <li className="flex-center w-fit rounded-full bg-white p-3">
              <Image src={link.icon} alt="image" width={24} height={24} />

            </li>
            <p className='flex-center w-fit px-5'><>{link.label}</></p>

          </Link>

        ))}
        </ul>


       
      </section>
      <section className='sm:mt-12 '>
        <Collection 
        hasSearch={true} 
        images={images?.data}
        totalPages= {images?.totalPage}
        page={page}
         />
      </section>
    </div>
  )
}

export default Home;