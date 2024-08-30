export class DeviceDataModel {
    constructor(name, notes, imageName = '', subString = []) {
        this.name = name.toUpperCase();
        this.subString = subString;
        this.notes = notes;
        this.created = new Date();
        this.imageName = imageName;
    }

    toPlainObject() {
        return {
            name: this.name,
            subString: this.subString,
            notes: this.notes,
            created: this.created,
            imageName: this.imageName
        }
    }
}