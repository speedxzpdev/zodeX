import electron = require("electron");
const { contextBridge, ipcRenderer } = electron;

contextBridge.exposeInMainWorld("electronAPI", {
    download: (url: string, option: string) => {
        return ipcRenderer.invoke("download", url, option);
    }
});