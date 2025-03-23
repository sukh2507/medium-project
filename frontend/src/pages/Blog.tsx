import { useParams } from 'react-router-dom';
import { FullBlog } from '../components/FullBlog';
import { useBlogs } from '../components/hooks';

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlogs({ id });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        Blog not found
      </div>
    );
  }

  return <FullBlog blog={blog} />;
};