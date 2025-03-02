import SearchCity from "./assets/SearchCity"
import Location from "./assets/Location"
function WeatherData(){

    ;

    return(
        <>
        <body className="bg-gray-600 overflow-hidden">
        <h1 className="flex text-base sm:text-lg md:text-xl text-white place-content-center mt-5 font-bold mb-3">Weather App</h1>
        <div className="flex flex-col items-center justify-center h-screen ">
            
           
            <div className="bg-black flex flex-col items-center justify-center h-115 w-80 border-6 rounded-4xl">

            <div><Location/></div>
    
        </div>
        </div>
     
        </body>
        </>
    )
}
export default WeatherData