import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerJournal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Journal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly title: string;
  readonly tags?: string | null;
  readonly morningText?: string | null;
  readonly afternoonText?: string | null;
  readonly nightText?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJournal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Journal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly title: string;
  readonly tags?: string | null;
  readonly morningText?: string | null;
  readonly afternoonText?: string | null;
  readonly nightText?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Journal = LazyLoading extends LazyLoadingDisabled ? EagerJournal : LazyJournal

export declare const Journal: (new (init: ModelInit<Journal>) => Journal) & {
  copyOf(source: Journal, mutator: (draft: MutableModel<Journal>) => MutableModel<Journal> | void): Journal;
}