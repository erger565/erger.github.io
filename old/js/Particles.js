const THREE = require('three');

export class Particles {
    /**
     * Represents Particles
     * @param {number} minX - minimum x value
     * @param {number} maxX -maximum x value
     * @param {number} minY - minimum y value
     * @param {number} maxY - maximum y value
     * @param {number} minZ - minimum z value
     * @param {number} maxZ - maximum z value
     * @param {number} amount - amount of particles distributed in given space
     * @constructor
     */
    constructor(minX, maxX, minY, maxY, minZ, maxZ, amount) {
        this.group = new THREE.Group();
        this.particle = null;
        this.amount = amount;
        this.x = {
            min: minX,
            max: maxX
        };
        this.y = {
            min: minY,
            max: maxY
        };
        this.z = {
            min: minZ,
            max: maxZ
        };
        this.init();
    }

    /**
     * adds the particles to the mainScene
     */
    init() {
        let self = this;
        for (let i = 0; i < self.amount; i++) {
            self.particle = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32),
                new THREE.MeshBasicMaterial()
            );
            self.particle.position.x = Particles.randomIntFromInterval(self.x.min, self.x.max);
            self.particle.position.y = Particles.randomIntFromInterval(self.y.min, self.y.max);
            self.particle.position.z = Particles.randomIntFromInterval(self.z.min, self.z.max);
            self.group.add(self.particle);
        }
    };

    /**
     * animates the particles in the mainScene
     */
    animate() {
        this.group.rotation.z += 0.0004;
    };

    /**
     * rotates the way around the z axis according to given angle
     * @param {number} angle
     */
    rotate(angle) {
        this.group.rotation.z += angle;
    };

    /**
     * positions particles according to given coordinates
     * @param {number} x - x position of particles group
     * @param {number} y - y position of particles group
     * @param {number} z - z position of particles group
     */
    position(x, y, z) {
        this.group.position.set(x, y, z);
    };

    /**
     * adds particles to given scene
     * @param {THREE.Scene} scene - scene to which the particles will be added
     */
    addToScene(scene) {
        scene.add(this.group);
    };

    /**
     * removes particles from given scene
     * @param {THREE.Scene} scene - scene from which the particles will be removed
     */
    removeFromScene(scene) {
        scene.remove(this.group);
    };

    /**
     * calculates random integer from interval
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    static randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

}
