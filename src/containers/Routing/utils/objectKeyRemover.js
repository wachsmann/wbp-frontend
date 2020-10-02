export default (obj, propToDelete) => {
    const { [propToDelete]: deleted, ...objectWithoutDeletedProp } = obj;
    return objectWithoutDeletedProp;
  }