import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import path from "node:path"
import { fileURLToPath } from "node:url";
import downloadHelper from './func/download.js';
import { startRPC } from './func/discordRPC.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function startWindow(): void {
    const window = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false
        },
        width: 600,
        height: 400
    });

    ipcMain.handle("download", async (_event, url: string, option: string) => {
        return await downloadHelper(url, option);
    })

    window.loadFile(
        path.join(__dirname, "./public/index.html")
    );
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  startWindow();
  startRPC();
});
