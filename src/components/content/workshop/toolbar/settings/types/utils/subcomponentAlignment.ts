import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../../interfaces/actionsDropdownMouseEventCallbacks';

export default class SubcomponentAlignment {

  private static moveSubcomponentToTargetSection(event: ActionsDropdownMouseEventCallbackEvent): void {
    const { previousOptionName, triggeredOptionName, subcomponentProperties } = event;
    let nestedSubcomponentIndex = 0;
    const previousSectionArray = subcomponentProperties.parentLayer.sections.alignedSections[previousOptionName];
    for (let i = 0; i < previousSectionArray.length; i += 1) {
      if (previousSectionArray[i].subcomponentProperties === subcomponentProperties) {
        subcomponentProperties.parentLayer.sections.alignedSections[triggeredOptionName].unshift(previousSectionArray[i]);
        nestedSubcomponentIndex = i;
        break;
      }
    }
    previousSectionArray.splice(nestedSubcomponentIndex, 1);
  }

  public static generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
    return {
      mouseClickOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => {
      if (event.isCustomFeatureResetTriggered) SubcomponentAlignment.moveSubcomponentToTargetSection(event); },
      mouseEnterOptionCallback: SubcomponentAlignment.moveSubcomponentToTargetSection,
      mouseLeaveDropdownCallback: SubcomponentAlignment.moveSubcomponentToTargetSection,
    };
  }
}
