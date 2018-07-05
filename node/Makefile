UPLOAD_NODENAME = upload.node
DOWNLOAD_NODENAME = download.node

all: binding

binding:
	node-gyp configure build
	mkdir -p node_modules
	cp build/Release/$(UPLOAD_NODENAME) node_modules/.
	cp build/Release/$(DOWNLOAD_NODENAME) node_modules/.

clean:
	node-gyp configure clean
	rm -rf node_modules
