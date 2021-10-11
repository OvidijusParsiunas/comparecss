import { SubcomponentTypeToProperties } from './subcomponentTypeToProperties';
import { WorkshopComponent } from './workshopComponent';

// in sync terminology refers to the component that is currently synced to another component

// properties which would be synced if the component was synced to another component
export interface Syncables {
  // this contains subcomponents that are directly owned by the component (if the component has
  // other subcomponents with same types, their seed components will be located in the child
  // components section)
  // the map structure is used to overcome the problem of different aligned component types being
  // stored within layers along with their different orders - as we would originally run into
  // problems when copying a button that has text as its first aligned component to a button
  // which conains an icon as its first aligned component
  subcomponents: SubcomponentTypeToProperties;
  // because a component can contain multiple child components with similar subcomponent types
  // and their numbers can change (e.g. layers), this property is used to encapsulate them
  childComponents: WorkshopComponent[];
}

export interface Sync {
  componentThisIsSyncedTo: WorkshopComponent;
  componentsSyncedToThis: Set<WorkshopComponent>;
  syncables?: Syncables;
  lastSelectedComponentToSync?: WorkshopComponent;
  // WORK 2 - growing responsibility
  syncComponentReferences: WorkshopComponent[];
}
