export function createFourComponent(Three, container, OrbitControls) {
    const { PerspectiveCamera, Scene, CylinderBufferGeometry, Mesh, Group,
        WebGLRenderer, DirectionalLight, MeshStandardMaterial}  = Three;
         
    let scene = new Scene();
    
    
    let camera = new PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 100 );
    camera.position.set( -5, 5, 7 );

    let controls = new OrbitControls( camera, container );

    //直线光照
    let mainLight = new DirectionalLight( 0xffffff, 5 );
    mainLight.position.set(5,5,5);
    scene.add(mainLight);


    //创建材质
    //darkgrey 
    const darkgreyMaterial = new MeshStandardMaterial( {
        color: 0x333333,
        flatShading: true,
    });

    // red
    const redMaterial = new MeshStandardMaterial( {
        color: 0xff3333,
        flatShading: true,
    });


    //添加几何体
    //鼻子
    const nose = new CylinderBufferGeometry( 0.75, 0.75, 3, 12 );

    let trainGroup = new Group();
    scene.add(trainGroup);

    let noseMesh = new Mesh(nose, darkgreyMaterial);
    noseMesh.rotation.z = Math.PI / 2;
    noseMesh.position.x = -1;
    trainGroup.add(noseMesh);


    let renderer = new WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    let renderDom = renderer.domElement;

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
    return {
        camera,
        controls,
        renderDom
    };
}