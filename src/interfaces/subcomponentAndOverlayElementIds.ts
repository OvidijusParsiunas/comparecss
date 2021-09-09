export type SubcomponentAndOverlayElementIds = {
  [subcomponentName: string]: {
    subcomponentId: string;
    overlayId: string;
    // if multiple overlays will be used by components other than the padding component - remove this peroperty and change overlayId to overlayIds arr
    paddingComponentOverlayIds?: string[];
  }
}
