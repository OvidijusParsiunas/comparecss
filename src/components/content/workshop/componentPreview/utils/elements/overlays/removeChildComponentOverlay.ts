import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../../consts/subcomponentOverlayClasses.enum';
import { OverlayElementUtils } from './utils/overlayElementUtils';

export class RemoveChildComponentOverlay {

  public static display(activeSubcomponentName: string): void {
    OverlayElementUtils.getOverlayElements(activeSubcomponentName).forEach((element) => {
      element.classList.add(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
      element.style.display = 'block';
    });
  }

  public static hide(activeSubcomponentName: string): void {
    OverlayElementUtils.getOverlayElements(activeSubcomponentName).forEach((element) => {
      element.classList.remove(SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
      setTimeout(() => { element.style.display = 'none' });
    });
  }
}
