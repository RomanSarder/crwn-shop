# crwn-shop
This is a simple e-commerce website built on React with Firebase Auth + Firestore.

It is built using mobile first design and supports offline mode. I wrote tests for most components in places where I considered them useful.
Unfortunately I didn't manage to get "green" in lighthouse tests mostly because http/1, huge firebase bundle size and external images which are not optimized.
The way app is built doesn't let to get auth or firestore package chunks off from initial load.

It is deployed on https://powerful-island-79972.herokuapp.com/
