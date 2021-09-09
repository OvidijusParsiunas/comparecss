import { subcomponentAndOverlayElementIdsState } from '../../subcomponentAndOverlayElementIdsState';

export class OverlayElementUtils {

  public static getOverlayElements(activeSubcomponentName: string): HTMLElement[] {
    const elementIds = subcomponentAndOverlayElementIdsState.getPaddingComponentOverlayIdsViaSubcomponentName(activeSubcomponentName)
      || [subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentName(activeSubcomponentName)];
    return elementIds.map((elementId) => document.getElementById(elementId));
  }
}
