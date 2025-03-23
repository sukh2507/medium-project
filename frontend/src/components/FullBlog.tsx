import { blogInput } from "@sukhbirsinghsareen/medium-commons"
import { Appbar } from "./Appbar"
import { BlogInterface } from "./hooks"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: BlogInterface }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 gap-6 px-4 md:px-10 w-full pt-12 max-w-screen-xl">
                    <div className="col-span-12 md:col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 mt-2">
                            Published on 2nd December 2025 
                        </div>
                        <div className="mt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <h2 className="text-xl text-slate-600 font-bold mb-4">Author</h2>

                        <div className="flex items-start gap-3">
                            <div className="flex flex-col justify-center">
                            <Avatar initials={blog.author?.name?.[0] || "A"} />
                            </div>                            
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author?.name || "Anonymous"}
                                </div>
                                <div className="mt-2 text-slate-500">
                                    Random catch phrase about the author's ability to grab User's attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}