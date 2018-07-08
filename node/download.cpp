#include <iostream>
#include <string>
#include "download.h"

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"

using namespace std;
using namespace rapidjson;

const char* Download::joinFile(std::string fileName) {
    StringBuffer strBuf;
    Writer<StringBuffer> writer(strBuf);
    writer.StartObject();
    string strMessage("message");
    writer.String(strMessage.c_str(), static_cast<SizeType>(strMessage.length()));

    string cmd = "cat " + fileName + "a* > " + fileName;
    int ret = system(cmd.c_str());
    if (ret == -1) {
        string strError("error - joining file");
        writer.String(strError.c_str(), static_cast<SizeType>(strError.length()));
        writer.EndObject();
        string retJSON = strBuf.GetString();
        return retJSON.c_str();
    }

    string strSuccess("success - joining file");
    writer.String(strSuccess.c_str(), static_cast<SizeType>(strSuccess.length()));
    writer.EndObject();
    string retJSON = strBuf.GetString();
    return retJSON.c_str();
}

// Write a joinFileInfo function
