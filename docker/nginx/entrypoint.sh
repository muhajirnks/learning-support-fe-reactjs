#!/bin/sh
set -e

# Replace env variable placeholders with real values
printenv | grep VITE_ | while read -r line ; do
    key="${line%%=*}"
    value="${line#*=}"
    
    find /var/www/html/ -type f -exec sed -i "s|$key|$value|g" {} \;
done

# Run nginx in foreground
exec nginx -g "daemon off;"