import { GlbSpin, GlbRotator, SpinDirection } from './glb-system';
import { interactiveGlbs } from './glb-constants';
import { Sound } from 'src/glb-explorer/sound';

const BASE_GLB = 'models/Base.glb';
const CONTROLS_GLB = 'models/GlbExplorerButtons.glb';
const ROTATION_SFX = 'sounds/GlbRotateFX.wav';
const PREVIOUS_SFX = 'sounds/GlbNext.wav';
const NEXT_SFX = 'sounds/GlbPrevious.wav';

export class GlbExplorer extends Entity {
  currentGlbId: number;
  currentGlb: Entity;
  currentTitle: Entity;
  rotator: Entity;
  rotationSfx: Sound;
  nextSfx: Sound;
  previousSfx: Sound;

  constructor(transform: Transform) {
    super();

    const base = new Entity();
    base.addComponent(new GLTFShape(BASE_GLB));
    base.addComponent(transform);
    engine.addEntity(base);

    this.rotator = new Entity();
    this.rotator.addComponent(
      new Transform({
        position: transform.position.add(new Vector3(0, 5.5, 0)),
        scale: transform.scale,
        rotation: transform.rotation
      })
    );
    this.rotator.addComponent(new GlbRotator());
    engine.addEntity(this.rotator);

    this.currentGlbId = 0;
    this.currentGlb = new Entity();
    this.currentGlb.addComponent(
      new GLTFShape(interactiveGlbs[this.currentGlbId].glbUri)
    );
    this.currentGlb.addComponent(
      new OnPointerDown((e) => {
        openNFTDialog(interactiveGlbs[this.currentGlbId].nftUri);
      })
    );
    this.currentGlb.addComponent(interactiveGlbs[this.currentGlbId].transform);
    engine.addEntity(this.currentGlb);
    this.currentGlb.setParent(this.rotator);

    const controls = new Entity();
    controls.addComponent(new GLTFShape(CONTROLS_GLB));
    controls.addComponent(
      new Transform({
        position: transform.position.add(new Vector3(0, 1.5, -6)),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(45, 0, 0)
      })
    );
    engine.addEntity(controls);

    const initialTitle = new TextShape(
      interactiveGlbs[this.currentGlbId].title
    );
    initialTitle.fontSize = 2;
    this.currentTitle = new Entity();
    this.currentTitle.addComponent(initialTitle);
    this.currentTitle.addComponent(
      new Transform({
        position: transform.position.add(new Vector3(0, 0.75, -6)),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(45, 0, 0)
      })
    );
    engine.addEntity(this.currentTitle);

    this.rotationSfx = new Sound(new AudioClip(ROTATION_SFX));
    this.rotationSfx.getComponent(AudioSource).loop = true;
    this.rotationSfx.getComponent(AudioSource).playing = false;
    this.rotationSfx.getComponent(AudioSource).volume = 1.0;

    this.nextSfx = new Sound(new AudioClip(NEXT_SFX));
    this.nextSfx.getComponent(AudioSource).loop = false;
    this.nextSfx.getComponent(AudioSource).playing = false;
    this.nextSfx.getComponent(AudioSource).volume = 0.5;

    this.previousSfx = new Sound(new AudioClip(PREVIOUS_SFX));
    this.previousSfx.getComponent(AudioSource).loop = false;
    this.previousSfx.getComponent(AudioSource).playing = false;
    this.previousSfx.getComponent(AudioSource).volume = 0.5;
  }

  fire(event: any): void {
    let interactiveGlbs = engine.getComponentGroup(GlbRotator);
    for (let entity of interactiveGlbs.entities) {
      switch (event.hit.meshName) {
        case 'UpButton_collider': {
          entity.addComponentOrReplace(new GlbSpin(-6, SpinDirection.y));
          this.rotationSfx.getComponent(AudioSource).playing = true;
          break;
        }
        case 'DownButton_collider': {
          entity.addComponentOrReplace(new GlbSpin(6, SpinDirection.y));
          this.rotationSfx.getComponent(AudioSource).playing = true;
          break;
        }
        case 'LeftButton_collider': {
          entity.addComponentOrReplace(new GlbSpin(-6, SpinDirection.x));
          this.rotationSfx.getComponent(AudioSource).playing = true;
          break;
        }
        case 'RightButton_collider': {
          entity.addComponentOrReplace(new GlbSpin(6, SpinDirection.x));
          this.rotationSfx.getComponent(AudioSource).playing = true;
          break;
        }
        case 'Previous_collider': {
          this.previousSfx.getComponent(AudioSource).playOnce();
          this.loadPreviousGlb();
          break;
        }
        case 'Next_collider': {
          this.nextSfx.getComponent(AudioSource).playOnce();
          this.loadNextGlb();
          break;
        }
      }
    }
  }

  loadNextGlb() {
    this.currentGlbId++;
    if (this.currentGlbId >= interactiveGlbs.length) this.currentGlbId = 0;
    this.currentGlb.addComponentOrReplace(
      new GLTFShape(interactiveGlbs[this.currentGlbId].glbUri)
    );
    this.currentGlb.addComponentOrReplace(
      interactiveGlbs[this.currentGlbId].transform
    );
    this.currentGlb.addComponentOrReplace(
      new OnPointerDown(
        (e) => {
          openNFTDialog(interactiveGlbs[this.currentGlbId].nftUri);
        },
        {
          button: ActionButton.POINTER,
          showFeedback: false
        }
      )
    );
    this.rotator.getComponent(Transform).rotation = Quaternion.Euler(0, 0, 0);

    const title = this.currentTitle.getComponent(TextShape);
    title.value = interactiveGlbs[this.currentGlbId].title;
  }

  loadPreviousGlb() {
    this.currentGlbId--;
    if (this.currentGlbId < 0) this.currentGlbId = interactiveGlbs.length - 1;

    this.currentGlb.addComponentOrReplace(
      new GLTFShape(interactiveGlbs[this.currentGlbId].glbUri)
    );
    this.currentGlb.addComponentOrReplace(
      interactiveGlbs[this.currentGlbId].transform
    );
    this.currentGlb.addComponentOrReplace(
      new OnPointerDown(
        (e) => {
          openNFTDialog(interactiveGlbs[this.currentGlbId].nftUri);
        },
        {
          button: ActionButton.POINTER,
          showFeedback: false
        }
      )
    );
    this.rotator.getComponent(Transform).rotation = Quaternion.Euler(0, 0, 0);

    const title = this.currentTitle.getComponent(TextShape);
    title.value = interactiveGlbs[this.currentGlbId].title;
  }

  release(): void {
    let interactiveGlbs = engine.getComponentGroup(GlbRotator);
    for (let entity of interactiveGlbs.entities) {
      if (entity.hasComponent(GlbSpin)) entity.removeComponent(GlbSpin);
    }

    this.rotationSfx.getComponent(AudioSource).playing = false;
  }
}
