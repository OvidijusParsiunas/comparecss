import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddLayerComponent } from './addLayerComponent';

export class AddTemporaryAddPreviewLayerComponent extends AddLayerComponent {

  public static addTemporary(activeComponent: WorkshopComponent, componentStyle: COMPONENT_STYLES): WorkshopComponent {
    const { higherComponentContainer } = ActiveComponentUtils.getHigherLevelComponents(activeComponent);
    const componentGenerator = componentTypeToStyleGenerators[COMPONENT_TYPES.LAYER][componentStyle];
    // WORK 2 -pass higher container container in here
    const newComponent = AddLayerComponent.createNewComponent(componentGenerator, activeComponent,
      TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY);
    newComponent.baseSubcomponent.isTemporaryAddPreview = true;
    Object.assign(activeComponent.subcomponents, newComponent.subcomponents);
    AddLayerComponent.addNewComponentToComponentPreview(higherComponentContainer, newComponent);
    newComponent.childComponentsLockedToLayer?.add(newComponent, activeComponent);
    return newComponent;
  }
}
