// 重复推送
//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server

//指定開啟的 port
const PORT = 3001

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express()
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({
  server
})

//提到溝通， 過程一定是有來有往， 在開啟 WebSocket 後， Server 端會使用 send 發送訊息，
//接收則是如同在 connection 內監聽 close 一樣， 只是換成對 message 設定監聽， 並接收一個參數 data， 
//捕獲 Client 端發送的訊息：
wss.on('connection', ws => {
  console.log('Client connected')

  //固定送最新時間給 Client
  const sendNowTime = setInterval(() => {
    ws.send(String(new Date()))
  }, 1000)

  //對 message 設定監聽，接收從 Client 發送的訊息
  ws.on('message', data => {
    //data 為 Client 發送的訊息，現在將訊息原封不動發送出去
    ws.send(data)
  })

  ws.on('close', () => {
    //連線中斷時停止 setInterval
    clearInterval(sendNowTime)
    console.log('Close connected')
  })
})