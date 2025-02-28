function containsPrimaryCodeFile(folder, primaryCodeFileId) {
    if (!folder || !folder.items) return false;
  
    for (const item of folder.items) {
      if (item.id === primaryCodeFileId) return true; 
      if (item.type === 0 && containsPrimaryCodeFile(item, primaryCodeFileId)) {
        return true; 
      }
    }
  
    return false; 
  }
export default containsPrimaryCodeFile