#!/bin/bash
docker exec mysql /usr/bin/mysqldump -u sampleuser --password=samplepassword sampledb > ./db/backup.sql