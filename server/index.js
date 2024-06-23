import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT: ${PORT}`);
    })

}).catch((err)=>{
    console.log('Error connecting to MongoDB', err);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const answerSchema = new mongoose.Schema({
    name:String,
    answers: {}
});

const UserModel = mongoose.model('users', userSchema);
const AnswerModel = mongoose.model('answers', answerSchema);

app.post('/signup', async (req, res)=>{
    try {
        const {name, email, password} = req.body;

        const existingUser = await UserModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const user = new UserModel({ name, email, password });

        await user.save();

        res.status(201).json({success: true, message: 'User created successfully'});
    } catch(error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});

app.post('/login', async (req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(404).json({success: false, message: 'User not found'});
        }

        if(user.password !== password){
            return res.status(401).json({success: false, message: 'Invalid credentials'});
        }

        const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET);
        res.status(200).json({ success: true, message: 'Login successful', token });


    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});

app.post('/submit-answers', async (req, res)=>{
    try{
        const {name, answers} = req.body;
        const ans = new AnswerModel({name, answers});
        await ans.save();

        res.status(200).json({success:true, message:'Successfully submitted'});

    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:'internal server error'});
    }
});

app.post('/get-score', async (req, res)=>{
    try{
        const {username} = req.body;
        const user = await AnswerModel.findOne({name:username});

        if(!user){
            return res.status(404).json({success:false, message:'User not found'});
        }

        let score = 0;
        const answers = user.answers;

        score  += parseInt(answers.answer1);
        score  += parseInt(answers.answer2);
        score  += parseInt(answers.answer3);
        score += parseInt(answers.answer4);
        score += parseInt(answers.answer5);

        res.status(200).json({success:true, score});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false, message:'Internal server error'});
    }
});
