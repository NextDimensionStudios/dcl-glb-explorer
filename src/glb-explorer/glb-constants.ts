export const interactiveGlbs: {
  title: string;
  glbUri: string;
  nftUri: string;
  transform: Transform;
}[] = [
  {
    title: 'Harmonic Union',
    glbUri: 'models/HarmonicUnion.glb',
    nftUri: 'ethereum://0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/15149',
    transform: new Transform({
      position: new Vector3(0, -1, 0),
      scale: new Vector3(0.0015, 0.0015, 0.0015),
      rotation: Quaternion.Euler(0, 180, 0)
    })
  },
  {
    title: 'What is Art? pt. II',
    glbUri: 'models/Trash.glb',
    nftUri: 'ethereum://0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/13028',
    transform: new Transform({
      position: new Vector3(0, -3, 0),
      scale: new Vector3(0.05, 0.05, 0.05),
      rotation: Quaternion.Euler(0, 180, 0)
    })
  },
  {
    title: 'Within Reach',
    glbUri: 'models/WithinReach.glb',
    nftUri: 'ethereum://0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/11751',
    transform: new Transform({
      position: new Vector3(0, 0, 0),
      scale: new Vector3(0.25, 0.25, 0.25),
      rotation: Quaternion.Euler(0, 180, 0)
    })
  }
];
