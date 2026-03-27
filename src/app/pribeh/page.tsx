import { loadData } from '@/lib/data'
import type { SupplyChainStage, GapDataPoint, ChinaBalance, CostPassthrough } from '@/lib/types'
import PribehClient from './PribehClient'

export default async function PribehPage() {
  const [supplyChain, gapData, chinaBalance, costPass] = await Promise.all([
    loadData<SupplyChainStage[]>('supply_chain.json'),
    loadData<GapDataPoint[]>('gap_analysis.json'),
    loadData<ChinaBalance[]>('china_balance.json'),
    loadData<CostPassthrough[]>('cost_passthrough.json'),
  ])

  return (
    <PribehClient
      supplyChain={supplyChain}
      gapData={gapData}
      chinaBalance={chinaBalance}
      costPass={costPass}
    />
  )
}
