import { Dispatch, SetStateAction } from 'react'
import { Link, DialogTitle, Dialog, Container, Typography, Stack } from '@mui/material'
import { btcInfo } from '@/data/btcInfo'

type DialogType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CopyDialog = ({ open, setOpen }: DialogType) => {
  const closeDialog = () => {
    setOpen(false)
  }
  return (
    <>
      <Dialog onClose={closeDialog} open={open}>
        <DialogTitle minWidth={420} borderBottom="1px solid #a5a5a5" sx={{ padding: '12px 16px' }}>
          <Typography component="p" fontSize={16} fontWeight="bold">
            리소스 출처
          </Typography>
        </DialogTitle>
        <Container sx={{ padding: '16px' }}>
          <Stack component="h2" justifyContent="center" flexDirection="row" alignItems="center" fontWeight="bold" gap="8px" m="0" p="16px 0 24px">
            {btcInfo.icon(24)}
            <Typography component="p" fontSize={20} fontWeight="bold">
              비트코인 디플로마 [
              <Link href="https://t.co/lS2dUOKcK0" target="_blank" title="비트코인 디플로마 한글 번역본 by ATOMIC BITCOIN">
                💾 다운로드
              </Link>
              ]
            </Typography>
          </Stack>

          <Typography component="p" fontSize={14}>
            시시 정보:{' '}
            <Link href="https://docs.upbit.com/docs/upbit-quotation-websocket" target="_blank" title="Upbit API Docs">
              upbit
            </Link>{' '}
            /{' '}
            <Link href="https://binance-docs.github.io/apidocs/spot/en/#introduction" target="_blank" title="Binance API Docs">
              Binance
            </Link>
          </Typography>
          <Typography component="p" fontSize={14}>
            애니메이션:
            <Link href="https://lottiefiles.com/" target="_blank" title="LottieFiles">
              LottieFiles
            </Link>
          </Typography>
          <Typography component="p" fontSize={14}>
            아이콘:{' '}
            <Link href="https://react-icons.github.io/react-icons/" target="_blank" title="react-icon">
              React-Icon
            </Link>
          </Typography>
          <Typography component="p" fontSize={14}>
            파비콘:{' '}
            <Link href="https://www.flaticon.com/free-icons/bitcoin" target="_blank" title="bitcoin icons">
              Bitcoin icons created by Freepik - Flaticon
            </Link>
          </Typography>
        </Container>
      </Dialog>
    </>
  )
}

export default CopyDialog
