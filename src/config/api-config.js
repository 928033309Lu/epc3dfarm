/**
 * 后端服务配置信息
 */
export const apisConfig = {
  section: {
    url: '/section/section?prj_code=tianyuan_sujialiang&crossline={0}',
    method: 'get'
  },
  getElevation: {
    url: '/elevation?x={0}&y={1}',
    method: 'get'
  }
}
