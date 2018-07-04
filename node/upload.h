#ifndef UPLOAD_H
#define UPLOAD_H

class Upload {
public:
    const char* splitFile(std::string user_id, std::string fileName, std::string groupAccountsJSON);
};

#endif /* UPLOAD_H */
