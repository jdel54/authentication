import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import ConnectDatabase from "../../../lib/db";

async function handler (req,res){
    if(req.method !=='PATCH'){
        return;
    }
const session = await getSession({req:req})

if(!session) {
    res.status(401).json({message: 'User is not authenticated!'})
    return;
}

const userEmail = session.user.email;
const oldPassword = req.body.oldPassword
const newPassword = req.body.newPassword

const client = await ConnectDatabase()

const usersCollection = client.db().collection('users')

const user = await usersCollection.findOne({email : userEmail})

if(!user){
    res.status(404).json({message: 'User not found'})
    client.close()
}

const currentPasword = user.password

const passWordEqual = await verifyPassword(oldPassword, currentPasword)

if(!passWordEqual){
    res.status(403).json({message: 'Old passwords do not match'})
    client.close()
    return;
}

const hashedPassword = await hashPassword(newPassword)

const result = await usersCollection.updateOne({email : userEmail}, {$set: {password : hashedPassword}})

client.close()
res.status(200).json({message: 'Password changed'})

}


export default handler