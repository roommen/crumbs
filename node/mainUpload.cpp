#include <iostream>
#include <node.h>
#include "upload.h"

using namespace v8;

void wrapperUploadFile(const FunctionCallbackInfo<Value>& args) {
	Isolate *isolate = args.GetIsolate();

	v8::String::Utf8Value fileName(args[0]->ToString());
	std::string str_fileName = std::string(*fileName);
	Upload up;

	args.GetReturnValue().Set(String::NewFromUtf8(isolate, up.splitFile(str_fileName)));
}

void init(Local<Object> exports) {
	NODE_SET_METHOD(exports, "uploadFile", wrapperUploadFile);
}

/* The entry point to initialize the upload.node module */
NODE_MODULE(upload, init)
