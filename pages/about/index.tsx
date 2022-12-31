import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import Faqs from "../../components/Faqs";
import Layout from "../../components/Layout";
import NotionService from "../../services/service";
import profilePic from "../../public/me.png";

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
};

export default function AboutPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const numberOfPosts = posts?.length;
  return (
    <Layout>
      <div className="flex flex-col gap-10 mb-10">
        <h1 className="text-4xl text-center tracking-wide font-light">
          Meet Oddinary
        </h1>
        <div className="w-full h-96 rounded-2xl relative overflow-hidden">
          <Image
            className="w-full h-full object-cover object-center block"
            src={profilePic}
            alt="profile image"
            fill
            priority={true}
            placeholder={"blur"}
          />
        </div>
        <h1 className="text-2xl tracking-wide font-light">
          Sharing my coding journey and the lessons I've learned along the way
          and continuing to learn and grow as a developer.
        </h1>
        <p className="font-light text-justify text-lg">
          Hi there! My name is Kyaw Za Yan Naing and I am a web developer with a
          passion for creating and problem-solving. I have been programming for
          3 years and have experience working with languages such as javascript,
          typescript and python. I am excited to share my knowledge and
          experiences with the community through this blog, and I hope to
          inspire and empower others to pursue a career in tech. Thank you for
          joining me on this journey!
        </p>
        <div className="flex md:flex-row my-10 flex-col md:gap-20 gap-10 justify-center items-center">
          <div className="text-center">
            <h1 className="text-7xl font-light mb-4">3</h1>
            <p className="text-sm font-extralight dark:opacity-40">
              Years into web-dev
            </p>
          </div>
          <div className="text-center">
            <h1 className="text-7xl font-light mb-4">{numberOfPosts}</h1>
            <p className="text-sm font-extralight dark:opacity-40">
              Current blog posts
            </p>
          </div>
          <div className="text-center">
            <h1 className="text-7xl font-light mb-4">26</h1>
            <p className="text-sm font-extralight dark:opacity-40">
              Github Projects
            </p>
          </div>
        </div>
        <h1 className="text-3xl font-light">Vision</h1>
        <div className="grid gap-5 md:grid-cols-2 grid-cols-1">
          <div>
            <h1 className="font-normal mb-2 text-lg">
              Learning and Growing Together
            </h1>
            <p className="text-sm dark:opacity-50 font-extralight leading-5 tracking-wide">
              Creating a community where software developers of all levels can
              come together to learn, share their experiences, and support one
              another in their professional growth.
            </p>
          </div>
          <div>
            <h1 className="font-normal mb-2 text-lg">
              Sharing My Journey with the World
            </h1>
            <p className="text-sm dark:opacity-50 font-extralight leading-5 tracking-wide">
              Documenting and sharing the journey of learning and growing as a
              developer, in the hopes of inspiring others to pursue their own
              passions and goals.
            </p>
          </div>
          <div>
            <h1 className="font-normal mb-2 text-lg">
              Small Steps Toward a Better Future
            </h1>
            <p className="text-sm dark:opacity-50 font-extralight leading-5 tracking-wide">
              Contributing to the advancement of technology in small but
              meaningful ways, and to inspire others to do the same.
            </p>
          </div>
          <div>
            <h1 className="font-normal text-lg mb-2">
              Building a Stronger Tech Community
            </h1>
            <p className="text-sm dark:opacity-50 font-extralight leading-5 tracking-wide">
              Bring together the like-minded individuals who are passionate
              about programming and technology, and to foster a sense of
              collaboration and support within the community.
            </p>
          </div>
        </div>
        <h1 className="font-light text-3xl">FAQs</h1>
        <div className="h-full">
          <Faqs />
        </div>
        <div className="font-light text-md transition-all duration-300 ease-out">
          <Link
            scroll={false}
            href={"/contact"}
            className="dark:bg-zinc-200 bg-gray-300 text-black hover:dark:text-white hover:text-black hover:dark:bg-transparent hover:bg-transparent py-3 px-7 rounded-full border-2 hover:dark:border-zinc-800 hover:border-gray-300 transition-all duration-300 ease-out"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </Layout>
  );
}
