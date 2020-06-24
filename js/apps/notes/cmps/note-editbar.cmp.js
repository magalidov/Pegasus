import { eventBus } from "../services/event-bus.service.js";

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
                <i class="fas fa-edit" @click="onEdit"></i>
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
      eventBus.$emit("update", this.note);
    },
    onDeleteNote() {
      eventBus.$emit("delete", this.note.id);
    },
    onEdit() {
      if (this.note.type === "noteText") eventBus.$emit(`edit-${this.note.id}`);
      let editMode = this.note.info.isOnEdit;
      this.note.info.isOnEdit = !editMode;
    },
  },
};
