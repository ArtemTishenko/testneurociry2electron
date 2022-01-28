const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping'))

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg)
})

ipcRenderer.send('asynchronous-message', 'ping')