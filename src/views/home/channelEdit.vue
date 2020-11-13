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
          <van-icon v-show="editing && index !== 0" name="cross" class="btn" @click="clickDelChannel(item,index)"></van-icon>
        </van-grid-item>
</van-grid>
    </div>
     <!-- 当前登陆用户没有订阅的频道 -->
 <div class="channel">
  <van-cell title="可选频道" :border="false"></van-cell>
  <van-grid>
    <van-grid-item v-for="item in optionalChannels" :key="item.id" @click="clickAddChannel(item)">
      <span>{{ item.name }}</span>
    </van-grid-item>
  </van-grid>
</div>
  </div>
</template>

<script>
import { reqSetChannels } from '@/api/channels.js'

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
    },
    ...mapMutations(['addChannel', 'delChannel']),
    clickAddChannel (channel) {
      // 将选择 channel 数据往我的频道 channel 中添加 (不要操作vuex中的数据, 要提交mutation)
      this.addChannel(channel)
      this.resetChannel()
    },

    clickDelChannel (channel, index) {
      // 将选择的 channel 从我的频道中删除 (提交mutation)
      this.delChannel(channel)
      this.resetChannel()
      if (index === this.active) {
        this.$emit('update-active', 0)
      }
    },

    async resetChannel () {
      // 组装接口需要的数据
      const channelList = this.channels.map((item, index) => {
        return {
          id: item.id,
          seq: index
        }
      })
      // 去掉推荐频道, 由于推荐频道是在第一个位置，所以这里直接删除第一个
      channelList.shift()
      // 发送重置式请求
      await reqSetChannels(channelList)
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
