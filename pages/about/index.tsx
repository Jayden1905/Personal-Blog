import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import Faqs from "../../components/Faqs";
import Layout from "../../components/Layout";
import NotionService from "../../services/service";
import profilePic from "../../public/me.png";
import { getExperience } from "../../services/util";

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

const experience = getExperience();

export default function AboutPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const numberOfPosts = posts?.length;

  return (
    <Layout>
      <div className="mb-10 flex flex-col gap-10">
        <h1 className="text-center text-4xl font-light tracking-wide">
          Meet Oddinary
        </h1>
        <div className="relative h-96 w-full overflow-hidden rounded-2xl">
          <Image
            className="block aspect-auto h-full w-full object-cover object-center"
            src={profilePic}
            alt="profile image"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            priority
            placeholder={"blur"}
          />
        </div>
        <h1 className="text-2xl font-light tracking-wide">
          Sharing my coding journey and the lessons I've learned along the way
          and continuing to learn and grow as a developer.
        </h1>
        <p className="text-justify text-lg font-light">
          Hi there! My name is Kyaw Za Yan Naing and I am a web developer with a
          passion for creating and problem-solving. I have been programming for
          {" " + experience} years and have experience working with languages
          such as javascript, typescript and python. I am excited to share my
          knowledge and experiences with the community through this blog, and I
          hope to inspire and empower others to pursue a career in tech. Thank
          you for joining me on this journey!
        </p>
        <div className="my-10 flex flex-col items-center justify-center gap-10 md:flex-row md:gap-20">
          <div className="text-center">
            <h1 className="mb-4 text-7xl font-light">{experience}</h1>
            <p className="text-sm font-extralight dark:opacity-40">
              Years into web-dev
            </p>
          </div>
          <div className="text-center">
            <h1 className="mb-4 text-7xl font-light">{numberOfPosts}</h1>
            <p className="text-sm font-extralight dark:opacity-40">
              Current blog posts
            </p>
          </div>
          <div className="text-center">
            <h1 className="mb-4 text-7xl font-light">26</h1>
            <p className="text-sm font-extralight dark:opacity-40">
              Github Projects
            </p>
          </div>
        </div>
        <h1 className="text-3xl font-light">Vision</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <h1 className="mb-2 text-lg font-normal">
              Learning and Growing Together
            </h1>
            <p className="text-sm font-extralight leading-5 tracking-wide dark:opacity-50">
              Creating a community where software developers of all levels can
              come together to learn, share their experiences, and support one
              another in their professional growth.
            </p>
          </div>
          <div>
            <h1 className="mb-2 text-lg font-normal">
              Sharing My Journey with the World
            </h1>
            <p className="text-sm font-extralight leading-5 tracking-wide dark:opacity-50">
              Documenting and sharing the journey of learning and growing as a
              developer, in the hopes of inspiring others to pursue their own
              passions and goals.
            </p>
          </div>
          <div>
            <h1 className="mb-2 text-lg font-normal">
              Small Steps Toward a Better Future
            </h1>
            <p className="text-sm font-extralight leading-5 tracking-wide dark:opacity-50">
              Contributing to the advancement of technology in small but
              meaningful ways, and to inspire others to do the same.
            </p>
          </div>
          <div>
            <h1 className="mb-2 text-lg font-normal">
              Building a Stronger Tech Community
            </h1>
            <p className="text-sm font-extralight leading-5 tracking-wide dark:opacity-50">
              Bring together the like-minded individuals who are passionate
              about programming and technology, and to foster a sense of
              collaboration and support within the community.
            </p>
          </div>
        </div>
        <h1 className="text-3xl font-light">FAQs</h1>
        <div className="h-full">
          <Faqs />
        </div>
        <div className="text-md font-light transition-all duration-300 ease-out">
          <Link
            scroll={false}
            href={"/contact"}
            className="rounded-full border-2 bg-gray-300 py-3 px-7 text-black transition-all duration-300 ease-out hover:border-gray-300 hover:bg-transparent hover:text-black dark:bg-zinc-200 hover:dark:border-zinc-800 hover:dark:bg-transparent hover:dark:text-white"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </Layout>
  );
}
