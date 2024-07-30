export function getPropertyByKeyString(obj: Object, property: string) {

  const properties = property.split('.');
  let currentObj: any = obj;

  for (let property of properties) {
    if (currentObj.hasOwnProperty(property)) {
      currentObj = currentObj[property];
    }
    else {
      return undefined;
    }
  }

  return currentObj;

}

export function setPropertyByKeyString(obj: Object, property: string, value: any): void {
  const properties = property.split('.');
  let currentObj: any = obj;

  for (let propertyIndex in properties) {
    const property = properties[+propertyIndex];

    if (+propertyIndex === properties.length - 1) {
      currentObj[property] = value;
      break;
    }

    if (currentObj.hasOwnProperty(property)) {
      currentObj = currentObj[property];
    }
    else {
      currentObj[property] = {};
      currentObj = currentObj[property];
    }
  }
}
