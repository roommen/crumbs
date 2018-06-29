#include <iostream>
#include <string>
#include "upload.h"

using namespace std;

const char* Upload::splitFile(std::string fileName) {
    string cmd = "split -n 5 " + fileName + " " + fileName;
    int ret = system(cmd.c_str());
    if (ret == -1)
        return "Error";

    cmd = "rm -rf " + fileName;
    ret = system(cmd.c_str());
    if (ret == -1)
        return "Error";

    return "successfully split";
}
