import { eventBus } from "../services/event-bus.service.js";

export default {
  props: ["note"],
  template: `
       <section class="text-area">
             <textarea ref="textarea" v-model="note.info.txt" @blur="onEdit" @click="onFocus"></textarea>
        </section>
            
    `,
  created() {
    eventBus.$on(`edit-${this.note.id}`, () => this.onFocus());
  },
  methods: {
    onEdit() {
      this.$emit("edit");
    },
    onFocus() {
      this.$refs["textarea"].select();
    },
  },
};
