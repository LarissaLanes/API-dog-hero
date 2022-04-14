import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())


app.listen(process.env.PORT || 3005, () => {
  console.log(`Servidor rodando em http://localhost:3005`)
})
  

  export default app;
  