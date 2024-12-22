/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("imgDl", {
  // window.imgDl.fetchImgs("http://localhost:3000")
  async fetchImgs(targetUrl) {
    const result = await ipcRenderer.invoke("fetchImgs", targetUrl);
    return result;
  },
  // window.imgDl.saveImgs
  async saveImgs() {
    const result = await ipcRenderer.invoke("saveImgs");
    return result;
  },
});
