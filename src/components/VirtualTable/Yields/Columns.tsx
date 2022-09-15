import { ColumnDef } from '@tanstack/react-table'
import IconsRow from '~/components/IconsRow'
import QuestionHelper from '~/components/QuestionHelper'
import { formattedNum, formattedPercent } from '~/utils'
import { HeaderWithHelperText } from '../Header'
import { formatColumnOrder } from '../utils'
import { IYieldTableRow } from './types'

export const columns: ColumnDef<IYieldTableRow>[] = [
	{
		header: 'Pool',
		accessorKey: 'pool',
		enableSorting: false,
		cell: (info) => <>{`${info.row.index + 1} ${info.getValue()}`}</>,
		size: 160
	},
	{
		header: 'Project',
		accessorKey: 'project',
		enableSorting: false,
		size: 140
	},
	{
		header: 'Chain',
		accessorKey: 'chains',
		enableSorting: false,
		cell: (info) => <IconsRow links={info.getValue() as Array<string>} url="/yields?chain" iconType="chain" />,
		size: 60,
		meta: {
			align: 'end'
		}
	},
	{
		header: 'TVL',
		accessorKey: 'tvl',
		enableSorting: true,
		cell: (info) => {
			return (
				<span>
					<span
						style={{
							color: info.row.original.strikeTvl ? 'gray' : 'inherit'
						}}
					>
						{'$' + formattedNum(info.getValue())}
					</span>
				</span>
			)
		},
		size: 100,
		meta: {
			align: 'end'
		}
	},
	{
		header: () => <HeaderWithHelperText value="APY" helperText="Total annualised percentage yield" />,
		accessorKey: 'apy',
		enableSorting: true,
		cell: (info) => {
			return (
				<span style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
					{info.row.original.project === 'Osmosis' ? (
						<QuestionHelper text={`${info.row.original.id?.split('-').slice(-1)} lock`} />
					) : info.row.original.project === 'cBridge' ? (
						<QuestionHelper text={'Your deposit can be moved to another chain with a different APY'} />
					) : null}
					{formattedPercent(info.getValue(), true, 700)}
				</span>
			)
		},
		size: 100,
		meta: {
			align: 'end'
		}
	},
	{
		header: () => (
			<HeaderWithHelperText value="Base APY" helperText="Annualised percentage yield from trading fees/supplying" />
		),
		accessorKey: 'apyBase',
		enableSorting: true,
		cell: (info) => {
			return <>{formattedPercent(info.getValue(), true, 400)}</>
		},
		size: 140,
		meta: {
			align: 'end'
		}
	},
	{
		header: () => <HeaderWithHelperText value="Reward APY" helperText="Annualised percentage yield from incentives" />,
		accessorKey: 'apyReward',
		enableSorting: true,
		cell: (info) => {
			return <>{formattedPercent(info.getValue(), true, 400)}</>
		},
		size: 140,
		meta: {
			align: 'end'
		}
	},
	{
		header: () => <HeaderWithHelperText value="1d Change" helperText="Absolute change in APY" />,
		accessorKey: 'change1d',
		cell: (info) => <>{formattedPercent(info.getValue(), false, 400)}</>,
		size: 140,
		meta: {
			align: 'end'
		}
	},
	{
		header: () => <HeaderWithHelperText value="7d Change" helperText="Absolute change in APY" />,
		accessorKey: 'change7d',
		cell: (info) => <>{formattedPercent(info.getValue(), false, 400)}</>,
		size: 140,
		meta: {
			align: 'end'
		}
	},
	{
		header: () => (
			<HeaderWithHelperText
				value="Outlook"
				helperText="The predicted outlook indicates if the current APY can be maintained (stable or up) or not (down) within the next 4weeks. The algorithm consideres APYs as stable with a fluctuation of up to -20% from the current APY."
			/>
		),
		accessorKey: 'outlook',
		size: 120,
		meta: {
			align: 'end'
		}
	},
	{
		header: () => <HeaderWithHelperText value="Confidence" helperText="Predicted outlook confidence" />,
		accessorKey: 'confidence',
		cell: (info) => (
			<>{info.getValue() === null ? null : info.getValue() === 1 ? 'Low' : info.getValue() === 2 ? 'Medium' : 'High'}</>
		),
		size: 140,
		meta: {
			align: 'end'
		}
	}
]

// key: min width of window/screen
// values: table columns order
const columnOrders = {
	0: [
		'pool',
		'apy',
		'tvl',
		'project',
		'chains',
		'apyBase',
		'apyReward',
		'change1d',
		'change7d',
		'outlook',
		'confidence'
	],
	360: [
		'pool',
		'project',
		'apy',
		'tvl',
		'chains',
		'apyBase',
		'apyReward',
		'change1d',
		'change7d',
		'outlook',
		'confidence'
	],
	640: [
		'pool',
		'project',
		'tvl',
		'apy',
		'chains',
		'apyBase',
		'apyReward',
		'change1d',
		'change7d',
		'outlook',
		'confidence'
	],
	1280: [
		'pool',
		'project',
		'chains',
		'tvl',
		'apy',
		'apyBase',
		'apyReward',
		'change1d',
		'change7d',
		'outlook',
		'confidence'
	]
}

export const yieldsColumnOrders = formatColumnOrder(columnOrders)
