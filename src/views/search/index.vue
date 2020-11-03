<template>
 <van-nav-bar fixed>
  <template #left>
    <div class="logo"></div>
  </template>
  <template #right>
    <van-button
      @click="$router.push('/search')"
      class="search-btn"
      round
      type="info"
      size="small"
      icon="search">
      搜索
    </van-button>
  </template>
</van-nav-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>
