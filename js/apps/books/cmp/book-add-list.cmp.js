
export default {
    props: ['foundBooks'],
    template: `
        <ul class="found-books-list">
            <li class="found-book flex space-between" v-for="book in foundBooks">
                {{book.volumeInfo.title}} - {{book.saleInfo.saleability}}
                <button class="btn-add-book" @click="add(book)">+</button>
            </li>
        </ul>
    `,
    methods: {
        add(book) {
            this.$emit('addBook', book)
        }

    }
}