// require('dotenv').config({path:'./env'});
import dotenv from 'dotenv';

// import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './env'
})

// connectDB()
// .then(()=>{
    app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});    
// })
// .catch((err)=>{
//     console.error("Failed to connect to the database:", err);
// })
// import dotenv from 'dotenv';

// import connectDB from './db/index.js';
// import { app } from './app.js';

// dotenv.config({
//     path: './env'
// })

// connectDB()
// .then(()=>{
//     app.listen(process.env.PORT || 8000, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });    
// })
// .catch((err)=>{
//     console.error("Failed to connect to the database:", err);
// })
