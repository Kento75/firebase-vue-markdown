<template>
  <div id="show-auth" />
</template>

<script>
export default {
 mounted() {
   // auth0のログインフォームを表示
   this.$auth0.showLock('show-auth')
 }
}
</script>
