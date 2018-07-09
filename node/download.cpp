#include <iostream>
#include <string>
#include <sys/types.h>
#include <dirent.h>
#include "download.h"

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"

using namespace std;
using namespace rapidjson;

const char* Download::joinFile(string user_id, string fileName) {
    StringBuffer strBuf;
    Writer<StringBuffer> writer(strBuf);
    writer.StartObject();
    string strMessage("message");
    writer.String(strMessage.c_str(), static_cast<SizeType>(strMessage.length()));

    string tmp_filePath = TEMP_CRUMBS + user_id;
    string cmd = "cat " + tmp_filePath + "/" + fileName + "a* > " + tmp_filePath + "/" + fileName;
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

const char* Download::getFileInfo(string user_id, string fileName) {
    StringBuffer strBuf;
    Writer<StringBuffer> writer(strBuf);
    writer.StartObject();
    string strMessage("file");
    writer.String(strMessage.c_str(), static_cast<SizeType>(strMessage.length()));

    string tmp_filePath = TEMP_CRUMBS + user_id;
    DIR* dirp = opendir(tmp_filePath.c_str());
    struct dirent* dp;
    while ((dp = readdir(dirp)) != NULL) {
        string fName(dp->d_name);
        if(fName.compare(fileName) == 0) {
            writer.String(fName.c_str(), static_cast<SizeType>(fName.length()));
            break;
        }
    }
    closedir(dirp);
    writer.EndObject();
    string retJSON = strBuf.GetString();
    return retJSON.c_str();
}
