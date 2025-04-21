export const runtime = "nodejs";
import bycrypt from 'bcryptjs'
import {NextResponse} from 'next/server'
import { prismaClientFrontend } from '@/app/lib/prismaClientWrapper';

export const POST = async (req : Request) =>{
  try {
    const {email , password} = await req.json();
    const existingUser = await prismaClientFrontend.user.findUnique({
        where : {email }
    });
    if(existingUser){
        return NextResponse.json({error : "User already exists"}, {status : 400})
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    // create the user
    const newUser = await prismaClientFrontend.user.create({
        data : {
            email, 
            password : hashedPassword,
        }
    })
    return NextResponse.json({message : "User succesfully created", user : newUser}, {status : 200})
  }
  catch(error){
   console.error("Signup error", error);
   return NextResponse.json({error : "Internal server error"}, {status : 500})
  }

}