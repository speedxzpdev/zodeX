import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    download: (url: string, option: string) => {
        return ipcRenderer.invoke("download", url, option);
    }
});
