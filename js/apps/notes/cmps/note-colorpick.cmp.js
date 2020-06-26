export default {
  template: `
    <section class="color-picker">
        <ul class="colors-list clean-list flex">
            <li v-for="color in colors" class="color" :style="{backgroundColor:color}" @click="setColor(color)">
            </li>
        </ul>
    </section>
    `,
  data() {
    return {
      colors: [
        "red",
        "blue",
        "yellow",
        "orange",
        "brown",
        "pink",
        "green",
        "grey",
        "purple",
        "lightblue",
      ],
    };
  },
  methods:{
    setColor(color){
      this.$emit('setColor',color)
    }
  }
};
