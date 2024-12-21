/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const $btnGet = document.querySelector("#btn-get");
const $btnSave = document.querySelector("#btn-save");
const $inputUrl = document.querySelector("#input-url");
const $msg = document.querySelector("#msg");
const $result = document.querySelector("#result");

$btnGet.addEventListener("click", () => {
  const targetUrl = $inputUrl.value;

  // ブラウザ->画像URL一覧を取得
  const imgUrls = [
    "http://localhost:3000/villa-1.jpg",
    "http://localhost:3000/villa-2.jpg",
  ];

  let imgHtmlStr = "";

  for (const url of imgUrls) {
    imgHtmlStr += `<img src="${url}"/>`;
  }

  $result.innerHTML = imgHtmlStr;
});

$btnSave.addEventListener("click", () => {
  // 画像の保存の処理
  const result = "success"; //"failed", "cancell"
  const MSGs = {
    success: "画像の保存に成功しました",
    failed: "画像の保存に失敗しました",
    cancel: "画像の保存を中断しました",
  };
  $msg.textContent = MSGs[result];
});
