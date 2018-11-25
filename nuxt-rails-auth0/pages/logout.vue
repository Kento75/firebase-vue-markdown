<template>
  <p>Signing out...</p>
</template>

<script>
export default {
  mounted() {
    // 認証情報削除
    this.$auth0.unsetToken()
    this.$router.replace('/')
  }
}
</script>

