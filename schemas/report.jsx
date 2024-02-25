import { Realm, RealmProvider, useRealm, useQuery } from '@realm/react'

class Report extends Realm.Object {

    static generate(deviceId, name, description, isComplete, completedAt = null) {
        return {
            _id: new Realm.BSON.ObjectId(),
            deviceId,
            name,
            description,
            isComplete,
            createdAt: new Date(),
            completedAt
        };
    }

    static schema = {
        name: 'Report',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            deviceId: 'string',
            name: 'string',
            description: 'string',
            isComplete: 'bool',
            createdAt: 'date',
            completedAt: 'date?',
        },
    };
}