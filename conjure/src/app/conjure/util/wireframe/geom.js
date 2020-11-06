import * as THREE from 'three'

export function addBarycentricCoordinates (bufferGeometry, removeEdge, isTerrain) {
  const attrib = bufferGeometry.getIndex() || bufferGeometry.getAttribute('position');
  const count = attrib.count / 3;
  const barycentric = [];

  // for each triangle in the geometry, add the barycentric coordinates
  const Q = removeEdge ? 1 : 0;
  
    for (let i = 0; i < count; i++)
    {
        if(isTerrain)
        {
            barycentric.push(
                1, 0, Q,
                0, 1, 0,
                0, 0, 1,
            );
        }
        else
        {
            const even = i % 2 === 0;
            if(even)
            {
                barycentric.push(
                    0, 0, 1,
                    0, 1, 0,
                    1, 0, Q,
                );
            }
            else
            {
                barycentric.push(
                    0, 1, 0,
                    0, 0, 1,
                    1, 0, Q,
                );
            }
        }
  }
  
  // add the attribute to the geometry
  const array = new Float32Array(barycentric);
  const attribute = new THREE.BufferAttribute(array, 3);
  bufferGeometry.setAttribute('barycentric', attribute);
};

export function unindexBufferGeometry (bufferGeometry) {
  // un-indices the geometry, copying all attributes like position and uv
  const index = bufferGeometry.getIndex();
  if (!index) return; // already un-indexed

  const indexArray = index.array;
  const triangleCount = indexArray.length / 3;

  const attributes = bufferGeometry.attributes;
  const newAttribData = Object.keys(attributes).map(key => {
    return {
      array: [],
      attribute: bufferGeometry.getAttribute(key)
    };
  });

  for (let i = 0; i < triangleCount; i++) {
    // indices into attributes
    const a = indexArray[i * 3 + 0];
    const b = indexArray[i * 3 + 1];
    const c = indexArray[i * 3 + 2];
    const indices = [ a, b, c ];

    // for each attribute, put vertex into unindexed list
    newAttribData.forEach(data => {
      const attrib = data.attribute;
      const dim = attrib.itemSize;
      // add [a, b, c] vertices
      for (let i = 0; i < indices.length; i++) {
        const index = indices[i];
        for (let d = 0; d < dim; d++) {
          const v = attrib.array[index * dim + d];
          data.array.push(v);
        }
      }
    });
  }
  index.array = null;
  bufferGeometry.setIndex(null);
  console.log(newAttribData)

  //   now copy over new data
  newAttribData.forEach(data => {
    const newArray = new data.attribute.array.constructor(data.array);
    data.attribute.array = newArray;
    data.attribute.needsUpdate = true
  });
};
