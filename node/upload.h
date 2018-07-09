#ifndef UPLOAD_H
#define UPLOAD_H

#include "fileHandling.h"

class Upload: public FileHandling {
public:
    const char* splitFile(std::string user_id, std::string fileName, std::string groupAccountsJSON);
    const char* getSplitFileInfo(std::string user_id);
};

#endif /* UPLOAD_H */
