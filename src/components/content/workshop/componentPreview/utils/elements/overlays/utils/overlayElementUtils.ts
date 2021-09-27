import { subcomponentAndOverlayElementIdsState } from '../../subcomponentAndOverlayElementIdsState';

export class OverlayElementUtils {

  private static getSingleOverlayElementId(activeSubcomponentName: string): string[] {
    const overlayElementId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentName(activeSubcomponentName);
    return overlayElementId ? [overlayElementId] : [];
  }

  public static getOverlayElements(activeSubcomponentName: string): HTMLElement[] {
    let elementIds = subcomponentAndOverlayElementIdsState.getPaddingComponentOverlayIdsViaSubcomponentName(activeSubcomponentName);
    if (!elementIds) elementIds = OverlayElementUtils.getSingleOverlayElementId(activeSubcomponentName);
    return elementIds.map((elementId) => document.getElementById(elementId));
  }
}
