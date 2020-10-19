const HaveSomeFun = (numberOfElements, physics) => {
  // adding some boxes (with physics)
  let objs = [];
  for (let i = 0; i < numberOfElements; i++) {
    const materials = [
      'standard',
      'basic',
      'normal',
      'phong',
      'line',
      'points',
    ];
    const Between = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);
    const RandomPick = (array) =>
      array[Math.floor(Math.random() * array.length)];

    if (Math.random() > 0.5) {
      let obj = physics.add.box(
        {
          x: Between(-10, 10),
          y: Between(10, 20),
          z: Between(-10, 10),
          width: Between(1, 2) / 10,
          height: Between(1, 2) / 10,
          depth: Between(1, 2) / 10,
          mass: 1,
        },
        {
          [RandomPick(materials)]: {
            color: Math.floor(Math.random() * 0xffffff),
          },
        },
      );
      obj.body.setRestitution(Math.floor(Math.random() * 10) / 20);
      objs.push(obj);
    } else {
      let obj = physics.add.sphere(
        {
          x: Between(-10, 10),
          y: Between(10, 20),
          z: Between(-10, 10),
          radius: Between(1, 2) / 10,
          mass: 1,
        },
        {
          [RandomPick(materials)]: {
            color: Math.floor(Math.random() * 0xffffff),
          },
        },
      );
      obj.body.setRestitution(Math.floor(Math.random() * 10) / 20);
      objs.push(obj);
    }
  }
  return objs;
};

export default HaveSomeFun;
