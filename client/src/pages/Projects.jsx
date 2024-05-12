import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'> Admin Pojects</h1>
      <p className='text-md text-gray-500'>Build fun and engaging projects while learning :</p>
      <CallToAction
      title="AtoZ cinemas "
      description="Complete information about Cinemas and Booking ticket"
      buttonText="Check Now"
      buttonLink="https://github.com/jayanth119/AtoZCinemas"
      imageUrl="https://raw.githubusercontent.com/jayanth119/AtoZCinemas/main/photo/window.png"
    />
          <CallToAction
      title="Human Generator"
      description="Catch Human with Face "
      buttonText="Check Now"
      buttonLink="https://github.com/jayanth119/Human_Genx"
      imageUrl="https://raw.githubusercontent.com/jayanth119/Human_Genx/main/server/WhatsApp%20Image%202024-03-01%20at%2022.52.37.jpeg"
    />
         
    </div>
  )
}