export default {
  data () {
    return {}
  },
  watch: {

  },
  methods: {

    updateRouterQuerySetting (queryValue) {
      this.updateRouterQuery('setting', queryValue)
    },
    updateRouterQueryGrid (queryValue) {
      this.updateRouterQuery('grid', queryValue)
    },
    removeRouterQuerySetting (queryValue) {
      this.updateRouterQuery('setting')
    },
    removeRouterQueryGrid (queryValue) {
      this.updateRouterQuery('grid')
    },
    updateRouterQuery (queryKey, queryValue) {
      const query = {}
      for (const key in this.$route.query) {
        query[key] = this.$route.query[key]
      }
      if (queryValue && query[queryKey] !== queryValue) {
        query[queryKey] = queryValue
      } else {
        // 为空时 删除该路由参数
        delete query[queryKey]
      }
      switch (queryKey) {
        case 'setting':
          this.$store.commit('app/currentSetting', query[queryKey])
          break
        case 'grid':
          this.$store.commit('app/currentGrid', query[queryKey])
          break
      }
      this.$router.push({
        path: 'index',
        query
      })
    }

  }
}
