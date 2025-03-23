import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
export function Appbar(){
    return(
        <div className="border-b flex justify-between px-10">
            <Link to={"/blogs"}>
            <div className="mt-2 mb-2 cursor-pointer">
                Medium
            </div>
            </Link>
                <button className="rounded rounded-full pl-2 pr-2 p-1 text-white h-3/4 mt-2 ml-240 bg-green-600 hover:bg-green-800  focus:ring-green-400 focus:ring-4 focus:outling-none"><Link to={"/create"}>Create Blog</Link></button>
            <div className="mt-2 mb-2">
                <Avatar initials="Sukhbir Singh Sareen"/>
            </div>
        </div>
    )
}