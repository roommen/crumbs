#include <iostream>
#include <string>
#include "fileHandling.h"

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"

using namespace std;
using namespace rapidjson;

const char* FileHandling::createTempUserDir(string user_id) {
    StringBuffer strBuf;
    Writer<StringBuffer> writer(strBuf);
    writer.StartObject();
    string strMessage("message");
    writer.String(strMessage.c_str(), static_cast<SizeType>(strMessage.length()));

    string cmd = "mkdir -p " + TEMP_CRUMBS + user_id;
    int ret = system(cmd.c_str());
    if(ret != 0)
    {
        string strError("error - temp user directory creation");
        writer.String(strError.c_str(), static_cast<SizeType>(strError.length()));
        writer.EndObject();
        string retJSON = strBuf.GetString();
        return retJSON.c_str();
    }

    string strSuccess("success - temp user directory creation");
    writer.String(strSuccess.c_str(), static_cast<SizeType>(strSuccess.length()));
    writer.EndObject();
    string retJSON = strBuf.GetString();
    return retJSON.c_str();
}

const char* FileHandling::cleanupFileShreds(string user_id, string fileName) {
    StringBuffer strBuf;
    Writer<StringBuffer> writer(strBuf);
    writer.StartObject();
    string strMessage("message");
    writer.String(strMessage.c_str(), static_cast<SizeType>(strMessage.length()));

    string tmp_filePath = TEMP_CRUMBS + user_id;
    string cmd = "rm -rf " + tmp_filePath + "/" + fileName + "a*";
    int ret = system(cmd.c_str());
    if (ret == -1) {
        string strError("error - cleaning up file shreds");
        writer.String(strError.c_str(), static_cast<SizeType>(strError.length()));
        writer.EndObject();
        string retJSON = strBuf.GetString();
        return retJSON.c_str();
    }

    string strSuccess("success - cleaning up file shreds");
    writer.String(strSuccess.c_str(), static_cast<SizeType>(strSuccess.length()));
    writer.EndObject();
    string retJSON = strBuf.GetString();
    return retJSON.c_str();
}

const char* FileHandling::cleanupOriginalFile(string user_id, string fileName) {
    StringBuffer strBuf;
    Writer<StringBuffer> writer(strBuf);
    writer.StartObject();
    string strMessage("message");
    writer.String(strMessage.c_str(), static_cast<SizeType>(strMessage.length()));

    string tmp_filePath = TEMP_CRUMBS + user_id;
    string cmd = "rm -rf " + tmp_filePath + "/" + fileName;
    int ret = system(cmd.c_str());
    if (ret == -1){
        string strError("error - cleaning up original file");
        writer.String(strError.c_str(), static_cast<SizeType>(strError.length()));
        writer.EndObject();
        string retJSON = strBuf.GetString();
        return retJSON.c_str();
    }

    string strSuccess("success - cleaning up original file");
    writer.String(strSuccess.c_str(), static_cast<SizeType>(strSuccess.length()));
    writer.EndObject();
    string retJSON = strBuf.GetString();
    return retJSON.c_str();
}
