import { ArrowUpRight } from 'react-feather'
import { ButtonYields } from '~/layout/Pool'
import Bookmark from '~/components/Bookmark'
import { CustomLink } from '~/components/Link'
import styled from 'styled-components'
import TokenLogo from '~/components/TokenLogo'
import { tokenIconUrl } from '~/utils'
import Tooltip from '~/components/Tooltip'
import FormattedName from '~/components/FormattedName'

interface INameYieldPoolProps {
	value: string
	configID: string
	url: string
	index: number
}

interface INameYield {
	project: string
	projectslug: string
	airdrop?: boolean
}

export function NameYieldPool({ value, configID, url, index }: INameYieldPoolProps) {
	const tokenUrl = `/yields/pool/${configID}`

	return (
		<Wrapper>
			<Bookmark readableProtocolName={configID} data-lgonly />

			<span>{index}</span>

			{url ? (
				<ButtonYields as="a" href={url} target="_blank" rel="noopener noreferrer" data-lgonly useTextColor={true}>
					<ArrowUpRight size={14} />
				</ButtonYields>
			) : (
				''
			)}

			<CustomLink href={tokenUrl} target="_blank">
				<FormattedName text={value} maxCharacters={10} link fontWeight={500} />
			</CustomLink>
		</Wrapper>
	)
}

export function NameYield({ project, projectslug, airdrop, ...props }: INameYield) {
	const iconUrl = tokenIconUrl(project)
	const tokenUrl = `/yields?project=${projectslug}`

	return (
		<AirdropWrapper {...props}>
			{airdrop && (
				<Tooltip content="This project has no token and might airdrop one to depositors in the future">
					<Airdrop>🪂</Airdrop>
				</Tooltip>
			)}
			<TokenLogo logo={iconUrl} />
			<CustomLink href={tokenUrl}>{project}</CustomLink>
		</AirdropWrapper>
	)
}

const Wrapper = styled.span`
	display: flex;
	align-items: center;
	gap: 8px;

	& > *[data-lgonly] {
		display: none;
	}

	& > * {
		flex-shrink: 0;
	}

	a:last-of-type {
		flex-shrink: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media screen and (min-width: ${({ theme }) => theme.bpMed}) {
		& > *[data-lgonly] {
			display: flex;
		}
	}
`

const AirdropWrapper = styled(Wrapper)`
	gap: 0px;
	position: relative;
	padding-left: 32px;

	a:last-of-type {
		margin-left: 8px;
	}
`

const Airdrop = styled.span`
	width: 24px;
	margin-left: -32px;
`
