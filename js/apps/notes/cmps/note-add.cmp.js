import { noteService } from "../services/note-service.js";

export default {
  template: `
    <section class="note-add flex justify-center">
        <input type="text" placeholder="Take a note..." v-model="noteText"/>
        <button @click="onAddNote">Add</button>
    </section>
    `,
  data() {
    return {
      noteText: "",
    };
  },
  //   created() {},
  computed: {},
  methods: {
    onAddNote() {
      noteService.addNewNote("noteText", this.noteText);
    },
  },
  components: {},
};
