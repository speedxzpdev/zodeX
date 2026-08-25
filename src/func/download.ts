import path from "node:path"
import { app, dialog } from 'electron';
import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import type { Download } from '../types/download.js';
import { editRPC } from "./discordRPC.js";
import { fileURLToPath } from "node:url";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadHelper(url: string, option: string): Promise<Download> {

    const binFolder = app.isPackaged
    ? path.join(process.resourcesPath, "bin")
    : path.resolve(__dirname, "..", "..", "bin");

    const ytDlpPath = path.join(binFolder, "yt-dlp.exe");

    

  return new Promise<Download>(async (resolve, reject) => {
        editRPC("Downloading...", url);

        const folderInteract = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    });

        if(folderInteract.canceled) {
            return reject(new Error("Not Found."));
        }

        const output = folderInteract.filePaths[0];

        const args = option === "music" ? ["--ffmpeg-location", binFolder, "-x", "--audio-format", "mp3", "-o", `${output}\\%(title)s.%(ext)s`, url] : ["--ffmpeg-location", binFolder, "-f", "bestvideo+bestaudio/best", "-o", `${output}\\%(title)s.%(ext)s`, url];

        const processSpawn = spawn(ytDlpPath, args);

        processSpawn.stdout.on("data", (data) => {
            console.log(`[yt-dlp] ${data}`);
        });

        processSpawn.stderr.on("data", (data) => {
            console.error(`[yt-dlp ERROR] ${data}`);
        });

        processSpawn.on("close", (code) => {
            if (code === 0) {
              editRPC("Downloading successful!", url);
              resolve({
                    success: true,
                    message: `Downloading completed successfully in ${output}`
                });
            } else {
                reject(
                    new Error(`Yt-dlp exited with code ${code}`)
                );
            }
        });

        processSpawn.on("error", (error) => {
            console.error(error);
            reject(error);
        })
    });

};

export default downloadHelper;
