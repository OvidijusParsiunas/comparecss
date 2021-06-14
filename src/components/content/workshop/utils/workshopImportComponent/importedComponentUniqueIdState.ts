let id = 0;

function getUniqueId(): number {
  return id += 1;
}

function resetUniqueId(): void {
  id = 0;
}

export const importedComponentUniqueIdState = {
  getUniqueId,
  resetUniqueId,
}
