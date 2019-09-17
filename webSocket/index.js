
//index.js 的部分會用來處理與 WebSocket 的連結：
//上方的 url 為剛剛使用 node.js 在本機上執行的 Server， 另外的 onopen 及 onclose 分別為他們指定一個 Function， 
//在開啟和關閉連線時執行， 執行結果：

//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket('ws://localhost:3001')

//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
  console.log('open connection')
}

//接收 Server 發送的訊息
//為 onmessage 指定要執行的函示，接收一個參數 event 為 Server 發送的物件
ws.onmessage = event => {
  console.log('onmessage')
  console.log(event)
}

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
  console.log('close connection')
}

ws.send('sdfs')