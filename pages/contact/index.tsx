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
        <div className='mb-60 flex h-full w-full items-center justify-center'>
          <div className='mx-auto flex max-w-xl flex-col gap-4 text-center'>
            <h1 className='text-3xl font-light sm:text-4xl'>
              Keep in Touch With Me
            </h1>
            <h1 className='mb-8 text-lg font-extralight tracking-wider'>
              I’m always looking to collaborate on interesting projects with
              great people. Need a supportive hand? I have two!
            </h1>
            <div className='card flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-zinc-500 border-opacity-20 p-2 py-10 shadow-md dark:shadow-none'>
              <div className='h-16 w-16 overflow-hidden rounded-full sm:h-24 sm:w-24'>
                <Image
                  src={contactInfo.picture}
                  alt='profile image'
                  className='h-full w-full object-cover object-bottom'
                  width={1000}
                  height={1000}
                  placeholder='blur'
                  priority
                />
              </div>
              <div className='description'>
                <h1 className='mb-2 text-lg sm:text-2xl'>{contactInfo.name}</h1>
                <p className='text-sm font-extralight tracking-wider opacity-60 sm:text-lg'>
                  {contactInfo.description}
                </p>
              </div>
              <div className='contact-section flex w-full flex-col gap-4 px-0 sm:flex-row sm:px-10'>
                <Link
                  href={contactInfo.portfolio}
                  target='_blank'
                  className='w-full rounded-full border-2 border-zinc-500 border-opacity-20 py-3 font-extralight transition-all duration-300 ease-out hover:border-opacity-40'
                >
                  Know me more
                </Link>
                <Link
                  href={`mailto:${contactInfo.email}`}
                  target='_blank'
                  className='w-full rounded-full border-2 border-zinc-500 border-opacity-20 py-3 font-extralight transition-all duration-300 ease-out hover:border-opacity-40'
                >
                  Drop an E-Mail
                </Link>
              </div>
            </div>
            <div className='social-links mx-auto mt-6 flex gap-8 text-sm font-extralight'>
              <Link
                href={contactInfo.github}
                className='underline-offset-4 hover:underline'
                target='_blank'
              >
                Git Hub
              </Link>
              <Link
                href={contactInfo.instagram}
                className='underline-offset-4 hover:underline'
                target='_blank'
              >
                Instagram
              </Link>
              <Link
                href={contactInfo.youtube}
                className='underline-offset-4 hover:underline'
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
