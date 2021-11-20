import { SiblingChildComponentsAutoSynced } from './siblingChildComponentsAutoSynced';
import { ComponentTypeToProperties } from './componentTypeToProperties';
import { WorkshopComponent } from './workshopComponent';

// in sync terminology refers to the component that is currently synced to another component

interface TemporarySyncExecutables {
  on?: (componentToBeSynced: WorkshopComponent) => void;
  off?: (componentToBeSynced: WorkshopComponent) => void;
}

interface OnSyncComponents {
  // this stores syncable components that are unique and not repeated - e.g button text and icon
  // the map structure is used to overcome the problem of differently aligned components with
  // different orders - as we would originally run into problems on copying a button that has
  // text as its first aligned component with a button which contains an icon as its first
  // aligned component
  // this includes the component itself - so for button it would be:
  // { button: ..., text: ..., icon... }
  uniqueComponents: ComponentTypeToProperties;
  // used to store syncable components that are repeated (e.g. layers)
  repeatedComponents: WorkshopComponent[];
}

export interface Syncables {
  // container components that can be synced (can contain current and parent components)
  // placed in a growing order starting from the current up to the top most parent
  // this is mostly used to find component if any container or parent is in sync and if other
  // components are synced to them so they can be updated accordingly
  containerComponents: WorkshopComponent[];
  // component that would be synced if current component was synced to another component
  onSyncComponents?: OnSyncComponents;
}

export interface Sync {
  componentThisIsSyncedTo: WorkshopComponent;
  componentsSyncedToThis: Set<WorkshopComponent>;
  syncables: Syncables;
  lastSelectedComponentToSync?: WorkshopComponent;
  // when sibling child components are auto synced - the sync button is not displayed, however
  // it is displayed when the child components are synced to components outside
  siblingChildComponentsAutoSynced?: SiblingChildComponentsAutoSynced;
  temporarySyncExecutables?: TemporarySyncExecutables;
}
