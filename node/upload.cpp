#include <iostream>
#include <string>
#include "upload.h"

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"

using namespace std;
using namespace rapidjson;

const char* Upload::splitFile(std::string user_id, std::string fileName, std::string groupAccountsJSON) {
    string tmp_filePath = "/tmp/crumbs/" + user_id;

    // cout << groupAccountsJSON << endl;

    // string cmd = "split -n 5 " + tmp_filePath + "/" + fileName + " " + tmp_filePath + "/" + fileName;
    // int ret = system(cmd.c_str());
    // if (ret == -1)
    //     return "Error";

    // cmd = "rm -rf " + fileName;
    // ret = system(cmd.c_str());
    // if (ret == -1)
    //     return "Error";

    Document d;
    d.Parse(groupAccountsJSON.c_str());

    const Value& accounts = d["accounts"];
    // assert(accounts.IsArray());
    // cout << accounts.Size() << endl;
    for(unsigned int i=0; i < accounts.Size(); ++i) {
        cout << accounts[i].GetString() << endl;
    }

    // cout << s.GetString() << endl;

    return "successfully split";
}
