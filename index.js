const express = require('express');
const dotEnv = require('dotenv');
const authRouter = require("./routes/auth/authRouter");
const connectDB = require('./config/connectDB');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const categoryRoutes = require('./routes/categoryRoute');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
dotEnv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

// file upload by multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + file.originalname)
    }
})



// const upload = multer({ dest: 'images/' })
const upload = multer({ storage: storage })
// upload routes
app.post("/api/upload", upload.single("file"), (req, res) => {
    const imgUrl = `/images/${req.file.filename}`;

    res.status(200).json({
        message: imgUrl
    })
})


// routes
app.use("/api/auth", authRouter)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoutes);


app.listen(PORT, async () => {
    console.log(`server started at http://localhost:${PORT}`);
    await connectDB();
})