export interface JavascriptCode {
  executeJS: () => void;
  revokeJS: () => void,
  downloadables: {
    jsFileContent: string,
    cssFileContent: string,
  }
}
