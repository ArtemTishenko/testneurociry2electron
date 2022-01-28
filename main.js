const { app, BrowserWindow, Menu, ipcMain } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 370,
        height: 270,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadFile('src/index.html')
    // win.webContents.openDevTools();

    Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
    createWindow()
})



ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
})
