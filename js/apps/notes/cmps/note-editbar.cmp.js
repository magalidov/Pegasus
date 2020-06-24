import { noteService } from "../services/note-service.js";

export default {
  props: ["note"],
  template: `
        <section class="edit-bar flex ">
                <i class="fas fa-trash-alt" @click="onDeleteNote"></i>
                <label for="colorInput" @change="onUpdateNote">
                <i class="fas fa-palette">
                    <!-- <color-pick> -->
                </i>
                </label>
                <i class="fas fa-envelope"></i>
        </section>
    `,
  data() {
    return {
      noteColor: this.note.style.backgroundColor,
    };
  },
  methods: {
    onUpdateNote() {
      this.note.style.backgroundColor = this.noteColor;
      noteService.updateNote(this.note);
    },
    onDeleteNote() {
      noteService.deleteNote(this.note);
    },
  },
  created(){
      console.log(this.note)
  }
};
