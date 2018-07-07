#include <iostream>
#include <string>
#include <sys/types.h>
#include <dirent.h>
#include "upload.h"

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"

using namespace std;
using namespace rapidjson;

const char* Upload::createTempUserDir(string user_id) {
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

const char* Upload::splitFile(string user_id, string fileName, string groupAccountsJSON) {
    Document doc;
    doc.Parse(groupAccountsJSON.c_str());
    const Value& accounts = doc["accounts"];
    unsigned int no_accounts = accounts.Size();

    StringBuffer strBuf;
    Writer<StringBuffer> writer(strBuf);
    writer.StartObject();
    string strMessage("message");
    writer.String(strMessage.c_str(), static_cast<SizeType>(strMessage.length()));

    if(no_accounts > MAX_ACCOUNTS){
        string strError("error - max accounts exceeded limit");
        writer.String(strError.c_str(), static_cast<SizeType>(strError.length()));
        writer.EndObject();
        string retJSON = strBuf.GetString();
        return retJSON.c_str();
    }

    string tmp_filePath = TEMP_CRUMBS + user_id;
    string cmd = "split -n " + to_string(no_accounts) + " " + tmp_filePath + "/" + fileName + " " + tmp_filePath + "/" + fileName;
    int ret = system(cmd.c_str());
    if (ret == -1){
        string strError("error - splitting file");
        writer.String(strError.c_str(), static_cast<SizeType>(strError.length()));
        writer.EndObject();
        string retJSON = strBuf.GetString();
        return retJSON.c_str();
    }

    string strSuccess("success - splitting file");
    writer.String(strSuccess.c_str(), static_cast<SizeType>(strSuccess.length()));
    writer.EndObject();
    string retJSON = strBuf.GetString();
    return retJSON.c_str();
}

const char* Upload::cleanupOriginalFile(string user_id, string fileName) {
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

const char* Upload::getSplitFileInfo(string user_id) {
    StringBuffer strBuf;
    Writer<StringBuffer> writer(strBuf);
    writer.StartObject();
    string strMessage("splits");
    writer.String(strMessage.c_str(), static_cast<SizeType>(strMessage.length()));

    string tmp_filePath = TEMP_CRUMBS + user_id;
    DIR* dirp = opendir(tmp_filePath.c_str());
    struct dirent* dp;

    writer.StartArray();
    while ((dp = readdir(dirp)) != NULL) {
        string fileName(dp->d_name);
        if((fileName.compare(".") == 0) || (fileName.compare("..") == 0))
            continue;
        string fileNamePath = tmp_filePath + "/" + fileName;
        writer.String(fileNamePath.c_str(), static_cast<SizeType>(fileNamePath.length()));
    }
    closedir(dirp);
    writer.EndArray();
    writer.EndObject();
    string retJSON = strBuf.GetString();
    return retJSON.c_str();
}

//This also needs clean up of shreds which will be inherited from common file class
