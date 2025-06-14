
import { LuCalendarClock } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className='w-full bg-gray-400 h-10 flex items-center px-5'>
      <div className="ml-auto flex gap-3">
          <LuCalendarClock className="text-blue-800 text-3xl" />
          <h3 className="font-semibold my-auto py-auto text-black">ردیاب زمان</h3>
          <Link to="/home" className="text-white hover:underline">خانه</Link>
      </div>
    </div>
  )
}

export default Navbar
