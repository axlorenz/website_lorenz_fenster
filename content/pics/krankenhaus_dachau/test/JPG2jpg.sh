#!/bin/bash
for x in *.JPG; do mv "$x" "${x%.JPG}.jpg"; done