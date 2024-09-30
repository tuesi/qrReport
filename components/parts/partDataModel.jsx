export class PartDataModel {
    constructor(deviceId, name = '', notes = '', location = '', imageName = '', amount = 0, minAmount = 1) {
        this.deviceId = deviceId
        this.name = name.toUpperCase();

        this.notes = notes;
        this.location = location;
        this.created = new Date();
        this.imageName = imageName;
        this.amount = amount;
        this.minAmount = minAmount;
    }

    toPlainObject() {
        return {
            deviceId: this.deviceId,
            name: this.name,
            notes: this.notes,
            location: this.location,
            created: this.created,
            imageName: this.imageName,
            amount: this.amount,
            minAmount: this.minAmount
        }
    }
}