import { subcomponentAndOverlayElementIdsState } from '../../subcomponentAndOverlayElementIdsState';

export class OverlayElementUtils {

  private static getSingleOverlayElementId(activeSubcomponentName: string): string[] {
    const overlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentName(activeSubcomponentName);
    return overlayElementId ? [overlayElementId] : [];
  }

  public static getOverlayElements(activeSubcomponentName: string): HTMLElement[] {
    const elementIds = subcomponentAndOverlayElementIdsState.getPaddingComponentOverlayIdsViaSubcomponentName(activeSubcomponentName)
      || OverlayElementUtils.getSingleOverlayElementId(activeSubcomponentName);
    return elementIds.map((elementId) => document.getElementById(elementId));
  }
}
