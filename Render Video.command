#!/bin/bash
cd "$(dirname "$0")"
echo "Rendering LuxuryDemo to out/luxury-demo.mp4..."
npm run render:luxury
echo ""
echo "Done! Video saved to out/luxury-demo.mp4"
echo "Press any key to close."
read -n 1
