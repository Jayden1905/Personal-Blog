import { BlogPost } from "../interfaces/schema";
import BlogCard from "./BlogCard";
import { useGlobalContext } from "./context/ContextProvider";
import SearchResults from "./SearchResults";

type Props = {
  posts: BlogPost[];
};

export default function BlogWrapper({ posts }: Props) {
  const { useStore } = useGlobalContext();
  const [searchInput] = useStore((store) => store.searchInput);
  return (
    <>
      {searchInput === "" ? (
        <div className="grid grid-cols-1 gap-10">
          {posts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <SearchResults posts={posts} />
      )}
    </>
  );
}
