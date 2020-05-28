<template>
  <div class="container">

    <header>
      <div>
        <h1>Min önskelista</h1>
        <h3>"Skapa din önskelista här så kan du få det du FAKTISKT vill ha"</h3>
      </div>
      <img id="headimage" alt="katt ger en blomma" src="../assets/gift1.png" />
    </header>

    <div class="content"> 

      <!-- Show posts-->
      <p class="error" v-if="error">{{ error }}</p>
      <div class="posts-container">
        <div
          class="post"
          v-for="(post, index) in posts"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
        >

          <!-- Edit and show name-->
          <p
            class="name"
            v-if="!post.editmode"
            v-on:dblclick="enterEditmode(post)"
            v-bind:class="{finishedTask: post.isFinished}"
          >{{post.wishname}}</p>
          <input class="inputedit" v-else v-model="post.wishname" />

          <!-- Edit and show description-->
          <p
            class="desc"
            v-if="!post.editmode"
            v-on:dblclick="enterEditmode(post)"
            v-bind:class="{finishedTask: post.isFinished}"
          >{{post.wishdesc}}</p>
          <input class="inputedit" v-else v-model="post.wishdesc" />

          <!-- Edit and show link -->
          <p
            class="link"
            v-if="!post.editmode"
            v-on:dblclick="enterEditmode(post)"
            v-bind:class="{finishedTask: post.isFinished}"
          ><a v-bind:href="post.wishlink" target="_blank">{{ post.wishlink }}</a></p>
          <input class="inputedit" v-else v-model="post.wishlink" />

          <!-- Show date -->
          <span class="created">Önskan skapad: 
          {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()+1}/${post.createdAt.getFullYear()}`}}
          </span>

          <div id="buttons">
            <!-- Update-button -->
            <p class="update">
            Dubbelklicka på texten för att ändra den. Klicka sedan
            <button
              class="upbtn"
              v-on:click="updatePost(post._id, post.wishname, post.wishdesc, post.wishlink)">
              HÄR 
            </button> när du är klar. </p>

            <!-- Delete button -->
            <button class="del" v-on:click="deletePost(post._id)">
              Radera önskan
            </button>
          </div> <!-- End div buttons -->

        </div> <!-- End div post -->
      </div> <!-- End div post-container -->

      <div class="addwish">
        <h2>Lägg till på önskelistan</h2>
        <!-- Create Post -->
        <form class="create-post" autocomplete="off">
          <p>
            <label>
              Namn på önskan:
              <br />
              <input type="text" id="create-post" v-model="wishname" placeholder="Rubrik önskan" />
            </label>
          </p>
          <p>
            <label>
              Beskrivning:
              <br />
              <textarea rows="4" name="create-post" id="create-post" v-model="wishdesc" form="create-post" placeholder="Beskrivning av önskan">
              </textarea>
            </label>
          </p>
          <p>
            <label>
              Länk:
              <br />
              <input type="text" id="create-post" v-model="wishlink" placeholder="Länk till önskan" />
            </label>
          </p>
          <button class="btnpost" v-on:click="createPost">Posta din önskan!</button>
        </form>
      </div> <!-- End div addwish-->

    </div> <!-- End div content -->
  </div> <!-- End div container-->
</template>

<script>
import PostService from "../PostService";
export default {
  name: "WishComponent",
  data() {
    return {
      posts: [],
      error: "",
      wishname: "",
      wishdesc: "",
      wishlink: "",
      isFinished: true
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.wishname, this.wishdesc, this.wishlink);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async updatePost(id, wishname, wishdesc, wishlink) {
      await PostService.updatePost(id, wishname, wishdesc, wishlink);
      this.posts = await PostService.getPosts();
    },
    enterEditmode(post) {
      post.editmode = true;
      this.posts = [...this.posts];
    }
  }
};
</script>

<style scoped>
div.container {
  background-color:rgb(227, 231, 233); 
}
/* Header */
header {
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
  display: grid;
  background-color: #2f464b;
  border-radius: 50% 50% 0 0;
}
header div {
  grid-area: headh; 
  justify-self: center;
  align-self: center; 
}
h1 {
  font-family: Helvetica, Arial, sans-serif; 
  color: #fff;
  text-align: center;
  font-size: 50px;
  padding-bottom: 0; 
  margin-bottom: 0; 
}
#headimage {
  width: 100%;
  max-width: 200px;
  grid-area: headi;
  justify-self: center;
  align-self: center; 
}
h3 {
  color: #e5e6e7; 
  font-weight: normal;
  font-style: italic;
  text-align: center;
  padding-top: 10px;  
  margin-top: 0; 
}
header {
  grid-template-columns: 20% auto 20%;
  grid-template-areas: 
  ". headh headi" 
}
/* Content */
.content {
  max-width: 1000px;
  margin: 0 auto;
  background-color: #2f464b;
  padding: 10px;
}
/* Show posts */
p.error {
  border: 1px solid red;
  background-color: pink;
  padding: 10px;
  margin-bottom: 15px;
}
div.post {
  background-color: #fff;
  margin: 10px;
  padding-top: 10px; 
  text-align: center;
}
p.name {
  font-size: 28px;
  padding-left: 10px; 
  padding-right: 10px; 
  margin-bottom: 15px;
  font-family: Helvetica, Arial, sans-serif; 
}
p.desc {
  font-size: 18px;
  padding-left: 10px; 
  padding-right: 10px;
  margin-bottom: 10px; 
}
p.link {
  font-size: 14px;
  padding-left: 10px; 
  padding-right: 10px;
  margin-bottom: 40px;
}
p.link a {
  color: #223547;
}

#buttons { 
  background-color: rgb(227, 231, 233);
  margin-top: 10px; 
  padding: 10px; 
  text-align: right; 
}
.del {
  border: 1px solid rgb(53, 3, 3);
  background-color: rgb(156, 30, 30);
  color: #fff;
  cursor: pointer;
  padding: 5px 10px;
  justify-self: end; 
  align-self: end; 
  text-align: right;
  margin: 0;
}
.del:hover {
  background-color: red;
}
.update {
  text-align: center; 
  margin: 0;
  padding: 0; 
  color: #2f464b;
  font-size: 16px; 
}
button.upbtn {
  border: none; 
  cursor: pointer;
  background-color: rgb(227, 231, 233);
  font-size: 16px; 
  padding: 4px; 
}
button.upbtn:hover {
  background-color: #11272c; 
  color: #fff; 
}

.inputedit {
  box-sizing: border-box;
  margin-top: 10px; 
  margin-bottom: 10px; 
  padding: 5px; 
  width: 100%; 
}
/* Create posts*/
.create-post {
  margin: 10px;
}
.create-post input, .create-post textarea {
  width: 100%; 
  padding: 5px; 
}
.create-post input:focus, .create-post textarea:focus {
  background-color: rgb(227, 231, 233);
}
.addwish {
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  margin-top: 30px;
}
.addwish h2 {
  margin: 10px;
  font-size: 28px;
  font-weight: normal;
}
.created {
  color: #2f464b;
}
.btnpost {
  background-color: #2f464b;
  color: #fff;
  padding: 4px 8px;
  border: 1px solid #11272c;
  margin: 0;
  cursor: pointer;
}
.btnpost:hover {
  background-color: #11272c;
}
</style>