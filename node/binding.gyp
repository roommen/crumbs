# Define the targets to be created
{
	"targets": [
	{
		'target_name': 'download',
		'sources': [ 'fileHandling.cpp', 'mainDownload.cpp', 'download.cpp' ],
		'include_dirs': [ '../3rdParty' ],
		'cflags': ['-Wall', '-std=c++11']
	},
	{
		'target_name': 'upload',
		'sources': [ 'fileHandling.cpp', 'mainUpload.cpp', 'upload.cpp' ],
		'include_dirs': [ '../3rdParty' ],
		'cflags': ['-Wall', '-std=c++11']
	}
	]
}
