export function mergeData(main, extras) {
  let mergedData = [];

  main.forEach(item => {
    let firstRelationID = item.relationships.image.data.id;
    let included = null;

    extras.forEach(image => {
      if(image.id == firstRelationID) {
        let secondRelationID = image.relationships.imageFile.data.id;

        return extras.forEach(file => {
          if(file.id == secondRelationID) {
            included = file.attributes.url;
          }
        })
      }
    })

    return mergedData.push({
      mainContent: item,
      imageUrl: included
    });
  });

  return mergedData;
}

// Merge the data and the included data from JSON API.
/*
  > data = main data object
  > extras = included data object
  > fields = (strings array) - name of the fields that i want to extract from the included data object
*/
export function mergeDataWithFields(data, extras, fields=[]) {
  let mergedData = [];

  data.forEach(item => {
    let included = {};
    if(item.relationships == undefined) { return null; }

    fields.forEach(field => {
      let firstRelationID = item.relationships[field].data.id;

      extras.forEach(extra => {
        if(extra.id == firstRelationID) {
          if(extra.relationships !== undefined) {
            for(let prop in extra.relationships) {
              let secondRelationID = extra.relationships[prop].data.id;
              
              return extras.forEach(file => {
                if(file.id == secondRelationID) {
                  included[field] = file.attributes;
                }
              });
            }
          } else {
            return included[field] = extra.attributes;
          }
        }
      })
    })

    return mergedData.push({
      main: item,
      extra: included
    });
  });

  return mergedData;
}
