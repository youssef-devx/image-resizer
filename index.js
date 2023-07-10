const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()
const PORT = process.env.PORT | 5000
const { path: ffmpeg } = require("@ffmpeg-installer/ffmpeg")
const { execSync } = require("child_process")

app.get("/", (req, res) => {
  const imageUrl = req.query.imageUrl

  if (!imageUrl) return res.status(404).send("No image url found!")

  execSync(`${ffmpeg} -i ${imageUrl} -vf scale=20:-1 "small-image.jpg" -loglevel quiet`)
  res.status(200).sendFile(path.join(__dirname, "small-image.jpg"), {}, () => {
    fs.rmSync(path.join(__dirname, "small-image.jpg"))
  })
})

app.listen(PORT, (message) => console.log(message ?? "No message(server is running fine.)"))
