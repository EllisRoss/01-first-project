export const updateObjectInArray = (items, userId, objPropName, newObjProps) => {
    return items.map(item => {
        if (item[objPropName] === userId) {
            return {...item, ...newObjProps}
        }
        return item;
    })
}