export class DeviceDataModel {
    constructor(name, notes) {
        this.name = name;
        this.notes = notes;
    }

    toPlainObject() {
        return {
            name: this.name,
            notes: this.notes
        }
    }
}