#include <iostream>
#include <string>
#include "download.h"

using namespace std;

const char* Download::joinFile(std::string fileName) {
    string cmd = "cat " + fileName + "a* > " + fileName;
    int ret = system(cmd.c_str());
    if (ret == -1)
        return "Error";

    cmd = "rm -rf " + fileName + "a*";
    ret = system(cmd.c_str());
    if (ret == -1)
        return "Error";

    return "successfully joined";
}
