export default {
  props: ["info"],
  template: `
       <section class="text-area">
             <textarea v-model="info.txt" @blur="saveChanges"></textarea>
        </section>
            
    `,
  methods: {
    saveChanges() {
      this.$emit("save");
    },
  },
};
