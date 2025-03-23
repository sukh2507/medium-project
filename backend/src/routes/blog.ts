import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client/edge"
import {withAccelerate} from '@prisma/extension-accelerate'
import { env } from 'cloudflare:workers'
import {decode , sign,verify} from "hono/jwt"
import {object, z} from 'zod'

const blogschema=z.object({
    title:z.string(),
    content:z.string(),
})

export const blogrouter= new Hono<{
    Bindings:{
      DATABASE_URL:string,
      SECRET:string,
      auth_header:string
    },
    Variables:{
        userId:string
    }
  }>()

  blogrouter.use("/*",async (c,next)=>{
    try{
    const auth_header=await c.req.header ("Authorization") as string
    const token=auth_header.split(" ")[1]
    const user=await verify(token,c.env.SECRET)

    if(user){
        // @ts-ignore 
      c.set("userId",user.id);
      await next()
    }else{
      return c.json({
        message:"Unauthorized"
      },403)
    }}catch(e){
        return c.json({
            message:"you are not logged in"
        },403)
    }
  })


//   ROUTER

blogrouter.get("/bulk",async (c)=>{
    try{const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate())

    const blogs= await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
    return c.json({blogs:blogs});
    }catch(e){
        console.log(e)
        return c.json({
            messgae:"error while fetching "
        })
    }
  })

  blogrouter.get('/:id', async (c) => {
    try{
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
          }).$extends(withAccelerate())
      
          const id=await c.req.param("id")

          const blog=await prisma.post.findFirst({
            where:{
                id:id
            }
          })

          return c.json({
            blog
        })

    }catch(e){
        c.status(411)
        console.log(e)
    }
  })

  blogrouter.post('/',async(c)=>{
    try{
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
          }).$extends(withAccelerate())
      
          const body=await c.req.json()
          const parsedbody=blogschema.safeParse(body)
          const userid=c.get("userId")
          
          if(!parsedbody.success) return c.json({
            message:"Invalid inputs"
          },400)

          const blog=await prisma.post.create({
            data:{
                title:parsedbody.data.title,
                content:parsedbody.data.content,
                author_id:`${userid}`
            }
          })

          return c.json({
            message:"blog created successfully",
            id:blog.id
          })

    }catch(e){
        c.status(411)
        console.log(e)
    }
  })

  blogrouter.put('/',async(c)=>{
    try{
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
          }).$extends(withAccelerate())
      
          const body=await c.req.json()
          const parsedbody=blogschema.safeParse(body)
          
          if(!parsedbody.success) return c.json({
            message:"Invalid inputs"
          },400)

          const blog=await prisma.post.update({
            where:{
                id:body.id
            },
            data:{
                title:parsedbody.data.title,
                content:parsedbody.data.content,
            }
          })

          return c.json({
            message:"blog edited successfully",
            id:blog.id
          })

    }catch(e){
        c.status(411)
        console.log(e)
        return c.json({
            message:"error while fetching blog post"
        })
    }
    })


        
        
    