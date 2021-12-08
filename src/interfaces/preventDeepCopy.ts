// this is used to prevent infinite traversal of customFeatures or customStaticFeatures objects during deepCopy process as these properties
// can sometimes refer to other components - which can then refer back to the original components and hence creating an infinite loop
export type PreventDeepCopy = {
  preventDeepCopy: true;
};
