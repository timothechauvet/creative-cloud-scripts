# Sublayers to JPG
This script was a request from my dear friend and very talented background artist [Marvin Chen](https://www.instagram.com/marvinchenart/). 

Its purpose is **to take sublayers of a folder separately** and export the entire project in .JPG with each of these sublayers. The script also takes every .PSD files from a folder and does that with each projects.

## Objective
It is mostly made for people from the animation industry, where people work with a lot of .PSD projects with several posing layers. These posing layers represent the different keyframes of the scene. 

The script is helpful for background artists who wish to see if every keyframe works good with their background.

## Usage 
0. Put every .PSD files in the same folder
1. Open Photoshop and run the script
2. Open that folder from step 0
3. The script runs
4. The exported .JPG files are stored in that folder

## Customisation 
In the .jsx file, change the constant `LAYER_NAME` to whatever name is the folder of separate layers you want to export in your project.

## Layers structure example
```yaml
- POSING (folder)
    - SCENE001 (folder)
        - [Elements] (layers)
    - SCENE002 (folder)
        - [Elements] (layers)
    - SCENE003 (folder)
        - [Elements] (layers)
- BACKGROUND (folder)
    - [Elements] (layers)
```

With that structure, the output files will be :
- PROJECT_SCENE001.jpg containing :
    - SCENE001 folder active 😐
    - SCENE002 folder inactive 🫥
    - SCENE003 folder inactive 🫥
    - the rest (BACKGROUND folder with sublayers) active 😐
- PROJECT_SCENE002.jpg containing :
    - SCENE001 folder inactive 🫥
    - SCENE002 folder active 😐
    - SCENE003 folder inactive 🫥
    - the rest (BACKGROUND folder with sublayers) active 😐
- PROJECT_SCENE003.jpg containing :
    - SCENE001 folder inactive 🫥
    - SCENE002 folder inactive 🫥
    - SCENE003 folder active 😐
    - the rest (BACKGROUND folder with sublayers) active 😐