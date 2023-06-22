@echo off

set file_name=go_root_temp.txt
go env GOROOT>>%file_name%

set /p go_root=<%file_name%
del %file_name%

copy "%go_root%\misc\wasm\wasm_exec.js" build
