#!/bin/bash

pipe=/home/beta/infodisp/tray

if [[ ! -p $pipe ]]; then
    echo "Reader not running"
    exit 1
fi

if [[ "$3" ]]; then
    echo "$1" "$2" "$3" > $pipe
else echo "$1" "$2" > $pipe
fi

