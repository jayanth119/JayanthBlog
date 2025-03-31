import axios from 'axios';
import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

const Aicreate = async () => {
  let blogContent, dynamicTitle;
  try {
    // Call the FastAPI endpoint to generate the AI blog post
    const fastApiUrl = process.env.FAST_API_URL || 'https://silver-octo-winner.onrender.com/blog';
    const response = await axios.get(fastApiUrl);
    
    // Expect the response to be an object with keys "blog_post" and "title"
    const data = response.data;
    if (data && typeof data === 'object' && data.blog_post && data.title) {
      blogContent = data.blog_post;
      dynamicTitle = data.title;
    } else {
      // If the response structure is unexpected, fallback
      blogContent = typeof data === 'string' ? data : JSON.stringify(data);
      dynamicTitle = "AI Generated Blog Post " + new Date().toISOString();
    }
  } catch (error) {
    console.error(errorHandler(500, 'Failed to fetch blog content from FastAPI'), error);
    return;
  }

  // Fallback: If dynamicTitle is undefined, set a default title
  if (!dynamicTitle) {
    dynamicTitle = "AI Generated Blog Post";
  }
  
  // Create a URL-friendly slug based on the dynamic title
  let slug = dynamicTitle
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  // Use a default system user ID for the blog post creator
  const systemUserId = process.env.SYSTEM_USER_ID || 'system';
  // generate random photo urls for the blog post 
    const randomPhotoUrl = `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/800/400`;

  // Create a new post using the dynamically generated title and content
  const newPost = new Post({
    userId: systemUserId,
    image: randomPhotoUrl,
    category: 'AI Generated',
    title: dynamicTitle,
    content: blogContent,
    slug: slug,
  });

  try {
    const savedPost = await newPost.save();
    console.log('New AI blog post created:', savedPost);
  } catch (error) {
    console.error("Error saving new blog post:", error);
    // Check if the error is due to duplicate key (e.g., duplicate slug)
    if (error.code === 11000) {
      // Append a timestamp to the slug and try saving again
      slug += '-' + Date.now();
      newPost.slug = slug;
      try {
        const savedPost = await newPost.save();
        console.log('New AI blog post created with updated slug:', savedPost);
      } catch (error2) {
        console.error("Error saving new blog post after updating slug:", error2);
        console.error(errorHandler(500, 'Failed to save new blog post'));
      }
    } else {
      console.error(errorHandler(500, 'Failed to save new blog post'));
    }
  }
};

export default Aicreate;
