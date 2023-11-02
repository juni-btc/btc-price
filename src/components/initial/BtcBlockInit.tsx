import { memo, useCallback, useLayoutEffect } from 'react'
import { useBearStore, bearStore } from '@/store'
import { getBtcRecentBlockHeight } from '@/api/mempool'
import { isDev, calcProgress } from '@/utils/common'
import { btcHalvingData } from '@/data/btcInfo'
import interval from '@/utils/interval'
import config from '@/config'

// 반복 시간 및 재조회 검증 시간(ms)
const intervalTime = config.intervalTime.blockHeight

const BtcBlockInit = () => {
  const blockData = useBearStore((state) => state.blockData)

  // 다음 반감기 데이터 찾아서 데이터 구하기
  const getNextHalvingData = useCallback(() => {
    const nextHalv = btcHalvingData.find((Halving) => Halving.blockNum > blockData.height)
    return {
      nextHalvingHeight: nextHalv?.blockNum || 0, // 다음 반감기 블록 높이
      nextHalvingPredictedDate: nextHalv?.date || 'Not Found', // 다음 반감기 예상일 (현제는 배열 데이터안에서 뽑아오는데, 남은 블록 * 10분 후 날짜로 계산해서 넣어야 함)
      remainingHeight: Number(nextHalv?.blockNum) - Number(blockData.height), // 다음 반감기까지 남은 블록 수
    }
  }, [])

  // 비트코인 블록 데이터 초기화
  const updateBlockHeight = useCallback(async () => {
    console.log('🏃🏻‍♂️ 블록 상태 조회!')
    const { height, timeStamp } = await getBtcRecentBlockHeight()

    const nextHalving = getNextHalvingData()
    // console.log(nextHalving)

    const halvingPercent = calcProgress(Number(nextHalving.nextHalvingHeight), blockData.height)
    bearStore.updateBlock({ height, timeStamp, updateTimeStamp: Number(new Date()), halvingPercent, nextHalving })
  }, [])
  // 첫 렌더링 시 이전 업데이트 시간 체크해서 초기화
  const updateCheck = useCallback(() => {
    if (!blockData.height || blockData.height === 0) updateBlockHeight()
    else {
      const timeDiff = Date.now() - blockData.updateTimeStamp
      if (timeDiff >= intervalTime) updateBlockHeight()
    }
  }, [])

  useLayoutEffect(() => {
    if (isDev) console.log('✅ BTC 블록 상태 초기화')
    updateCheck()
    const blockInterval = interval(updateBlockHeight, intervalTime)
    blockInterval.start()
  }, [])

  return null
}

export default memo(BtcBlockInit)
