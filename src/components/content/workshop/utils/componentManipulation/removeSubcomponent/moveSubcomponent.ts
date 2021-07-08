// import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
// import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
// import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
// import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
// import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
// import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';

// type SelectNewSubcomponentCallback = (parentSubcomponentName: string) => void;
// interface SubcomponentValues {
//   selectNewSubcomponentCallback: SelectNewSubcomponentCallback;
//   subcomponentName: string;
//   parentComponent: WorkshopComponent;
//   subcomponentProperties: SubcomponentProperties;
// }

// export class MoveSubcomponent {

//   private static updateSubcomponentNames(subcomponentValues: SubcomponentValues, subcomponentDropdownStructure: NestedDropdownStructure,
//       removedSubcomponentDropdownIndex: number): void {
//     const { parentComponent, subcomponentProperties: { subcomponentType } } = subcomponentValues;
//     if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
//       UpdateGenericComponentNames.update(parentComponent, subcomponentDropdownStructure);
//     } else {
//       UpdateLayerComponentNames.update(parentComponent, removedSubcomponentDropdownIndex + 1);
//     }
//   }

//   private static removeNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): boolean {
//     const { subcomponentProperties, layers, alignedNestedComponents, index } = componentTraversalState;
//     const { subcomponentProperties: targetSubcomponentProperties } = this as any;
//     if (targetSubcomponentProperties === subcomponentProperties) {
//       if (layers) layers.splice(index, 1);
//       if (alignedNestedComponents) alignedNestedComponents.splice(index, 1);
//       return true;
//     }
//     return false;
//   }

//   private static removeSubcomponents(componentTraversalState: ComponentTraversalState, parentComponent: WorkshopComponent): void {
//     const { subcomponentName } = componentTraversalState;
//     const activeSubcomponent = parentComponent.subcomponents[subcomponentName];
//     Object.keys(activeSubcomponent?.nestedComponent?.ref.subcomponents|| {}).forEach((keyName) => {
//       delete parentComponent.subcomponents[keyName];
//     });
//   }

//   private static removeNestedComponentNestedComponents(componentTraversalState: ComponentTraversalState): boolean {
//     const { parentComponent } = this as any;
//     MoveSubcomponent.removeSubcomponents(componentTraversalState, parentComponent);
//     return true;
//   }

//   private static updateOptions(subcomponentNameStack: string[], selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
//     if (selectNewSubcomponentCallback) selectNewSubcomponentCallback(subcomponentNameStack[subcomponentNameStack.length - 2]);
//   }

//   private static removeNestedComponent(componentTraversalState: ComponentTraversalState, subcomponentValues: SubcomponentValues): void {
//     const { subcomponentName, subcomponentDropdownStructure, subcomponentNameStack } = componentTraversalState;
//     MoveSubcomponent.updateOptions(subcomponentNameStack, subcomponentValues.selectNewSubcomponentCallback);
//     MoveSubcomponent.removeSubcomponents(componentTraversalState, subcomponentValues.parentComponent);
//     ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
//       subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure,
//       MoveSubcomponent.removeNestedComponentNestedComponents.bind(subcomponentValues));
//     delete subcomponentDropdownStructure[subcomponentName];
//   }

//   private static removeNestedComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): boolean {
//     const { subcomponentName, subcomponentDropdownStructure } = componentTraversalState;
//     const subcomponentValues: SubcomponentValues = this as any;
//     if (subcomponentValues.subcomponentName === subcomponentName) {
//       const removedSubcomponentDropdownIndex = Object.keys(subcomponentDropdownStructure).indexOf(subcomponentName);
//       MoveSubcomponent.removeNestedComponent(componentTraversalState, subcomponentValues);
//       MoveSubcomponent.updateSubcomponentNames(subcomponentValues, subcomponentDropdownStructure, removedSubcomponentDropdownIndex);
//       return true;
//     }
//     return false;
//   }
  
//   public static move(component: WorkshopComponent, subcomponentName: string, selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
//     const subcomponentValues: SubcomponentValues = {
//       subcomponentName,
//       selectNewSubcomponentCallback,
//       parentComponent: component,
//       subcomponentProperties: component.subcomponents[subcomponentName],
//     };
//     ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
//       component.componentPreviewStructure,
//       MoveSubcomponent.removeNestedComponentInPreviewStructureIfFound.bind(subcomponentValues));
//     ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
//       component.componentPreviewStructure.subcomponentDropdownStructure,
//       MoveSubcomponent.removeNestedComponentUsingDropdownStructureIfFound.bind(subcomponentValues));
//   }
// }
