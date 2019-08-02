import assert from 'assert';
import EaselContainer from '../src/components/EaselContainer.vue';
import easeljs from '../src/easel.js';
import Vue from 'vue';
import isAnEaselParent from './includes/is-an-easel-parent.js';
import EaselFake from './fixtures/EaselFake.js';
import isADisplayObject from './includes/is-a-display-object.js';

describe('EaselContainer', function () {

    describe('is an easel parent that', isAnEaselParent(EaselContainer));

    describe('is a display object that', isADisplayObject(EaselContainer));

    const easel = {
        addChild(vueChild) {
        },
        removeChild(vueChild) {
        },
    };

    const vm = new Vue({
        template: `
            <easel-container ref="container">
                <easel-fake ref="fake"
                    x="3"
                    y="4"
                >
                </easel-fake>
            </easel-container>
        `,
        provide() {
            return {
                easel: easel,
            };
        },
        data() {
            return {
            };
        },
        components: {
            'easel-fake': EaselFake,
            'easel-container': EaselContainer,
        },
    }).$mount();

    const container = vm.$refs.container;
    const fake = vm.$refs.fake;

    it('should exist', function () {
        assert(container);
    });

    it('should have an easel', function () {
        assert(container.easel);
    });

    it('should have component field', function () {
        assert(container.component);
    });

    it('should be the parent of the fake', function () {
        assert(fake.component.parent === container.component);
    });

    it('should getBounds', function (done) {
        container.getBounds()
            .then(
                (bounds) => {
                    assert(bounds.width === 0);
                    assert(bounds.height === 0);
                },
                (error) => {
                    assert(false, error);
                }
            )
            .then(done, done);
    });
});
