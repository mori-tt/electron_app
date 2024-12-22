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

$btnGet.addEventListener("click", async () => {
  const targetUrl = $inputUrl.value;

  // ブラウザ->画像URL一覧を取得
  const imgUrls = await window.imgDl.fetchImgs(targetUrl);

  console.log(imgUrls);
  let imgHtmlStr = "";

  for (const url of imgUrls) {
    imgHtmlStr += `<img src="${url}"/>`;
  }

  $result.innerHTML = imgHtmlStr;
});

$btnSave.addEventListener("click", async () => {
  // 画像の保存の処理
  const result = await window.imgDl.saveImgs(); //"success", "failed", "cancell"
  console.log(result);
  const MSGs = {
    success: "画像の保存に成功しました",
    failed: "画像の保存に失敗しました",
    cancel: "画像の保存を中断しました",
  };
  $msg.textContent = MSGs[result];
});
