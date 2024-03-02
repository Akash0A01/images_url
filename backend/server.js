const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Image = require('./model/Image');

const app = express();
const port = 5000;

mongoose.connect('mongodb://127.0.0.1:27017/imageUploader', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const newImage = new Image({
            name: req.file.filename,
            path: req.file.path
        });
        await newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
