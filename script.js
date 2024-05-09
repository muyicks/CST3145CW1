
var app = new Vue({
    el: '#app',
    data: {
        showProduct: true,
        lessons: lessons,
        cart: [],
        searchTerm: '',
        username: '',
        phone: '',
        sortAttribute: 'subject',
        sortOrder: 'asc',
        sortedLessons: [],
    },
    methods: {
        addToCart(lesson) {
            if (lesson.spaces > 0) {
                lesson.spaces--;
                var cartIndex = this.cart.findIndex(i => i.lesson === lesson);
                if (cartIndex > -1) {
                    this.cart[cartIndex].amount++;
                } else {
                    this.cart.push({
                        lesson: lesson,
                        amount: 1
                    });
                }
            }
        },
        removeProduct(lesson) {
            const index = this.cart.findIndex(i => i.lesson === lesson);
            if (index !== -1) {
                this.cart[index].amount--;
                lesson.spaces += 1;
                if (this.cart[index].amount == 0) {
                    this.cart.splice(index, 1);
                }
            }
        },
        checkItemCount(id) {
            let itemCount = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    itemCount += 1;
                }
            }
            return itemCount;
        },
        showCheckOut() {
            this.showProduct = this.showProduct ? false : true;
        },
      

        removeFromCart (item) {
            item.lesson.Spaces += item.amount;
            const lessonIndex = this.cart.findIndex(cartItem => cartItem.lesson === item.lesson);
            if (lessonIndex !== -1) {
                this.cart.splice(lessonIndex, 1);
            }
        },
    },
    
    computed: {
        searchLessons() {
            const searchTerm = this.searchTerm.toLowerCase();
            return this.lessons.filter(lesson =>
                lesson.title.toLowerCase().includes(searchTerm) || lesson.location.toLowerCase().includes(searchTerm)
            );
        },
        sortLessons() {
            return this.searchLessons.slice().sort((a, b) => {
                const valueA = a[this.sortAttribute];
                const valueB = b[this.sortAttribute];
                const comparison = typeof valueA === 'string' ?
                    valueA.localeCompare(valueB) :
                    valueA - valueB;
                return this.sortOrder === 'asc' ? comparison : -comparison;
            });
        },
        
        cartSize: function () {
            return this.cart.reduce((sum, lesson) => sum + lesson.amount, 0);
        },
        canAddToCart(lessons) {
            return this.lessons.spaces > this.checkItemCount(lessons.id);
        },
        validateUserInfo() {
            return /^[a-zA-Z]+$/.test(this.username) && /^\d+$/.test(this.phone);
        }
    },
  });