import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import {withAccelerate} from '@prisma/extension-accelerate'
import { env } from 'cloudflare:workers'
import {decode , sign,verify} from "hono/jwt"
import {object, z} from 'zod'



export const userrouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      SECRET:string,
      auth_header:string
    }
  }>()

  const signup_schema= z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(5)
  })

  const signin_schema=z.object({
    email:z.string().email(),
    password:z.string()
  })  

export type signupInput = z.infer<typeof signup_schema>
export type signinInput = z.infer<typeof signin_schema>

  userrouter.post('/signup',async (c)=>{
    try{
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body=await c.req.json()
    const parsedbody=signup_schema.safeParse(body);
    if(!parsedbody.success){
      return c.json({
        messgage:"Enter valid inputs"
      },400)
    }

    const {email,password,name}=parsedbody.data

    const check = await prisma.user.findFirst({
      where: {
        email: email,
      }
      })

      if(check){
        return c.json({
          message : "User already exists"
        },400)
      }

      const user =await prisma.user.create({
      data:{
        email:email,
        password:password,
        name:name
      }
    })

    const token=await sign({id:user.id},c.env.SECRET)
    console.log(token)
    return c.json({
      message:"New account created",
      token:token
    })
  }catch(error){
    console.log(error)
  }
  });

  userrouter.post("/signin",async (c)=>{
  try{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body=await c.req.json()
    const parsedbody=signin_schema.safeParse(body)

    if(!parsedbody.success){
      return c.json({
        message:"enter valid email password inputs"
      },400)
    }

    const {email,password}=parsedbody.data

    const user=await prisma.user.findFirst({
      where:{
        email:email
      },
    })

    if(!user) return c.json({
      message:"No such user Exists"
    },404)

    if(password==user.password){
      const token=await sign({id:user.id},c.env.SECRET)
      return c.json({
        message:"Signin Successful",
        jwt:token
      })
    }else{
      return c.json({
        message : "Wrong Password , try again Nigga"
      },401)
    }
  }catch(e){
    console.log(e)
  }
  })