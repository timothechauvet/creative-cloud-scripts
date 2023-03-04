/*
  SublayersToJPG.jsx for Adobe Photoshop
  Description: Script to export a project with separate sublayers.
  Date: March, 2023
  Author: timothechauvet 123azerty! oups c'est mon mot de passe github comment je fais pour le retirer de mon commit
  Contact :
  - via Mastodon : https://h4.io/@timothechauvet
  - via LinkedIn : https://www.linkedin.com/in/timothechauvet/
  - via Twitter : https://twitter.com/timothechauvet
  - via Mail : timothe@chauvet.dev
  - or via an issue in this repository

  Donate (optional):
  If you find this script helpful, you can give like 2€ to someone in the streets and tell me about it. 
  That would be awesome

  NOTICE:
  Tested with Adobe Photoshop CC 2023 MacOS M1 Apple Silicon (Free Edition).
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale

  Released under the Apache 2.0.

  Check my other works: https://github.com/timothechauvet
*/

//@target photoshop

const LAYER_NAME   = "POSING";
const JPEG_QUALITY = 10; // Max

main();

function main() {
    var folder = Folder.selectDialog("Choose a folder 👺");
    if (!folder) {
        alert("No folder found");
        return;
    }

    var files = folder.getFiles();
    if(files.length < 1) {
        alert("Folder is empty. Press OK to quit.");
        return;
    }
    
    iterateFiles(files);
}

function iterateFiles(files) {
    for (var i = files.length - 1; i >= 0; i--) {
        var file = files[i];
        if (!testFileExtension(file)) continue;

        try {
            var psd = app.open(file);
            magic(psd)
        } catch(e) {
            alert(e);
        }
    }
}

function magic(psd) {
    // Catch all layers
    var layers = psd.layerSets;
    
    // Iterate through layers
    for (var i = layers.length - 1; i >= 0; i--) {
        // If name is correct, catch all sublayers
        if (layers[i].name == LAYER_NAME) {
            var subLayers = layers[i].layerSets

            // Set all to hidden
            for (var j = 0; j < subLayers.length; j++) {
                subLayers[j].visible = false;
            }

            // Iterate through sublayers
            for (var j = 0; j < subLayers.length; j++) {
                // Set to visible
                subLayers[j].visible = true;
                // Export to JPEG
                SaveAsJPEG(psd, subLayers[j].name);
                // Set to hidden
                subLayers[j].visible = false;
            }
        }
    }

}

function testFileExtension(file) {
    var isFile = file instanceof File;
    var isPsd  = (matchExtension(file, "psd") | matchExtension(file, "psb"))
    
    if (!isFile) return false;
    if (!isPsd) return false;
    return true;
}

function matchExtension(file, ext) {
    var displayName = file.displayName.toLowerCase();
    ext             = "." + ext.toLowerCase();
    
    if (displayName.length < ext.length) return false;
    
    return displayName.slice(-ext.length) === ext;
}

function SaveAsJPEG(psd, layerName) {
    try {
        var jpgSaveOptions               = new JPEGSaveOptions();
        jpgSaveOptions.embedColorProfile = true;
        jpgSaveOptions.formatOptions     = FormatOptions.STANDARDBASELINE;
        jpgSaveOptions.matte             = MatteType.NONE;
        jpgSaveOptions.quality           = JPEG_QUALITY;

        var fileSaved = new File(psd.path + "/" + layerName + "_" + psd.name);
        psd.saveAs(fileSaved, jpgSaveOptions, true, Extension.LOWERCASE);
    } catch(e) { alert(e); }
}