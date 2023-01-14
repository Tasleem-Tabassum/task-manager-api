const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)  // register the routes with express app
app.use(taskRouter)

app.listen(port, () => {
    console.log('App listening on port ' + port)
})



































// app.use((req, res, next) => {
//     res.status(503).send('Site Temparerily Unavailable')
// })


// const Task  = require('./models/task')
// const User = require('./models/user')

// const myFunc = async () => {
//     // const task = await Task.findById('63b95d9c65b035477bdaf8bb')
//     // await task.populate('owner')
//     // console.log(task)

//     const user = await User.findById('63b95cc74dd6d77ab3930ae5')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// myFunc()