export class DeviceDataModel {
    constructor(name, notes) {
        this.name = name;
        this.notes = notes;
        this.created = new Date();
    }

    toPlainObject() {
        return {
            name: this.name,
            notes: this.notes,
            created: this.created
        }
    }
}