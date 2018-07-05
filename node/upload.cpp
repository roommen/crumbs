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
    string cmd = "mkdir -p " + TEMP_CRUMBS + user_id;
    int ret = system(cmd.c_str());

    StringBuffer strBuf;
    Writer<StringBuffer> writer(strBuf);
    writer.StartObject();
    string strMessage("message");
    writer.String(strMessage.c_str(), static_cast<SizeType>(strMessage.length()));

    if(ret == -1)
    {
        string strError("error - temp user directory creation");
        writer.String(strError.c_str(), static_cast<SizeType>(strError.length()));
    }
    string strSuccess("success - temp user directory creation");
    writer.String(strSuccess.c_str(), static_cast<SizeType>(strSuccess.length()));

    writer.EndObject();
    string retJSON = strBuf.GetString();
    return retJSON.c_str();
}

const char* Upload::splitFile(string user_id, string fileName, string groupAccountsJSON) {
    Document d;
    d.Parse(groupAccountsJSON.c_str());

    const Value& accounts = d["accounts"];
    unsigned int no_accounts = accounts.Size();

    if(no_accounts > MAX_ACCOUNTS)
        return "{\"message\": \"error - max accounts exceeded limit\"}";

    string tmp_filePath = TEMP_CRUMBS + user_id;

    string cmd = "split -n " + to_string(no_accounts) + " " + tmp_filePath + "/" + fileName + " " + tmp_filePath + "/" + fileName;
    int ret = system(cmd.c_str());
    if (ret == -1)
        return "{\"message\": \"error - splitting file\"}";

    return "{\"message\": \"success - splitting file\"}";
}

const char* Upload::cleanupOriginalFile(string user_id, string fileName) {
    string tmp_filePath = TEMP_CRUMBS + user_id;

    string cmd = "rm -rf " + tmp_filePath + "/" + fileName;
    int ret = system(cmd.c_str());
    if (ret == -1)
        return "{\"message\": \"error - cleaning up original file\"}";;

    return "{\"message\": \"success - cleaning up original file\"}";
}

const char* Upload::getSplitFileInfo(string user_id) {
    string tmp_filePath = TEMP_CRUMBS + user_id;
    cout << tmp_filePath << endl;

    DIR* dirp = opendir(tmp_filePath.c_str());
    struct dirent* dp;
    unsigned int ctr;
    string retJSON = "{\"message\": \"testing\",\"splits\": [";
    while ((dp = readdir(dirp)) != NULL) {
        ++ctr;
        // retJSON += "\"" + dp->d_name + "\"";
        // cout << dp->d_name;
    }
    closedir(dirp);
    return "{\"message\": \"success - test\"}";
}
