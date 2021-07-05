const defaultId = 2;
let id = defaultId;

function getUniqueId(): number {
  return id += 1;
}

function resetUniqueId(): void {
  id = defaultId;
}

export const uniqueSubcomponentIdState = {
  getUniqueId,
  resetUniqueId,
}
