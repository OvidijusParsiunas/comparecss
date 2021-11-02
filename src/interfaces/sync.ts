import { SiblingChildComponentsAutoSynced } from './siblingChildComponentsAutoSynced';
import { SubcomponentTypeToProperties } from './subcomponentTypeToProperties';
import { WorkshopComponent } from './workshopComponent';

// in sync terminology refers to the component that is currently synced to another component

interface OnCopy {
  // this contains syncable component subcomponents (if the component has other subcomponents
  // with same types, their seed components will be located in the child components section)
  // the map structure is used to overcome the problem of different aligned component types being
  // stored within layers with different orders - as we would originally run into problems on
  // copying a button that has text as its first aligned component to a button which conains
  // an icon as its first aligned component
  subcomponents: SubcomponentTypeToProperties;
  // used to store nested syncable components
  // because a component can contain multiple child components with similar subcomponent types and
  // their numbers can change (e.g. layers), this property is additionally used to encapsulate them
  childComponents: WorkshopComponent[];
}

export interface Syncables {
  // container components that can be synced (can contain current and parent components)
  // placed in a growing order starting from the current up to the top most parent
  // this is mostly used to find component if any container or parent is in sync and if other
  // components are synced to them so they can be updated accordingly
  containerComponents: WorkshopComponent[];
  // properties which would be synced if current component was synced to another component
  onCopy?: OnCopy;
}

export interface Sync {
  componentThisIsSyncedTo: WorkshopComponent;
  componentsSyncedToThis: Set<WorkshopComponent>;
  syncables: Syncables;
  lastSelectedComponentToSync?: WorkshopComponent;
  // when sibling child components are auto synced - the sync button is not displayed, however
  // it is displayed when the child components are synced to components outside
  siblingChildComponentsAutoSynced?: SiblingChildComponentsAutoSynced;
}
