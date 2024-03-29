<template>
  <div
    ref="chartRef"
    id="echarts"
    :class="className"
    :style="{height: height, width: width}"
  />
</template>

<script lang="ts">
import { defineComponent, onActivated, PropType, onMounted, onBeforeMount, unref, ref, watch, nextTick } from 'vue'
import { debounce } from 'lodash-es'
import echarts from 'echarts'
import type { EChartOption, ECharts } from 'echarts'

// const tdTheme = require('./theme.json') // 引入默认主题
import * as tdTheme from './theme.json'
echarts.registerTheme('tdTheme', tdTheme) // 覆盖默认主题
export default defineComponent({
  name: 'Echarts',
  props: {
    className: {
      type: String as PropType<string>,
      default: 'chart'
    },
    width: {
      type: String as PropType<string>,
      default: ''
    },
    height: {
      type: String as PropType<string>,
      default: '200px'
    },
    options: {
      type: Object as PropType<EChartOption | undefined>,
      default: undefined
    }
  },
  setup(props) {
    const chartRef = ref<HTMLCanvasElement | null>(null)
    const chartDom = ref<HTMLDivElement | null>(null)
    let chart: ECharts | null = null
    let sidebarElm: HTMLElement | any = null
    let __resizeHandler: Function | null = null

    watch(
      () => props.options,
      (options: EChartOption) => {
        nextTick(() => {
          if (chart) {
            chart.setOption(options, true)
          }
        })
      },
      {
        deep: true
      }
    )

    onMounted(() => {
      // 设置异步，不然图例一开始的宽度不正确。
      initChart()
      __resizeHandler = debounce(() => {
        if (chart) {
          chart.resize()
        }
      }, 100);
      (window as any).addEventListener('resize', __resizeHandler)
      sidebarElm = document.getElementsByClassName('sidebar__wrap')[0]
      sidebarElm && sidebarElm.addEventListener('transitionend', sidebarResizeHandler)
    })

    onActivated(() => {
      // 防止keep-alive之后图表变形
      if (chart) {
        chart.resize()
      }
    })

    onBeforeMount(() => {
      (window as any).removeEventListener('resize', __resizeHandler)

      sidebarElm && sidebarElm.removeEventListener('transitionend', sidebarResizeHandler)
    })

    function initChart(): void {
      // 初始化echart
      const chartRefWrap = unref(chartRef)
      chartDom.value = document.getElementById('echarts') as HTMLDivElement
      if (chartRefWrap) {
        // chart = echarts.init(chartRefWrap, 'tdTheme')
        chart = echarts.init(chartDom.value, 'tdTheme')
        console.log(echarts)
        chart.setOption(props.options as EChartOption, true)
      }
    }

    function sidebarResizeHandler(e: any): void {
      if (e.propertyName === 'width') {
        if (__resizeHandler) {
          __resizeHandler()
        }
      }
    }

    return {
      chartRef
    }
  }
})
</script>

<style>
</style>
