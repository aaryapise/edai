// mongo.js
const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect("mongodb+srv://aaryapise04:7ozNbbWGfW7NIF7c@cluster0.nlvur.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});

// User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});

// Pre-save hook to hash password
// userSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, saltRounds);
//     }
//     next();
// });

// Method to compare password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model('User', userSchema);
module.exports = User;

const getUserByEmail = async (email) => {
    return await User.findOne({ email }); // Fetch user by email
  };