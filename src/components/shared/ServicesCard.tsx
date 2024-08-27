
import { useNavigate } from "react-router-dom";

// service props types
interface serviceprops {
  title: string;
  img: string;
  link: string;
}

export default function ServicesCard({ title, img, link }: serviceprops) {
  const navigate = useNavigate();
  // handle card click
  const handleClick = () => {
    navigate(`${link}`);
  };
  return (
    <div
      className="w-full h-auto flex items-center p-2 bg-white  relative transition-transform duration-500 ease-in-out hover:scale-105  hover:bg-white hover:cursor-pointer  border border-gray-100 rounded-lg shadow-md"
      onClick={handleClick}
    >
      <div className=' flex items-center justify-center relative hover:bg-white w-full  '>
        <img
         
          className="w-40 left-0 top-0 h-40 object-cover rounded-t-lg"
          src={img}
          alt={title}
        />
      </div>
      <div className="p-4 bg-white absolute z-50 left-0 bottom-0 w-full hover:text-gray-900 ">
        <h2 className="text-lg hover:text-gray-90  font-bold">{title}</h2>
      </div>
    </div>
  );
}