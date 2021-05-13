export enum SpinDirection {
  x,
  y,
  z
}

@Component('glbSpin')
export class GlbSpin {
  speed: number;
  direction: SpinDirection;
  constructor(speed: number = 3, direction: SpinDirection) {
    this.speed = speed;
    this.direction = direction;
  }
}

@Component('glbRotator')
export class GlbRotator {}

export class GlbRotatorSystem implements ISystem {
  group = engine.getComponentGroup(GlbSpin);

  update(dt: number) {
    for (let entity of this.group.entities) {
      const transform = entity.getComponent(Transform);
      const direction = entity.getComponent(GlbSpin).direction;
      const speed = entity.getComponent(GlbSpin).speed;

      switch (direction) {
        case SpinDirection.x: {
          transform.rotation = Quaternion.Euler(
            0,
            -dt * 10 * speed,
            0
          ).multiply(transform.rotation);
          break;
        }
        case SpinDirection.y: {
          transform.rotation = Quaternion.Euler(0, 0, dt * 10 * speed).multiply(
            transform.rotation
          );
          break;
        }
      }
    }
  }
}

engine.addSystem(new GlbRotatorSystem());
