<template>
  <div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button @click="editing=!editing" plain size="mini" type="danger"> {{ editing ? '取消' : '编辑' }}</van-button>
      </van-cell>
     <van-grid>
  <van-grid-item :class="{ current: active === index }" @click="clickChannel(index)" v-for="(item, index) in channels" :key="item.id">
          <span>{{ item.name }}</span>
          <van-icon v-show="editing && index !== 0" name="cross" class="btn"></van-icon>
        </van-grid-item>
</van-grid>
    </div>
     <!-- 当前登陆用户没有订阅的频道 -->
 <div class="channel">
  <van-cell title="可选频道" :border="false"></van-cell>
  <van-grid>
    <van-grid-item v-for="item in optionalChannels" :key="item.id">
      <span>{{ item.name }}</span>
    </van-grid-item>
  </van-grid>
</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ChannelEdit',
  props: ['active'],
  data () {
    return {
      editing: false // 是否处于编辑状态
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    ...mapActions(['getAllChannels']),
    ...mapMutations(['addChannel']),
    clickChannel (index) {
      // 在编辑状态, 直接return
      if (this.editing) return
      // 不在编辑状态, 点击时才跳转
      this.$emit('update-curchannel', index)
    }
  },
  computed: {
    ...mapState(['channels']),
    ...mapGetters(['optionalChannels'])

  }
}
</script>

<style lang="scss" scoped>
.channel{
  padding:15px;
  font-size:14px;
  ::v-deep .van-button--mini {
    height: 22px;
    min-width: 50px;
  }
  .btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 14px;
  }
  .current {
    color: #e5615b;
    font-weight: bold;
  }
}
</style>
