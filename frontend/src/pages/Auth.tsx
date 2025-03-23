import { ChangeEvent, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { signupInput } from "@sukhbirsinghsareen/medium-commons";
import axios from "axios"
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type:"signup"|"signin"}) => {
    const navigate=useNavigate()
    const [postInputs, setPostInputs] = useState<signupInput>({
        name:"",
        email:"",
        password:""
    });

    async function sendreq(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`, postInputs)
            console.log("Full response:", response.data)
            const jwt = response.data.jwt
            if (!jwt) {
                console.error("JWT is undefined in the response")
                return
            }
            localStorage.setItem("token", jwt)
            navigate("/blogs")
        } catch (error) {
            console.error("Error during authentication:", error)
        }
    }

    return (
        <div className="h-screen flex justify-center text-center flex-col">
            <div className="flex justify-center">
                <div className="text-3xl font-extrabold">{type==="signup"?"Create An Account":"Sign In"}</div>
            </div>
            <div className="pl-2 underline text-slate-400">
            {type === "signup" ? (
    <>Already have an account? <Link to="/signin">Login</Link></>
) : (
    <>Don't have an account? <Link to="/signup">Create One</Link></>
)}

                <br /><br /><br />
            </div>
            
            {type==="signup"?<LabelledInput label="Name" placeholder="Enter your Name" onchange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }}/>:" "}
            <LabelledInput label="email" placeholder="Enter your email" onchange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    email:e.target.value
                })
            }}/>

            <LabelledInput label="password" type="password" placeholder="Enter your password" onchange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password:e.target.value
                })
            }}/>
            <div className="flex justify-center">
            <button type="button" onClick={sendreq} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 w-1/2 mt-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign Up":"Sign In"}</button>
            </div>

        </div>
    );
};

interface LabelInputType {
    label: string;
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?:string
}

function LabelledInput({ label, placeholder, onchange,type }: LabelInputType) {
    return (
        <div>
            <label className="block mb-2 text-md font-medium text-white-900 dark:text-white">
              <div className="text-gray-900 text-md">{label}:</div> 
            </label>
            <div className="flex justify-center ">
            <input
                type={ type||"text"}
                id="first_name"
                onChange={onchange}
                className="bg-gray-800 border border-gray-300 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
            
                required
            />
            </div>
        </div>
    );
}
