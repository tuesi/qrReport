export class DeviceDataModel {
    constructor(name, notes, imageName = '') {
        this.name = name.toUpperCase();
        this.notes = notes;
        this.created = new Date();
        this.imageName = imageName;
    }

    toPlainObject() {
        return {
            name: this.name,
            notes: this.notes,
            created: this.created,
            imageName: this.imageName
        }
    }
}