import assert from 'assert';
import Vue from 'vue';
import EaselSpriteSheet from '../src/components/EaselSpriteSheet.vue';
import easeljs from '../src/easel.js';

describe('EaselSpriteSheet', function () {

    const buildVm = function () {
        const vm = new Vue({
            template: `
                <easel-sprite-sheet ref="spriteSheet"
                    :images="['/base/test/images/lastguardian-all.png']"
                    :frames="{width: 32, height: 32}"
                    :animations="{stand: 32 * 6 + 16 + 5}"
                    :framerate="30"
                >
                    <x-inject ref="xInject"></x-inject>
                </easel-sprite-sheet>
            `,
            components: {
                'easel-sprite-sheet': EaselSpriteSheet,
                'x-inject': {
                    inject: ['spriteSheet'],
                    render() { return '<!-- -->' },
                },
            },
        }).$mount();

        const spriteSheet = vm.$refs.spriteSheet;
        const xInject = vm.$refs.xInject;

        return {vm, spriteSheet, xInject};
    };

    it('renders', function () {
        const {vm, spriteSheet, xInject} = buildVm();
        assert(spriteSheet);
    });

    it('should have spriteSheet field', function () {
        const {vm, spriteSheet, xInject} = buildVm();
        assert(spriteSheet.spriteSheet instanceof easeljs.SpriteSheet);
    });

    it('should have images in the spriteSheet', function () {
        const {vm, spriteSheet, xInject} = buildVm();
        assert(spriteSheet.spriteSheet._images);
    });

    it('should have frames in the spriteSheet', function () {
        const {vm, spriteSheet, xInject} = buildVm();
        assert(spriteSheet.spriteSheet._frameHeight === 32);
        assert(spriteSheet.spriteSheet._frameWidth === 32);
    });

    it('should have animations in the spriteSheet', function () {
        const {vm, spriteSheet, xInject} = buildVm();
        assert(spriteSheet.spriteSheet._animations.length > 0);
    });

    it('should have framerate in the spriteSheet', function () {
        const {vm, spriteSheet, xInject} = buildVm();
        assert(spriteSheet.spriteSheet.framerate === 30);
    });

    it('should provide spriteSheet', function () {
        const {vm, spriteSheet, xInject} = buildVm();
        assert(xInject.spriteSheet);
    });
});
