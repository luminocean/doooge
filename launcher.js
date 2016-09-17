const electron = require('electron');
const fs = require('fs');
const path = require('path');
const imageSize = require('image-size');

// Module to control application life.
const program = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function picSize(resourceName, callback){
    const widthMax = 400; // how many pixels is allowed on the width at most

    let filePath = path.join(path.dirname(__filename), 'resources', resourceName);
    imageSize(filePath, function(err, dimensions){
        if(err) return callback(err);

        if(dimensions.width > widthMax){
            callback(null, {
                width: widthMax,
                height: parseInt(widthMax * (dimensions.height / dimensions.width))
            });
        }else{
            callback(null, {
                width: dimensions.width,
                height: dimensions.height
            });
        }
    });
}

function createWindow() {
    // figure out the size of the background picture
    picSize('background.png', function(err, dimension){
        if(err) return console.error('Getting background size error. ' + err);
        let width = dimension.width;
        let height = dimension.height;

        const display = electron.screen.getPrimaryDisplay().workAreaSize;
        // Create the browser window.
        mainWindow = new BrowserWindow({
            x: display['width'] - width,
            y: 0,
            width: width,
            height: height,
            transparent: true,
            // resizable: false,
            frame: false
        });

        // and load the index.html of the app.
        mainWindow.loadURL(`file://${__dirname}/index.html`);

        // Open the DevTools.
        // mainWindow.webContents.openDevTools();

        // Emitted when the window is closed.
        mainWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null;
        });
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
program.on('ready', createWindow);

// Quit when all windows are closed.
program.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    //     program.quit();
    // };

    // force quit on all platforms
    program.quit();
});

program.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.