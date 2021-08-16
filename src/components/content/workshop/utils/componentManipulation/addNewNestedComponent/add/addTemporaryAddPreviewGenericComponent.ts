import { componentTypeToStyleGenerators } from '../../../../newComponent/types/componentTypeToStyleGenerators';
import { OverwritePropertiesFunc } from '../../../../../../../interfaces/overwriteSubcomponentPropertiesFunc';
import { TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { MultiBaseComponentUtils } from '../../../multiBaseComponent/multiBaseComponentUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AddNewGenericComponent } from './addNewGenericComponent';
import JSONUtils from '../../../generic/jsonUtils';

export class AddTemporaryAddPreviewGenericComponent extends AddNewGenericComponent {

  public static add(parentComponent: WorkshopComponent, componentType: COMPONENT_TYPES, componentStyle: COMPONENT_STYLES,
      layerName: string, overwritePropertiesFunc?: OverwritePropertiesFunc[]): WorkshopComponent {
    const componentGenerator = componentTypeToStyleGenerators[componentType][componentStyle];
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const [newComponent] = AddNewGenericComponent.createNewComponent(componentType, componentStyle,
      componentGenerator, activeBaseComponent, overwritePropertiesFunc, TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY);
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isTemporaryAddPreview = true;
    JSONUtils.addObjects(parentComponent, 'subcomponents', newComponent.subcomponents);
    AddNewGenericComponent.addNewComponentToComponentPreview(parentComponent, newComponent, layerName);
    return newComponent;
  }
}
