// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { navLinks } from '../../../constants';
import Link from 'next/link';
import Image from 'next/image';
import { Collection } from '../../../components/shared/Collection';
import { getAllImages } from '@/lib/actions/image.action';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error: Type error
const Home = async (props: SearchParamProps) => {
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const searchParams = await props.searchParams;
  //@ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const page = ( Number(searchParams?.page)) || 1;
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const searchQuery =( (searchParams?.query as string)) || '';
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