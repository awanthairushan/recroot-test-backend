const bcrypt = require("bcrypt");
const User = require("../models/userModel");


//========================s3 image====================================
const {S3Client, PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.ACCESS_SECRET,
    },
    region: process.env.BUCKET_REIGON,
});

const imageUpload = async (file, imageName) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: file.buffer,
        ContentType: file.mimeType
    }

    const command = new PutObjectCommand(params);

    await s3.send(command, (err, data) => {
        if (err) {
            throw err;
        }
    })
}
const getImage = async (imageName) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageName
    }

    const command = new GetObjectCommand(params);
    try {
        return await getSignedUrl(s3, command, {expiresIn: 3600});
    } catch (error) {
        throw error;
    }
}
//=============================================================================================


const registerUser = async (req, res) => {
    const {username, email, password} = req.body;
    const imageName = username + " " + req.file.originalname;

    if (!username || !email || !password) {
        res.status(400).json({message: "All fields are required", data: null});
        return
    }

    const availableUser = await User.findOne({username});

    if (availableUser) {
        res.status(400).json({message: "Username already exits!", data: null});
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await imageUpload(req.file, imageName);
    } catch (error) {
        res.status(500).json({message: "Image upload unsuccessful", data: error});
        return
    }

    try {
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            profilePictureName: imageName
        });
        res.status(201).json({message: "User registered successfully!", data: {username: user?.username}});
    } catch (error) {
        res.status(500).json({message: "User register unsuccessful!", data: error});
    }
};

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).json({message: "All fields are required", data: null});
    }

    const user = await User.findOne({username});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: "Successfully logged in",
            data: {userId: user._id, username: user.username, email: user.email}
        });
    } else {
        res.status(400).json({message: "Username or Password is invalid!", data: null});
    }
}
const getCurrentUser = async (req, res) => {

    const user = await User.findById(req.params.id);

    const profilePictureLink = await getImage(user.profilePictureName);

    const userWithImage = {
        username: user.username,
        email: user.email,
        profilePictureLink: profilePictureLink,
    }

    res.status(200).json({message: "synced data successfully!", data: {user: userWithImage}});
}

const verifyUser = async (userId) => {

    try {
        const user = await User.findById(userId);
        return !!user;
    } catch (error) {
        return false
    }

}

module.exports = {registerUser, loginUser, getCurrentUser, verifyUser};