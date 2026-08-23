import { Download } from './types/donwload';
export {}

declare global {
    interface Window {
        electronAPI: {
            download: (url: string, option: string) => Promise<Download>
        }
    }
}