// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const { chromium } = require("@playwright/test");
const download = require("image-downloader");

let imgUrls;
async function fetchImgs(event, targetUrl) {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto(targetUrl);
  const imgLocators = page.locator("img");
  const imgCount = await imgLocators.count();

  imgUrls = [];
  for (let i = 0; i < imgCount; i++) {
    const imgLocator = imgLocators.locator(`nth=${i}`);
    const imgSrc = await imgLocator.evaluate((node) => node.currentSrc);
    imgUrls.push(imgSrc);
  }

  await browser.close();

  return imgUrls;
}

async function saveImgs() {
  const win = BrowserWindow.getFocusedWindow();
  const pathResult = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
    defaultPath: ".",
  });

  if (pathResult.canceled) return "cancel";

  const dest = pathResult.filePaths[0];

  try {
    for (const url of imgUrls) {
      await download
        .image({ url, dest })
        .then(function (result) {
          console.log("success : ", result);
        })
        .catch(function (e) {
          console.error("error occured : ", e);
        });
    }
  } catch (e) {
    return "failed";
  }

  setTimeout(() => {
    shell.openPath(dest);
  }, 2000);

  return "success";
}

ipcMain.handle("fetchImgs", fetchImgs);
ipcMain.handle("saveImgs", saveImgs);
