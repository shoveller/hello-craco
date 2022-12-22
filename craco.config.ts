import { CracoConfig, CracoDevServerConfig } from '@craco/types'
import { whenDev } from '@craco/craco'
import path from 'path'

const config: CracoConfig = {
	webpack: {
		alias: {
			src: path.resolve(__dirname, 'src'),
			public: path.resolve(__dirname, 'public'),
		},
	},
	jest: {
		configure: {
			moduleNameMapper: {
				'^src(.*)$': '<rootDir>/src$1',
				'^public(.*)$': '<rootDir>/public$1',
			},
		},
	},
	devServer: whenDev<CracoDevServerConfig>(() => {
		return {
			host: 'local.naver.com',
			port: 4000,
			open: true,
			historyApiFallback: false,
			proxy: {
				'/api': {
					target: 'http://dev.finsupport.naver.com/',
				},
			},
		}
	}),
}

export default config
