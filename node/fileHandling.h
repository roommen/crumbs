#ifndef FILE_HANDLING_H
#define FILE_HANDLING_H

class FileHandling {
public:
    const char* createTempUserDir(std::string user_id);
    const char* cleanupFileShreds(std::string user_id, std::string fileName);
    const char* cleanupOriginalFile(std::string user_id, std::string fileName);
};

const std::string TEMP_CRUMBS = "/tmp/crumbs/";
const int MAX_ACCOUNTS = 5;

#endif /* FILE_HANDLING_H */
