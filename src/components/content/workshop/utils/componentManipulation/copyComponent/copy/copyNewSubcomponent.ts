import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from '../../addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../addNewNestedComponent/add/addNewLayerComponent';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { CopyComponentShared } from './copyComponentShared';

export class CopyNewSubcomponent extends CopyComponentShared {
  
  private static copyExistingSubcomponentProperties(newSubcomponent: SubcomponentProperties, subcomponentBeingCopied: SubcomponentProperties): void {
    if (!subcomponentBeingCopied.baseSubcomponentRef && subcomponentBeingCopied.nestedComponent?.inSync) {
      CopyComponentShared.copyInSyncSubcomponent(subcomponentBeingCopied.nestedComponent, newSubcomponent, subcomponentBeingCopied);
    } else {
      CopyComponentShared.copySubcomponentProperties(newSubcomponent, subcomponentBeingCopied); 
    }
  }

  private static copyExistingSubcomponentsProperties(subcomponentBeingCopied: SubcomponentProperties, newNestedComponent: WorkshopComponent): void {
    const { nestedComponent: copiedNestedComponent } = subcomponentBeingCopied;
    const newSubcomponentNames = Object.keys(newNestedComponent.subcomponents);
    const copiedSubcomponentNames = Object.keys(copiedNestedComponent.ref.subcomponents);
    for (let i = 0; i < newSubcomponentNames.length; i += 1) {
      const newSubcomponent = newNestedComponent.subcomponents[newSubcomponentNames[i]];
      const subcomponentBeingCopied = copiedNestedComponent.ref.subcomponents[copiedSubcomponentNames[i]];
      CopyNewSubcomponent.copyExistingSubcomponentProperties(newSubcomponent, subcomponentBeingCopied);
    }
  }

  private static getNewComponentParentLayer(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      copiedComponentParentLayer: Layer): Layer {
    const { layers: newComponentLayers } = newComponent.componentPreviewStructure;
    const { layers: copiedComponentLayers } = componentBeingCopied.componentPreviewStructure;
    return newComponentLayers[copiedComponentLayers.indexOf(copiedComponentParentLayer)];
  }

  private static createNewAndCopyExistingComponentProperties(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      subcomponentName: string, baseComponentRefs: WorkshopComponent[]): void {
    const { nestedComponent: { ref: { type, style } }, parentLayer } = componentBeingCopied.subcomponents[subcomponentName];
    const newComponentParentLayer = CopyNewSubcomponent.getNewComponentParentLayer(newComponent, componentBeingCopied, parentLayer);
    const newNestedComponent = AddNewGenericComponent.add(newComponent, type, style, newComponentParentLayer.name);
    baseComponentRefs.push(newNestedComponent.subcomponents[newNestedComponent.coreSubcomponentNames.base].nestedComponent.ref);
    CopyNewSubcomponent.copyExistingSubcomponentsProperties(componentBeingCopied.subcomponents[subcomponentName], newNestedComponent);
  }

  private static createNewAndCopyExistingLayerProperties(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      subcomponentName: string, newComponentStyle: COMPONENT_STYLES): void {
    const layerComponent = AddNewLayerComponent.add(newComponent, newComponentStyle, true);
    CopyComponentShared.copySubcomponentProperties(layerComponent.subcomponents[layerComponent.coreSubcomponentNames.base],
      componentBeingCopied.subcomponents[subcomponentName]);
  }

  public static copy(newComponent: WorkshopComponent, componentBeingCopied: WorkshopComponent,
      subcomponentName: string, baseComponentRefs: WorkshopComponent[]): void {
    const { type, style } = componentBeingCopied.subcomponents[subcomponentName].nestedComponent.ref;
    if (type === COMPONENT_TYPES.LAYER) {
      CopyNewSubcomponent.createNewAndCopyExistingLayerProperties(newComponent, componentBeingCopied, subcomponentName, style);
    } else {
      CopyNewSubcomponent.createNewAndCopyExistingComponentProperties(newComponent, componentBeingCopied,
      subcomponentName, baseComponentRefs)
    }
  }
}
