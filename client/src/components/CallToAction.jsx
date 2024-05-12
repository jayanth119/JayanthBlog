import { Button } from 'flowbite-react';

export default function CallToAction({ title, description, buttonText, buttonLink, imageUrl }) {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
            {title}
            </h2>
            <p className='text-gray-500 my-2'>
            {description}
            </p>
            <Button  className='rounded-tl-xl rounded-bl-none'>
                <a href={buttonLink}  target='_blank' rel='noopener noreferrer'>
                {buttonText}
                </a>
            </Button>
        </div>
        <div className="p-6 flex-1">
            <img src={imageUrl} />
        </div>
    </div>
  )
}




