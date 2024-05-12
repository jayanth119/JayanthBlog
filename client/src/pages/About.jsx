export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <img src="https://github.com/jayanth119/JayanthBlog2/raw/master/static/imgs/client-img1.png" alt="Admin Photo" className="rounded-full w-48 h-48 mx-auto mb-4 border border-gray-500" />
          <h1 className='text-3xl font font-semibold text-center my-7' > About</h1>
          <h1 className='text-3xl font font-semibold text-center my-7'>

             Jayanth <sub> Admin </sub>
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Jayanth's Blog! This <b>WEBSITE</b> was created by Jayanth
              to share my thoughts and ideas with the
              world. I am a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              On this Website, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, programming
              languages, machine learning, deep learning, natural language processing, and my thoughts.
            </p>

            <p>
              I encourage you to leave comments on my posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. I believe that a community of learners can help
              each other grow and improve.
            </p>
            <div className='border border-yellow-500 bg-yellow-100 p-4 rounded-lg'>
              <p className='text-lg text-yellow-800 font-semibold mb-2'>
                📢 Attention Readers! 📢
              </p>
              <p>
                I'm excited to share that I have some fantastic blog posts in the works just for you. My team and I are hard at work crafting valuable and engaging content that we can't wait to release into the digital world. However, good things take time, and we want to ensure that each post is polished to perfection before hitting the "publish" button.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
