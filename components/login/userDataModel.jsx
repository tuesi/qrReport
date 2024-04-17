export class UserDataModel {
    constructor(username, dateCreated = new Date()) {
        this.username = username;
        this.dateCreated = dateCreated;
    }
}