import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();

    const animateTitle = () => {
      setShowTitle(true);
      setTimeout(() => {
        setShowTitle(false);
      }, 2000); // Adjust the duration of animation
    };

    animateTitle();

    const interval = setInterval(animateTitle, 4000); // Adjust the interval between animations

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        
      <h1 className={`text-3xl font-bold lg:text-6xl ${showTitle ? 'typing-animation' : 'opacity-0'}`}>
          Welcome to Jayanth's Blogs
        </h1>        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, programming languages, machine learning, deep learning, natural language processing, and my thoughts.
        </p>

        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
     

      </div>
    

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
  {posts && posts.length > 0 && (
    <div className='flex flex-col gap-6 items-center'>
      <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
      <div className='flex flex-wrap justify-center gap-4'>
        {posts.slice(0,6).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <Link
        to={'/search'}
        className='text-lg text-teal-500 hover:underline text-center'
      >
        View all posts
      </Link>
    </div>
  )}
</div>

    </div>
  );
}
