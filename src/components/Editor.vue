<template>
  <div class="editor">
    <h1>エディター画面</h1>
    <span>{{ user.displayName }}</span>
    <button @click="logout">ログアウト</button>
    <div class="editorWrapper">
      <textarea class="markdown" v-model="markdown"></textarea>
      <div class="preview" v-html="preview()"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  name: 'editor',
  props: ['user'],
  data() {
    return {
      markdown: ''
    };
  },
  methods: {
    // ログアウト
    logout: function() {
      firebase.auth().signOut();
    },
    // マークダウンプレビュー
    preview: function() {
      return marked(this.markdown);
    }
  }
};
</script>

<style lang="scss" scoped>
.editorWrapper {
  display: flex;
}

// マークダウンエディタ画面
.markdown {
  width: 50%;
  height: 500px;
}

// マークダウンプレビュー画面
.preview {
  width: 50%;
  text-align: left;
}
</style>