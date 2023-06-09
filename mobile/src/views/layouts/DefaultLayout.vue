<template>
  <div class="h-100 layout" v-if="user" style="overflow: hidden">
    <Particles
      id="tsparticles"
      v-show="user.profileRewardActive !== null"
      ref="particles-container"
      class="particleJS-container"
      :particlesInit="particlesInit"
      :options="initParticlesCanvas(user.profileRewardActive)"
    />
    <app-bar v-if="!hideTopbar"></app-bar>
    <v-content class="h-100" :style="{ background: getBackgroundColor }">
      <sweepable @sweep="handleSweep">
        <slot />
      </sweepable>
    </v-content>
  </div>
  <div class="h-100" v-else>
    <page-loader></page-loader>
  </div>
</template>


<script>
import AppBar from "@/components/AppBar";
import { mapGetters } from "vuex";

export default {
  name: "DefaultLayout",
  components: {
    "app-bar": AppBar,
  },
  computed: {
    ...mapGetters({
      hideTopbar: "app/hide_topbar",
      user: "auth/user",
    }),
    getBackgroundColor() {
      if (this.$route.name === "score") {
        return "#f8f8f8";
      }
      if (this.$route.name === "settings") {
        return "#f8f8f8";
      }
      if (this.$route.name === "invite-user") {
        return "#f8f8f8";
      }
      return "#efefef";
    },
  },

  data: () => ({
    container: null,
    particlesBalls: {
      fpsLimit: 60,
      particles: {
        number: {
          value: 0,
        },
        color: {
          value: "random",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.3,
        },
        size: {
          value: 10,
          random: {
            enable: true,
            minimumValue: 5,
          },
        },
        move: {
          angle: {
            offset: 0,
            value: 30,
          },
          enable: true,
          speed: 15,
          direction: "top",
          random: false,
          straight: false,
          outModes: {
            default: "destroy",
          },
        },
      },
      detectRetina: true,
      background: {
        color: "#f8f8f8",
      },
      emitters: [
        {
          direction: "top",
          position: {
            y: 100,
          },
          life: {
            duration: 3,
            delay: 5,
            count: 0,
          },
        },
      ],
    },
    particlesSmalls: {
      particles: {
        background: {
          color: "transparent",
        },
        bounce: {
          vertical: {
            value: 0.85,
            random: {
              enable: true,
              minimumValue: 0.75,
            },
          },
        },
        color: {
          value: [
            "#3998D0",
            "#2EB6AF",
            "#A9BD33",
            "#FEC73B",
            "#F89930",
            "#F45623",
            "#D62E32",
            "#EB586E",
            "#9952CF",
          ],
        },
        number: {
          value: 1,
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: 5,
          random: {
            enable: true,
            minimumValue: 10,
          },
        },
        move: {
          enable: true,
          gravity: {
            enable: true,
            maxSpeed: 5,
          },
          speed: {
            min: 5,
            max: 10,
          },
          trail: {
            enable: true,
            fillColor: "transparent",
            length: 3,
          },
        },
      },
      detectRetina: true,
      background: {
        color: "transparent",
      },
      emitters: {
        life: {
          count: 0,
          duration: 1,
          delay: 3,
        },
        rate: {
          delay: 1,
          quantity: 5,
        },
        size: {
          width: 1,
          height: 1,
        },
      },
    },
    particlesChars: {
      autoPlay: true,
      fpsLimit: 40,
      background: {
        color: { value: "red" },
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
        opacity: 1,
      },
      backgroundMask: {
        composite: "destination-out",
        cover: { color: { value: "#f8f8f8" }, opacity: 0 },
        enable: false,
      },
      fullScreen: { enable: false, zIndex: 1 },
      detectRetina: true,
      duration: 0,
      motion: { disable: false, reduce: { factor: 4, value: true } },
      particles: {
        bounce: {
          horizontal: {
            random: { enable: false, minimumValue: 0.1 },
            value: 1,
          },
          vertical: { random: { enable: false, minimumValue: 0.1 }, value: 1 },
        },
        collisions: {
          bounce: {
            horizontal: {
              random: { enable: false, minimumValue: 0.1 },
              value: 1,
            },
            vertical: {
              random: { enable: false, minimumValue: 0.1 },
              value: 1,
            },
          },
          enable: false,
          mode: "bounce",
          overlap: { enable: true, retries: 0 },
        },
        color: {
          value: "#000",
          animation: {
            h: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
            s: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
            l: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
          },
        },
        destroy: {
          mode: "none",
          split: {
            count: 1,
            factor: { random: { enable: false, minimumValue: 0 }, value: 3 },
            rate: {
              random: { enable: false, minimumValue: 0 },
              value: { min: 4, max: 9 },
            },
            sizeOffset: true,
          },
        },
        gradient: [],
        groups: {},
        life: {
          count: 0,
          delay: {
            random: { enable: false, minimumValue: 0 },
            value: 0,
            sync: false,
          },
          duration: {
            random: { enable: false, minimumValue: 0.0001 },
            value: 0,
            sync: false,
          },
        },
        links: {
          blink: false,
          color: { value: "#000" },
          consent: false,
          distance: 150,
          enable: true,
          frequency: 1,
          opacity: 0.4,
          shadow: { blur: 5, color: { value: "#00ff00" }, enable: false },
          triangles: { enable: false, frequency: 1 },
          width: 1,
          warp: false,
        },
        move: {
          angle: { offset: 0, value: 90 },
          attract: {
            distance: 200,
            enable: false,
            rotate: { x: 600, y: 1200 },
          },
          decay: 0,
          distance: {},
          direction: "none",
          drift: 0,
          enable: true,
          gravity: {
            acceleration: 9.81,
            enable: false,
            inverse: false,
            maxSpeed: 50,
          },
          path: {
            clamp: true,
            delay: { random: { enable: false, minimumValue: 0 }, value: 0 },
            enable: false,
            options: {},
          },
          outModes: {
            default: "out",
            bottom: "out",
            left: "out",
            right: "out",
            top: "out",
          },
          random: false,
          size: false,
          speed: 2,
          spin: { acceleration: 0, enable: false },
          straight: false,
          trail: { enable: false, length: 10, fillColor: { value: "#000000" } },
          vibrate: false,
          warp: false,
        },
        number: {
          density: { enable: true, area: 800, factor: 1000 },
          limit: 0,
          value: 80,
        },
        opacity: {
          random: { enable: false, minimumValue: 0.1 },
          value: { min: 0.1, max: 0.5 },
          animation: {
            count: 0,
            enable: true,
            speed: 1,
            sync: false,
            destroy: "none",
            startValue: "random",
            minimumValue: 0.1,
          },
        },
        orbit: {
          animation: { count: 0, enable: false, speed: 1, sync: false },
          enable: false,
          opacity: 1,
          rotation: { random: { enable: false, minimumValue: 0 }, value: 45 },
          width: 1,
        },
        reduceDuplicates: false,
        repulse: {
          random: { enable: false, minimumValue: 0 },
          value: 0,
          enabled: false,
          distance: 1,
          duration: 1,
          factor: 1,
          speed: 1,
        },
        roll: {
          darken: { enable: false, value: 0 },
          enable: false,
          enlighten: { enable: false, value: 0 },
          mode: "vertical",
          speed: 25,
        },
        rotate: {
          random: { enable: false, minimumValue: 0 },
          value: 0,
          animation: { enable: false, speed: 0, sync: false },
          direction: "clockwise",
          path: false,
        },
        shadow: {
          blur: 0,
          color: { value: "#000000" },
          enable: false,
          offset: { x: 0, y: 0 },
        },
        shape: {
          options: {
            character: {
              value: ["D", "E", "V", "C", "O", "R", "E"],
              font: "Verdana",
              style: "",
              weight: "400",
              fill: true,
            },
            char: {
              value: ["D", "E", "V", "C", "O", "R", "E"],
              font: "Verdana",
              style: "",
              weight: "400",
              fill: true,
            },
          },
          type: "char",
        },
        size: {
          random: { enable: false, minimumValue: 1 },
          value: 16,
          animation: {
            count: 0,
            enable: false,
            speed: 10,
            sync: false,
            destroy: "none",
            startValue: "random",
            minimumValue: 10,
          },
        },
        stroke: {
          width: 1,
          color: {
            value: "#ffffff",
            animation: {
              h: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
              s: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
              l: { count: 0, enable: false, offset: 0, speed: 1, sync: true },
            },
          },
        },
        tilt: {
          random: { enable: false, minimumValue: 0 },
          value: 0,
          animation: { enable: false, speed: 0, sync: false },
          direction: "clockwise",
          enable: false,
        },
        twinkle: {
          lines: { enable: false, frequency: 0.05, opacity: 1 },
          particles: { enable: false, frequency: 0.05, opacity: 1 },
        },
        wobble: { distance: 5, enable: false, speed: 50 },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [],
      themes: [],
      zLayers: 100,
    },
  }),
  mounted() {
    document.body.classList.add("default-layout");
    document.body.classList.remove("external-layout");
    // //this.particlesImage.particles.shape.image.src = this.user.avatarUrl;
    if (this.user) {
      this.particlesChars.particles.shape.options.character.value = [
        ...this.user.firstName,
      ];
      this.particlesChars.particles.shape.options.char.value = [
        ...this.user.lastName,
      ];
    }
  },
  beforeDestroy() {
    document.body.classList.remove("default-layout");
  },
  watch: {
    getProfileRewardActive: {
      handler(newVal) {
        this.initParticlesCanvas(newVal);
      },
    },
  },
  methods: {
    particlesInit(main) {
      this.container = main;
    },
    initParticlesCanvas(reward) {
      if (!this.container) return;
      this.$nextTick(() => {
        if (reward == 0) {
          this.container.load("tsparticles", {
            ...this.particlesChars,
          });
        } else if (reward == 1) {
          this.container.load("tsparticles", {
            ...this.particlesBalls,
          });
        } else {
          const el = this.$refs["particles-container"].container;
          if (el) el.stop();
        }
      });
      // if (reward === 0) {
      //   this.container.load("tsparticles", {
      //     // ...this.particleBalls,
      //   });
      //   this.container.refresh();
      // } else if (reward === 1) {
      //   this.container.load("tsparticles", {
      //     ...this.particlesSmalls,
      //   });
      //   this.container.refresh();
      // } else if (reward === 2) {
      //   this.container.load("tsparticles", {
      //     ...this.particlesChars,
      //   });
      //   this.container.refresh();
      // } else {
      //   this.container.load("tsparticles", {
      //     ...this.particleLines,
      //   });
      //   this.container.refresh();
      // }

      // if (particlesContainer.container.paused) {
      //   particlesContainer.container.play();
      // } else {
      //   particlesContainer.container.pause();
      // }
    },
    handleSweep(direction) {
      if (direction === "left") {
        if (this.$route.name === "projects") {
          this.$router.push({
            name: "settings",
          });
        }
      } else if (direction == "right") {
        if (this.$route.name === "settings") {
          this.$router.push({
            name: "projects",
          });
        }
      }
    },
  },
};
</script>
<style>
.particleJS-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>