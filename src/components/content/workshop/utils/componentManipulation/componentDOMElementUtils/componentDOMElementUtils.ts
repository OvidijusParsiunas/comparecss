import { subcomponentAndOverlayElementIdsState } from '../../../componentPreview/utils/elements/subcomponentAndOverlayElementIdsState';
import { DOMUtils } from '../../generic/DOMUtils';

export class ComponentDOMElementUtils {
  
  public static displaySubcomponentElementIfHidden(subcomponentName: string): void {
    const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(subcomponentName);
    const subcomponentElement = document.getElementById(subcomponentId);
    if (subcomponentElement?.offsetParent === null) {
      DOMUtils.bubbleUnsetElementDisplayNoneProperty(subcomponentElement);
    }
  }
}
