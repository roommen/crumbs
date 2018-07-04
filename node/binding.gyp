# Define the targets to be created
{
	"targets": [
	{
		'target_name': 'download',
		'sources': [ 'mainDownload.cpp', 'download.cpp' ],
		'include_dirs': [ '../3rdParty' ],
	},
	{
		'target_name': 'upload',
		'sources': [ 'mainUpload.cpp', 'upload.cpp' ],
		'include_dirs': [ '../3rdParty' ],
	}
	]
}
