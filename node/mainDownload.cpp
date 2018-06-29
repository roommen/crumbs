#include <iostream>
#include <node.h>
#include "download.h"

using namespace v8;

void wrapperDownloadFile(const FunctionCallbackInfo<Value>& args) {
	Isolate *isolate = args.GetIsolate();

	v8::String::Utf8Value fileName(args[0]->ToString());
	std::string str_fileName = std::string(*fileName);
	Download down;

	args.GetReturnValue().Set(String::NewFromUtf8(isolate, down.joinFile(str_fileName)));
}

void init(Local<Object> exports) {
	NODE_SET_METHOD(exports, "downloadFile", wrapperDownloadFile);
}

/* The entry point to initialize the download.node module */
NODE_MODULE(download, init)
