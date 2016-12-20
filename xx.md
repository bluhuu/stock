proxy_cache_path  /data/nginx/cache/one  levels=1:2   keys_zone=one:10m max_size=10g;
proxy_cache_key  "$host$request_uri";
server {
    listen 80;
    server_name www.fedora.hk fedora.hk;
    rewrite ^(.*) https://www.fedora.hk$1 permanent;
}

upstream google {
     server 173.194.127.144:80 max_fails=3;
     server 173.194.127.147:80 max_fails=3;
     server 173.194.127.148:80 max_fails=3;
     server 173.194.127.145:80 max_fails=3;
     server 173.194.127.146:80 max_fails=3;
 }

server {
    listen  443;
    server_name www.fedora.hk fedora.hk;
    ssl on;
    ssl_certificate /usr/local/nginx/conf/fedora.crt;
    ssl_certificate_key /usr/local/nginx/conf/fedora.key;
location / {
    proxy_cache one;
    proxy_cache_valid  200 302  1h;
    proxy_cache_valid  404      1m;
    proxy_redirect https://www.google.com/ /;
    proxy_cookie_domain google.com fedora.hk;
    proxy_pass              http://google;
    proxy_set_header Host "www.google.com";
    proxy_set_header Accept-Encoding "";
    proxy_set_header User-Agent $http_user_agent;
    proxy_set_header Accept-Language "zh-CN";
    proxy_set_header Cookie "PREF=ID=047808f19f6de346:U=0f62f33dd8549d11:FF=2:LD=zh-CN:NW=1:TM=1325338577:LM=1332142444:GM=1:SG=2:S=rE0SyJh2w1IQ-Maw";
    sub_filter www.google.com www.fedora.hk;
    sub_filter_once off;
}
}