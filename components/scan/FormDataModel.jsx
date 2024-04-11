export class FormDataModel {
    constructor(deviceId, name, notes, message = '', location = '', dateCreated = new Date()) {
        this.deviceId = deviceId;
        this.name = name;
        this.notes = notes;
        this.message = message;
        this.location = location;
        this.dateCreated = dateCreated;
        this.dateCompleted = null;
        this.completed = false;
    }
}