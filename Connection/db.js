const mongoose=require('mongoose')

const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(res=>{
    console.log("Ekart connected to MongoDB database");
}).catch(err=>{
    console.log(err);
})