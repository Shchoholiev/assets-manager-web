function findParentFolder(folder, itemId) {
  if (!folder || !folder.items) return null;

  for (const item of folder.items) {
    if (item.id === itemId) {
      return folder; 
    }
    if (item.type === 0) { 
      const parentFolder = findParentFolder(item, itemId);
      if (parentFolder) return parentFolder;
    }
  }

  return null;
}

export default findParentFolder;
