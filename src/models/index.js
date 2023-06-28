// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Journal } = initSchema(schema);

export {
  User,
  Journal
};