#ifndef DOWNLOAD_H
#define DOWNLOAD_H

#include "fileHandling.h"

class Download: public FileHandling {
public:
    const char* joinFile(std::string user_id, std::string fileName);
    const char* getFileInfo(std::string user_id, std::string fileName);
};

#endif /* DOWNLOAD_H */
