// rapidjson/example/simpledom/simpledom.cpp`
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"
#include <iostream>

using namespace rapidjson;

int main() {
    // 1. Parse a JSON string into DOM.
    const char* json = "{\"project\":\"rapidjson\",\"stars\":10}";
    Document d;
    d.Parse(json);

    // 2. Modify it by DOM.
    // Value& s = d["stars"];
    Value& s = d["project"];
    // s.SetInt(s.GetInt() + 1);
    std::cout << s.GetString() << std::endl;

    // 3. Stringify the DOM
    // StringBuffer buffer;
    // Writer<StringBuffer> writer(buffer);
    // d.Accept(writer);

    //2.1 Modify first key
    // s = d["project"];
    // s.SetString("Runcy");

    // d.Accept(writer);

    // Output {"project":"rapidjson","stars":11}
    // std::cout << buffer.GetString() << std::endl;
    return 0;
}
