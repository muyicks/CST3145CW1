const lessons = [
  {
      id: 100,
      title: "Choreography and Dancing",
      location: "Al Quasis",
      price: 100,
      spaces: 5,
      icon: "bi bi-dance",
  },
  {
      id: 101,
      title: "Archery and Horse Riding",
      location: "Ajman",
      price: 20,
      spaces: 5,
      icon: "bi bi-target-arrow",
  },
  {
      id: 102,
      title: "Car Drifting and Repair",
      location: "Dubai International City",
      price: 30,
      spaces: 5,
      icon: "bi bi-tools",
  },
  {
      id: 103,
      title: "Furniture Making and Woodworks",
      location: "Deira",
      price: 25,
      spaces: 5,
      icon: "bi bi-hammer",
  },
  {
      id: 104,
      title: "Fabrication and Welding",
      location: "Al Bashar",
      price: 30,
      spaces: 5,
      icon: "bi bi-wrench",
  },
  {
      id: 105,
      title: "Electrical and Repairs",
      location: "Palm Jumeirah",
      price: 20,
      spaces: 5,
      icon: "bi bi-lightning",
  },
  {
      id: 106,
      title: "Football and Tennis",
      location: "Dubai International Academic City",
      price: 25,
      spaces: 5,
      icon: "bi bi-soccer",
  },
  {
      id: 107,
      title: "Painting and Sculpture",
      location: "Dubai Knowledge Park",
      price: 35,
      spaces: 5,
      icon: "bi bi-paint-bucket",
  },
  {
      id: 108,
      title: "Python Programming",
      location: "Sharjah",
      price: 30,
      spaces: 5,
      icon: "bi bi-code",
  },
  {
      id: 109,
      title: "Photography and Editing",
      location: "Silicon Oasis",
      price: 20,
      spaces: 5,
      icon: "bi bi-camera",
  },
  // New lessons
  {
      id: 110,
      title: "Guitar Lessons",
      location: "Dubai Marina",
      price: 50,
      spaces: 10,
      icon: "bi bi-music-note",
  },
  {
      id: 111,
      title: "Yoga and Meditation",
      location: "Jumeirah Beach",
      price: 40,
      spaces: 8,
      icon: "bi bi-sun",
  },
  {
      id: 112,
      title: "Cooking Classes",
      location: "Downtown Dubai",
      price: 45,
      spaces: 12,
      icon: "bi bi-egg",
  },
  {
      id: 113,
      title: "Language Learning",
      location: "Business Bay",
      price: 35,
      spaces: 10,
      icon: "bi bi-chat-dots",
  },
  {
      id: 114,
      title: "Gardening Workshops",
      location: "The Springs",
      price: 30,
      spaces: 15,
      icon: "bi bi-tree",
  },
];

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
          this.showProduct = !this.showProduct;
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
  },
});
