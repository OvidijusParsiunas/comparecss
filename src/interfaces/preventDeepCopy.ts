// these properties can be used to copy nested objects/values without doing a deep copy on the whole parent object
export interface CopyableKeys {
  object?: string[];
  value?: string[]; 
}

// this is used to prevent infinite traversal of customFeatures or customStaticFeatures objects during deepCopy process as these properties
// can sometimes refer to other components - which can then refer back to the original component and hence creating an infinite loop
export type PreventDeepCopy = {
  preventDeepCopy: {
    copyableKeys?: CopyableKeys[];
  };
};
