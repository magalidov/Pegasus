import { eventBus } from "../services/event-bus.service.js";
import colorPicker from "../cmps/note-colorpick.cmp.js";

export default {
  props: ["note"],
  template: `
        <section class="edit-bar flex space-between ">
                <i class="fas fa-trash" @click="onDeleteNote"></i>
                <i class="fas fa-palette" @click="openColor"></i>
                <color-picker v-show="showColorPicker" @setColor="onSetColor"/>
                <i class="fas fa-edit" @click="onEdit"></i>
                <i class="fas fa-envelope"></i>
        </section>
    `,
  data() {
    return {
      noteColor: this.note.style.backgroundColor,
      showColorPicker: false,
    };
  },
  computed: {},
  methods: {
    onUpdateNote() {
      this.note.style.backgroundColor = this.noteColor;
      eventBus.$emit("update", this.note);
    },
    onDeleteNote() {
      eventBus.$emit("delete", this.note.id);
    },
    onSetColor(color) {
      this.note.style.backgroundColor = color;
      eventBus.$emit("update", this.note);
    },
    onEdit() {
      if (this.note.type === "noteText") eventBus.$emit(`edit-${this.note.id}`);
      let editMode = this.note.isOnEdit;
      this.note.isOnEdit = !editMode;
    },
    openColor() {
      this.showColorPicker = !this.showColorPicker;
    },
  },
  components: {
    colorPicker,
  },
};
