export class UserDataModel {
    constructor(username, dateCreated = new Date()) {
        this.username = username;
        this.dateCreated = dateCreated;
    }

    toPlainObject() {
        return {
            username: this.username,
            dateCreated: this.dateCreated
        }
    }
}