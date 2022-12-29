import { BlogPost } from "../interfaces/schema";
import BlogCard from "./BlogCard";
import { useGlobalContext } from "./context/ContextProvider";

type Props = {
  posts: BlogPost[];
};

export default function SearchResults({ posts }: Props) {
  const { useStore } = useGlobalContext();
  const [searchInput] = useStore((store) => store.searchInput);
  const filterPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  console.log(filterPosts);

  return (
    <div className="grid grid-cols-1 gap-10">
      {searchInput !== ""
        ? filterPosts.map((post) => <BlogCard post={post} />)
        : ""}
    </div>
  );
}
