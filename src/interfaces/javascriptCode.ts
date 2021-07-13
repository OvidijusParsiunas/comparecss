export interface JavascriptCode {
  initializeJS: () => void;
  revokeJS: () => void;
  downloadables: {
    jsFileContent: string;
    cssFileContent: string;
  }
}
