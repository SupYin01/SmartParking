#include <stdio.h>
#include <iostream>
#include <string.h>
#include <curl/curl.h>
#include <json/json.h>
#include <fstream>
#include <memory>


inline size_t onWriteData(void * buffer, size_t size, size_t nmemb, void * userp)
{
    std::string * str = dynamic_cast<std::string *>((std::string *)userp);
    str->append((char *)buffer, size * nmemb);
    return nmemb;
}


int main(int argc, char *argv[])
{
    std::string result;
    CURL *curl;
    CURLcode res;
    curl = curl_easy_init();
    if(curl) {
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_easy_setopt(curl, CURLOPT_URL, "https://qianfan.baidubce.com/v2/chat/completions");
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
        curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "undefined");
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        headers = curl_slist_append(headers, "Authorization: Bearer ");
        headers = curl_slist_append(headers, "appid: ");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        const char *data = "{\"model\":\"ernie-4.0-8k-latest\",\"messages\":[{\"role\":\"user\",\"content\":\"您好\"}],\"disable_search\":false,\"enable_citation\":false}";
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &result);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, onWriteData);
        res = curl_easy_perform(curl);
        std::cout<<result;
    }
    curl_easy_cleanup(curl);
    return (int)res;
}
