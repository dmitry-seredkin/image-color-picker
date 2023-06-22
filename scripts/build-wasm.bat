@echo off

setx GOOS js 
setx GOARCH wasm 

go build -o build/main.wasm wasm/main.go
