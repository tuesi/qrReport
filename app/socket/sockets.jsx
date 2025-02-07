import { API_URL } from '@env';
import io from "socket.io-client";
const socket = io(API_URL);

socket.on("connect", () => {
    console.log("Socket connected successfully to:", API_URL);
});

socket.on("connect_error", (error) => {
    console.error("Socket connection failed:", error);
});

export const GetItemUpdates = (data, updateItemsCallback, listenerName) => {
    socket.on(listenerName, (change) => {
        ProcessItemChange(change, data, updateItemsCallback);
    })
}

const ProcessItemChange = (change, data, updateItemsCallback) => {
    const { operationType, fullDocument, documentKey, updateDescription } = change;

    let updatedList = [...data];

    switch (operationType) {
        case "insert":
            updatedList.push(fullDocument);
            break;
        case "update":
            updatedList = updatedList.map((item) =>
                item._id === documentKey._id
                    ? { ...item, ...updateDescription.updatedFields }
                    : item
            );
            break;
        case "delete":
            updatedList = updatedList.filter((item) => item._id !== documentKey._id);
            break;
    }

    updateItemsCallback(updatedList);
}

export const DisconnectSockets = () => {
    socket.off("update-reports");
    socket.off("update-devices");
    socket.off("update-parts");
};
