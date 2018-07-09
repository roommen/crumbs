#include <iostream>
#include <node.h>
#include "download.h"

using namespace v8;

void wrapperDownloadFile(const FunctionCallbackInfo<Value>& args) {
	// Isolate *isolate = args.GetIsolate();

	v8::String::Utf8Value user_id(args[0]->ToString());
	std::string str_user_id = std::string(*user_id);

	v8::String::Utf8Value fileName(args[1]->ToString());
	std::string str_fileName = std::string(*fileName);

	Download down;
	std::cout << down.createTempUserDir(str_user_id) << std::endl;
	std::cout << down.joinFile(str_user_id, str_fileName) << std::endl;
	std::cout << down.cleanupFileShreds(str_user_id, str_fileName) << std::endl;
	std::cout << down.getFileInfo(str_user_id, str_fileName) << std::endl;

	// args.GetReturnValue().Set(String::NewFromUtf8(isolate, down.createTempUserDir(str_user_id)));
	// args.GetReturnValue().Set(String::NewFromUtf8(isolate, down.joinFile(str_fileName)));
	// args.GetReturnValue().Set(String::NewFromUtf8(isolate, down.cleanupFileShreds(str_fileName)));
	// args.GetReturnValue().Set(String::NewFromUtf8(isolate, down.getFileInfo(str_user_id, str_fileName)));
}

void init(Local<Object> exports) {
	NODE_SET_METHOD(exports, "downloadFile", wrapperDownloadFile);
}

/* The entry point to initialize the download.node module */
NODE_MODULE(download, init)
