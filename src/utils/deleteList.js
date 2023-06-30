export const deleteList = (list, todoInfo, handleSetList) => {
  const copy = list.slice();
  const findIdx = copy.findIndex((el) => el.id === todoInfo.id);
  copy.splice(findIdx, 1);
  handleSetList(copy);
};
