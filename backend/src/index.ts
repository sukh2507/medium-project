  import { Hono } from 'hono'
  import {PrismaClient} from "@prisma/client/edge"
  import {withAccelerate} from '@prisma/extension-accelerate'
  import { env } from 'cloudflare:workers'
  import {decode , sign,verify} from "hono/jwt"
  import {object, z} from 'zod'
  import { userrouter } from './routes/user'
  import { blogrouter } from './routes/blog'
  import {cors} from "hono/cors"
  
  const app = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      SECRET:string,
      auth_header:string
    }
  }>()
  app.use("/*",cors())
  app.route("/api/v1/user", userrouter);
  app.route("/api/v1/blog", blogrouter);
  

  // Middlewares

    // blogrouter.use("/api/v1/blog/*",async (c,next)=>{
    //   const auth_header=(await c.req.header("Authorization") as string)
    //   const token=auth_header.split(" ")[1]
    //   const response=await verify(token,c.env.SECRET)

    //   if(response.id){
    //     next()
    //   }else{
    //     return c.json({
    //       message:"Unauthorized"
    //     },403)
    //   }
    // })



  export default app
