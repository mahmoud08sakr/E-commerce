import mongoose from "mongoose";


export function connection()
{
    const databaseUrl = process.env.DATABASE_ONLINE_CONNECTION;
    mongoose.connect(databaseUrl)
    .then(()=>{

        console.log("db connection established");


    }).catch((err)=>{
        console.log("connection error" , err);
    
    })
}
