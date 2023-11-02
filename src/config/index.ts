/**
 * 도미넌스, 블록 상태, 공포 탐욕 지수 등 반복적으로 업데이트 해야하는 함수들 IntervalTime
 * 과 반복 제한 시간인 limitTime을 하나의 변수애서 관리할 수 있도록 리팩토링 필요
 *
 * 📌 - 블록 상태: 스토어에 조회 시간을 타임스탬프로 저장하고 시간 계산도 타임스탬프로 함 (✅ 완료)
 * 📌 - 도미넌스: 조회 시간을 스토어에 getNowDate() 문자열 날짜로 저장하고 계산도 moment().diff 써서 함.
 * 📌 - 공포탐욕지수: 도미넌스랑 같음
 *
 * ⚠️ 타임스탬프로 통일 해야함.. date는 문자열이고 timeStamp는 숫자형식이라 기존에 사용자들 데이터 오류나지 않게 조심해야함
 */

const calcMS = (min: number) => min * 60000

const intervalTime = {
  blockHeight: calcMS(1),
}

const config = {
  intervalTime,
}

export default config
