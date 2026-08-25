const urlInput = document.querySelector<HTMLInputElement>("#url");
const downloadForm = document.querySelector<HTMLFormElement>("#download-form");
const status = document.querySelector<HTMLParagraphElement>("#status");

function startLoading(status: HTMLParagraphElement) {
    let dots = 0;

    const interval = setInterval(() => {
        dots = (dots + 1) % 4;

        status.textContent = `Downloading${".".repeat(dots)}`;
    }, 500);

    return () => clearInterval(interval);
}

downloadForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = urlInput?.value.trim();
    const optionInput = document.querySelector<HTMLInputElement>(
        'input[name="option"]:checked'
    );

    if(!status) return;

    if(!url) {
        return status.textContent = "What's the url?";
    }
    if(!optionInput) {
        return status.textContent = "What's the option?"
    }


    const stopLoading = startLoading(status);

    try {
        const data = await window.electronAPI.download(url, optionInput.value);
        status.textContent = data.message;
    } catch (error) {
        if(error instanceof Error) {
            status.textContent = error.message;
        }
    } finally {
        stopLoading();
    }
    
});