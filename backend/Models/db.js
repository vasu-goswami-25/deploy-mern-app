// const mongoose=require('mongoose');

// const mongo_url=process.env.MONGO_URI;

// mongoose.connect(mongo_url)
//    .then(()=>{
//     console.log("MongoDB connected...");
//    }).catch((err)=>{
//     console.log("MongoDB Connection Error: ",err);
//    })


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vasu25:12345@cluster0.daoviha.mongodb.net/auth-db?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB Connection Error:", err));
