module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'semi': [
			'warn',
			'always'
		],
		'quotes': [
			'warn',
			'single'
		],
		'indent': [
			'warn',
			'tab'
		],
		'no-unused-vars': [
			'warn'
		],
		'react/no-unknown-property': [ // Pour threejs, ignore les propriétés inconnues
			'warn',
			{
				'ignore': ['position', 'rotation', 'scale', 'geometry', 'material', 'castShadow', 'receiveShadow', 'visible', 'lookAt', 'add', 'remove', 'children', 'parent' ]
			}			
		],
	}
};
