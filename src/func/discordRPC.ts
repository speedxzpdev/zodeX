import { Client } from "@xhayper/discord-rpc";


const client = new Client({
    clientId: "1540942159845261432",
});

function startRPC() {
  client.on("ready", () => {
    console.log("RPC ready");

    client.user?.setActivity({
      details: "Idle",
      state: "Go to download!",
      startTimestamp: Date.now(),
    });
  });

  client.login();
}

function editRPC(details: string, state: string) {
  client.user?.setActivity({
    details,
    state,
    startTimestamp: Date.now(),
  });
}

export { startRPC, editRPC };
