import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/Layout'
import profilePic from '../../public/pic.jpg'

type ContactProps = {
  name: string
  picture: typeof profilePic
  description: string
  email: string
  portfolio: string
  instagram: string
  github: string
  youtube: string
}

type Props = {
  contactInfo: ContactProps
}

export const getStaticProps = async () => {
  const contactInfo: ContactProps = {
    name: 'Kyaw Za Yan Naing',
    picture: profilePic,
    description: 'Indie Web Developer & Full-time Student',
    email: 'kyawzayannaing@gmail.com',
    portfolio: 'https://www.oddinary.tech/',
    instagram: 'https://www.instagram.com/kz_potay/?igshid=YTY2NzY3YTc%3D',
    github: 'https://github.com/Jayden1905',
    youtube: 'https://www.youtube.com/@kyawzayannaing8007'
  }

  return {
    props: {
      contactInfo
    }
  }
}

export default function ContactPage ({ contactInfo }: Props) {
  return (
    <div>
      <Layout>
        <div className='w-full sm:h-[70vh] h-full flex justify-center items-center sm:mb-48 mb-60'>
          <div className='text-center flex flex-col gap-4 max-w-xl mx-auto'>
            <h1 className='text-3xl font-light sm:text-4xl'>
              Keep in Touch With Me
            </h1>
            <h1 className='font-extralight text-lg mb-8'>
              I’m always looking to collaborate on interesting projects with
              great people. Need a supportive hand? I have two!
            </h1>
            <div className='card p-2 dark:shadow-none shadow-md border-2 border-zinc-500 border-opacity-20 rounded-xl flex flex-col justify-center items-center gap-6 py-10'>
              <div className='sm:w-24 sm:h-24 w-16 h-16 rounded-full overflow-hidden'>
                <Image
                  src={contactInfo.picture}
                  alt='profile image'
                  className='w-full h-full object-cover object-bottom'
                  width={1000}
                  height={1000}
                  placeholder='blur'
                />
              </div>
              <div className='description'>
                <h1 className='sm:text-2xl text-lg mb-2'>{contactInfo.name}</h1>
                <p className='font-extralight sm:text-lg text-sm opacity-60 tracking-wider'>
                  {contactInfo.description}
                </p>
              </div>
              <div className='contact-section flex sm:flex-row flex-col w-full gap-4 sm:px-10 px-0'>
                <Link
                  href={contactInfo.portfolio}
                  target='_blank'
                  className='w-full font-extralight border-2 border-zinc-500 py-3 rounded-full border-opacity-20 hover:border-opacity-40 transition-all duration-300 ease-out'
                >
                  Know me more
                </Link>
                <Link
                  href={`mailto:${contactInfo.email}`}
                  target='_blank'
                  className='w-full font-extralight border-2 border-zinc-500 py-3 rounded-full border-opacity-20 hover:border-opacity-40 transition-all duration-300 ease-out'
                >
                  Drop an E-Mail
                </Link>
              </div>
            </div>
            <div className='social-links text-sm font-extralight flex gap-8 mx-auto mt-6'>
              <Link
                href={contactInfo.github}
                className='hover:underline underline-offset-4'
                target='_blank'
              >
                Git Hub
              </Link>
              <Link
                href={contactInfo.instagram}
                className='hover:underline underline-offset-4'
                target='_blank'
              >
                Instagram
              </Link>
              <Link
                href={contactInfo.youtube}
                className='hover:underline underline-offset-4'
                target='_blank'
              >
                Youtube
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
