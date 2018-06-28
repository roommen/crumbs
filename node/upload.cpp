#include <iostream>
#include <string>
#include "upload.h"

using namespace std;

const char* Upload::splitFile(std::string fileName) {
    string cmd = "split -n 5 " + fileName + " " + fileName;
    system(cmd.c_str());

    const char* ret = "successfully split";
    return ret;
}
