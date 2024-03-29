export const defaultData = (date) => {
  return {
    id: date.toISOString(),
    text: '',
    dueDate: `${date.getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
    isChecked: false,
  };
};
