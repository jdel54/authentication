import { hashPassword } from "../../../lib/auth";
import ConnectDatabase from "../../../lib/db"

async function handler(req, res) {
    if(req.method !== 'Post'){
    }

    const data =req.body
    const {email, password} = data

     if (
        !email || 
        !email.includes('@') || 
        !password || 
        password.trim().length < 7
        ) {
         res.status(422).json ({message : 'Invalid input - check email or password '})
         return;
     }

    const client = await ConnectDatabase()
    const db = client.db()


    const existingUser = await db.collection('users').findOne({email: email})

    if(existingUser){
        res.status(422).json({message: 'User exists already'})
        client.close()
        return;
    }


    const hashedPassword =  await hashPassword(password)

    const result = await db.collection ('users').insertOne({
        email : email,
        password: hashedPassword
    })
  res.status(201).json({message: 'Created user!'})
  client.close()

}

export default handler