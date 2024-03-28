export class FormDataModel {
    constructor(deviceId, name, notes, message = '') {
        this.deviceId = deviceId;
        this.name = name;
        this.notes = notes;
        this.message = message;
        this.dateCreated = new Date();
        this.dateCompleted = null;
    }
}