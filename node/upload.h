#ifndef UPLOAD_H
#define UPLOAD_H

class Upload {
public:
    const char* createTempUserDir(std::string user_id);
    const char* splitFile(std::string user_id, std::string fileName, std::string groupAccountsJSON);
    const char* cleanupOriginalFile(std::string user_id, std::string fileName);
    const char* getSplitFileInfo(std::string user_id);
};

const std::string TEMP_CRUMBS = "/tmp/crumbs/";
const int MAX_ACCOUNTS = 5;

#endif /* UPLOAD_H */
