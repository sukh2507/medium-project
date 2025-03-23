import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Create = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                { 
                    title: title, 
                    content: content 
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            console.log(response.data);
            navigate("/blogs")
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div>
                <Appbar/>
            </div>
            <div className="flex justify-center w-full">
                <div className="max-w-screen-lg w-full mt-10">
                    <input 
                        type="text" 
                        id="title" 
                        onChange={(e) => {setTitle(e.target.value)}} 
                        aria-describedby="helper-text-explanation" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-4 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Blog Title" 
                    />
                </div>
            </div>
            <div className="flex justify-center mt-4 w-screen">
                <form onSubmit={handleSubmit}>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white w-full rounded-t-lg dark:bg-gray-800">
                            <label htmlFor="comment" className="sr-only">Your content</label>
                            <textarea 
                                id="comment" 
                                onChange={(e) => {setContent(e.target.value)}} 
                                className="max-w-screen-lg min-w-[600px] px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" 
                                placeholder="Write your blog post content..." 
                                required 
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                            <button 
                                type="submit" 
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                            >
                                Post Blog
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}