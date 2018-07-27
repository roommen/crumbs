1. Create node modules, run the command *make*<br/>
This will create a folder called node_modules and two node module upload.node and download.node will be created<br/>
** upload.node - splits the files into chunks, puts into a temp location and calls the respective REST APIs of the drive for upload<br/>
** download.node - download the file chunks into a temp location and merges the files into a whole
<br/><br/>
2. Cleanup node modules, run the command *make clean*<br/>
This will remove both the node modules created
