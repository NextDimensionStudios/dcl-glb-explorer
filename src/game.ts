import { GlbExplorer } from 'src/glb-explorer/glb-explorer';

const glbExplorer = new GlbExplorer(
  new Transform({
    position: new Vector3(16, 0, 16),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0, 0, 0)
  })
);

const input = Input.instance;
input.subscribe('BUTTON_DOWN', ActionButton.POINTER, true, (event: any) => {
  glbExplorer.fire(event);
});

input.subscribe('BUTTON_UP', ActionButton.POINTER, true, (event: any) => {
  glbExplorer.release();
});
