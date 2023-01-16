import React from 'react'
import ContactPage from '../../components/contactPage'
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
    youtube: 'https://www.youtube.com/@kyawzayannaing8007',
  }

  return {
    props: {
      contactInfo,
    },
  }
}

export default function Contact({ contactInfo }: Props) {
  return <ContactPage contactInfo={contactInfo} />
}
