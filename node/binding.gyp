# Define the targets to be created
{
	"targets": [
	{
		'target_name': 'download',
		'sources': [ 'mainDownload.cpp', 'download.cpp' ],
	},
	{
			'target_name': 'upload',
			'sources': [ 'mainUpload.cpp', 'upload.cpp' ],
	},
	{
			'target_name': 'split',
			'sources': [ 'mainSplit.cpp', 'split.cpp' ],
	},
	{
			'target_name': 'join',
			'sources': [ 'mainJoin.cpp', 'join.cpp' ],
	}
	]
}
