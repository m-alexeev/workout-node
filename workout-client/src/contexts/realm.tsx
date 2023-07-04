import {Realm, createRealmContext} from '@realm/react'
import Exercise from '../models/exercise'
import BodyPart from '../models/bodyPart'
import Equipment from '../models/equipment'
import TargetMuscle from '../models/targetMuscle'

// Create realm config, this is where migrations will be set further on
const realmConfig: Realm.Configuration = {
  schema: [Exercise, BodyPart, Equipment, TargetMuscle]
};

const {RealmProvider, useObject, useQuery, useRealm} = createRealmContext(realmConfig);

export {RealmProvider, useObject, useQuery, useRealm};


