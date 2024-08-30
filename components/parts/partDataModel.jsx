export class PartDataModel {
    constructor(deviceId, name = '', notes = '', location = '', imageName = '', amount = 0, minAmount = 1, subString = []) {
        this.deviceId = deviceId
        this.name = name.toUpperCase();
        this.subString = subString;
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
            subString: this.subString,
            notes: this.notes,
            location: this.location,
            created: this.created,
            imageName: this.imageName,
            amount: this.amount,
            minAmount: this.minAmount
        }
    }
}