import express from 'express';
import 'dotenv/config.js';
import { authRouter } from './routes/auth.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import { uploadRouter } from './routes/upload.js';
import path from 'path';
import {fileURLToPath} from 'url';

const port=process.env.PORT;
const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

app.use(cors({
    origin:['https://test0-phi.vercel.app/'],
    methods:['POST','GET'],
    credentials:true,
}));
app.use(express.json());

app.use('/images',express.static(path.join(__dirname,'uploads')));
app.use('/',authRouter);
app.use('/',uploadRouter)
app.get('/check',(req,res)=>{
    res.send('hello');
})

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
});