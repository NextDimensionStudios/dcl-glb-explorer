import { GlbExplorer } from 'src/glb-explorer/glb-explorer';

const glbExplorer = new GlbExplorer(
  new Transform({
    position: new Vector3(8, 1.5, 8),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0, -90, 0)
  })
);

const input = Input.instance;
input.subscribe('BUTTON_DOWN', ActionButton.POINTER, true, (event: any) => {
  glbExplorer.fire(event);
});

input.subscribe('BUTTON_UP', ActionButton.POINTER, true, (event: any) => {
  glbExplorer.release();
});
