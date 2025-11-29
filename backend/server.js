const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req,res)=> {
    res.send({
        activeStatus: true,
        error:false
    })
})
app.use("/api/auth", require("./routes/auth"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/students", require("./routes/student"));  // 🔥 IMPORTANT FIX




app.listen(5000, () => console.log("Server running on port 5000"));
