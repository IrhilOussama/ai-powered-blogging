<?php

namespace App\Http\Services;

class UploadImage {
    static public function upload($req, &$formFields, $setDefaultImage){
        if($req->hasFile("image")){
            $formFields['image'] = $req->file('image')->store("blogs", 'public');
        }
        elseif($setDefaultImage){
            $formFields['image'] = 'blogs/default.jpg';
        }
    }
}


?>