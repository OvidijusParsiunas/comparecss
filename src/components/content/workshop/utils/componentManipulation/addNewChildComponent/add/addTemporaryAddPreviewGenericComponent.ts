import { CHILD_COMPONENTS_BASE_NAMES, TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from './addNewGenericComponent';

export class AddTemporaryAddPreviewGenericComponent extends AddNewGenericComponent {

  public static addTemporary(selectedChildComponent: WorkshopComponent, childComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): WorkshopComponent {
    const { componentType, componentStyle, parentLayer, parentComponent,
      } = AddNewGenericComponent.getNewComponentProperties(selectedChildComponent, childComponentBaseName);
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const [newComponent] = AddNewGenericComponent.createNewComponent(componentType, componentStyle,
      componentGenerator, null, null, TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY);
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isTemporaryAddPreview = true;
    Object.assign(parentComponent.subcomponents, newComponent.subcomponents);
    AddNewGenericComponent.addNewComponentToComponentPreview(newComponent, parentLayer);
    return newComponent;
  }
}
