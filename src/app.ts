import express, { Express } from "express"
import mongoose, { ConnectOptions } from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(todoRoutes)

const uri: string = `mongodb+srv://thinithidilshara:W1M9E3NNt6HxP7Rs@cluster0.ywif8sr.mongodb.net/?retryWrites=true&w=majority`

const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false, 
  }

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })