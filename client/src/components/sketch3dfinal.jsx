import ModelViewer from "./sketch3d1";

const Basic=()=>{
    return(
        <div className="w-full grow bg-home-bg h-screen flex">
            <div className="p-5 flex flex-col justify-center ml-[10%] text-lg ">
                <p className="font-main text-5xl underline text-[#e6e6e6]">Tailor Fit</p>
                 <p className="text-md font-bold">
                    <span className="text-[#b16c84]">Switching </span> 
                    <span className="text-[#B8C480]">your </span> 
                    <span className="text-[#8d9dd3]">Style </span> 
                    <span className="text-[#e7b299]">Story</span>
                </p>
            </div>
            <div className="grow h-full flex flex-col justify-center items-center">
                <ModelViewer modelPath={"assets/robot_playground/scene.gltf"} />
            </div>
        </div>
    )
}
export default Basic;