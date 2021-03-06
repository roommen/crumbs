#include <iostream>
#include <node.h>
#include "upload.h"

using namespace v8;

void wrapperUploadFile(const FunctionCallbackInfo<Value>& args) {
	// Isolate *isolate = args.GetIsolate();

	v8::String::Utf8Value user_id(args[0]->ToString());
	std::string str_user_id = std::string(*user_id);

	v8::String::Utf8Value fileName(args[1]->ToString());
	std::string str_fileName = std::string(*fileName);

	v8::String::Utf8Value groupAccountsJSON(args[2]->ToString());
	std::string str_groupAccountsJSON = std::string(*groupAccountsJSON);

	Upload up;
	std::cout << up.createTempUserDir(str_user_id) << std::endl;
	std::cout << up.splitFile(str_user_id, str_fileName, str_groupAccountsJSON) << std::endl;
	std::cout << up.cleanupOriginalFile(str_user_id, str_fileName) << std::endl;
	std::cout << up.getSplitFileInfo(str_user_id) << std::endl;

	// args.GetReturnValue().Set(String::NewFromUtf8(isolate, up.createTempUserDir(str_user_id)));s
	// args.GetReturnValue().Set(String::NewFromUtf8(isolate, up.splitFile(str_user_id, str_fileName, str_groupAccountsJSON)));
	// args.GetReturnValue().Set(String::NewFromUtf8(isolate, up.cleanupOriginalFile(str_user_id, str_fileName)));
}

void init(Local<Object> exports) {
	NODE_SET_METHOD(exports, "uploadFile", wrapperUploadFile);
}

/* The entry point to initialize the upload.node module */
NODE_MODULE(upload, init)
