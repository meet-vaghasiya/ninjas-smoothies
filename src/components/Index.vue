<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="handleDelete(smoothie.id)"
          >delete</i
        >
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingrediants">
          <li v-for="(ing, index) in smoothie.ingrediants" :key="index">
            <span class="chip">
              {{ ing }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      smoothies: [
        {
          title: "Ninjas Brew",
          slug: "ninja-brew",
          ingrediants: ["bananas", "coffee", "milk"],
          id: 1
        },
        {
          title: "Morning mood",
          slug: "morning-mood",
          ingrediants: ["mango", "lime", "juice"],
          id: 2
        },
        {
          title: "Ninjas Brew1",
          slug: "ninja-brew",
          ingrediants: ["bananas", "coffee", "milk"],
          id: 3
        },
        {
          title: "Morning mood2",
          slug: "morning-mood",
          ingrediants: ["mango", "lime", "juice"],
          id: 4
        }
      ]
    };
  },
  methods: {
    handleDelete(id) {
      this.smoothies = this.smoothies.filter(smoothie => smoothie.id !== id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 30px;
}
.index h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
}
.index .ingrediants {
  margin: 30px auto;
}

.index .ingrediants li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
