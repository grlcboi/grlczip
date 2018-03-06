@echo off

color 74

setx GPU_FORCE_64BIT_PTR 0
setx GPU_MAX_HEAP_SIZE 100
setx GPU_MAX_SINGLE_ALLOC_PERCENT 100
setx GPU_MAX_ALLOC_PERCENT 100
setx GPU_USE_SYNC_OBJECTS 1

sgminer --algorithm allium -o stratum+tcp://testnet.garlic-factory.fun:3333 -u mnddiniogsSV2ekbMisEz57hEJRSzfEckT.RX_480 -p x -I 15 --gpu-platform 1
pause