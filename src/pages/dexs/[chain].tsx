import * as React from 'react'
import Layout from '~/layout'
import DexsContainer, { IDexsContainer } from '~/containers/DexsContainer'
import { revalidate } from '~/api'
import { getChainPageData, getDexs } from '~/api/categories/dexs'

export async function getStaticProps({ params }) {
	const chain = params.chain
	const { props } = await getChainPageData(chain)
	const { props: propsAll } = await getChainPageData()

	return {
		props: {
			...props,
			allChains: propsAll.allChains
		},
		revalidate: revalidate()
	}
}

export async function getStaticPaths() {
	const res = await getDexs()
	const paths = res.allChains.map((chain) => ({
		params: { chain: chain.toLowerCase() }
	}))

	return { paths, fallback: 'blocking' }
}

const Chains: React.FC<IDexsContainer> = (props) => {
	return (
		<Layout title={`${props.chain} volumes - DefiLlama`} defaultSEO>
			<DexsContainer {...props} />
		</Layout>
	)
}

export default Chains
