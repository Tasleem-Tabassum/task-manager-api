const mongoose = require('mongoose')

//connecting to mongoose
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
})
