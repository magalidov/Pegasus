import { eventBus } from "../services/event-bus.service.js";

export default {
  props: ["info"],
  template: `
       <section class="todos-area">
            <ul class="clean-list">

              <label for="new-task" class="flex space-between" @click="onAdd">
              Add New Task<i class="fas fa-plus-circle" id="new-task" ></i>
              </label>
              <input type="text" placeholder="Enter New Task.." v-if="isAddClicked">
                <li v-for="(todo,idx) in info.todos" class="felx space-between" >
                <label :for="idx" :class="{ isDone: todo.doneAt}">
                  <input v-model="todo.isDone" type="checkbox" :id="idx" @click="todo.doneAt=!todo.doneAt" >
                  {{todo.txt}}
                </label>
                  <i class="fas fa-trash-alt justify-self-end" ></i>
                </li>
            </ul>
        </section>
            
    `,
  data() {
    return {
      isAddClicked: false,
    };
  },
  created() {
    eventBus.$on(`edit-${this.id}`, () => this.onFocus());
  },
  computed: {
    doneClass() {
      return { isDone: this.todo.isDone };
    },
   
  },
  methods: {
    onEdit() {
      this.$emit("edit");
    },
    onFocus() {
      this.$refs["textarea"].select();
    },
    onAdd() {
      this.isAddClicked = !this.isAddClicked;
    },
  },
};
