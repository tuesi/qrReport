export class FormDataModel {
    constructor(deviceId, name, notes, message = '', location = '', dateCreated = new Date(), imageName = '', deviceImageName = '', createdBy = '', partDeviceName = '', partDeviceNotes = '', partDeviceImageName = '') {
        this.deviceId = deviceId;
        this.name = name;
        this.notes = notes;
        this.message = message;
        this.location = location;
        this.dateCreated = dateCreated;
        this.dateCompleted = null;
        this.completed = false;
        this.imageName = imageName;
        this.deviceImageName = deviceImageName;
        this.createdBy = createdBy;
        this.partDeviceName = partDeviceName;
        this.partDeviceNotes = partDeviceNotes;
        this.partDeviceImageName = partDeviceImageName;
    }
}