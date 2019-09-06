<template>
    <div ref="demo" class="train"></div>
</template>
<script>
import { createFourComponent } from './helper/index';

export default{
    created() {
        Promise.all([
            import('three'),
            import('three-orbitcontrols')
        ]).then(([Three, {default: OrbitControls}]) => {
                this.OrbitControls = OrbitControls;
                this.Three = Three;
                this.container = this.$refs.demo;
                this.render();
        });
    },
    data(){
        return{
            Three: '',
            container: '',
            camera: '',
            OrbitControls: '',

        }
    },
    methods: {
        render() {
            let basic =  createFourComponent(this.Three, this.container, this.OrbitControls);
            let {renderDom} = basic;
            this.container.append(renderDom);
        }
    },
}
</script>

<style lang='scss'>
.train {
    width: 600px;
    height: 600px;
}
</style>