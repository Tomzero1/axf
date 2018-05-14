<template>
  <div class="headeryellow">
    <header>
      <div class="header-content">
        <span class="site">人民公园</span>
      </div>
      <div class="right">搜索</div>
    </header>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
  .headeryellow {
    position: fixed;
    width: 100%;
    height: 4.5rem;
    z-index: 3;
  }
  header {
    width: 100%;
    height: 100%;
    background: #ffd600;
    position: relative;
  }
  .headeryellow > header > .header-content {
    width: 20rem;
    height: 100%;
    background: #ffd600;
    text-align: center;
    margin: auto;
  }
  .headeryellow > header > .header-content > .site {
    line-height: 4.5rem;
    font-weight: 700;
    font-size: 1.4rem;
  }
  .headeryellow > header > .header-content > .site::after {
    content: '\25BC';
  }
  .headeryellow > header > .right {
    width: 6rem;
    height: 4.4rem;
    background: url('./images/seach.png') no-repeat right 0.5rem;
    background-size: auto 2.5rem;
    text-align: right;
    line-height: 7rem;
    font-size: 1.2rem;
    position: absolute;
    top: 0;
    right: 1rem;
  }
</style>
