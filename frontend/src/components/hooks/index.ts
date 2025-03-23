import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../config';
import axios from 'axios';

export interface BlogInterface {
    "content": string;
    "title": string;
    "id": string;
    "author": {
        "name": string
    }
}

export function useBlogs(props?: { id?: string }) {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogInterface[]>([]);
    const [blog, setBlog] = useState<BlogInterface | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // If an ID is provided, fetch a single blog
                if (props?.id) {
                    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${props.id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    setBlog(response.data.blog || null);
                } else {
                    // Otherwise, fetch all blogs
                    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    setBlogs(response.data.blogs || []);
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [props?.id]);

    return { loading, blogs, blog };
}