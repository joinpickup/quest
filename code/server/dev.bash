#!/bin/bash
source .env 
air --build.cmd "go build -o bin/api main.go" --build.bin "./bin/api"
