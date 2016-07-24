# fileUploadPreview
upload Image for Preview

# Demo 
  open ./demo/demo.html
# How to use it

## Load library
    <script src="imageuploadPreviewer.js"></script>
##Html
   put an input of type is file  and sibling img tag  below:
  ```
        
            <input type="file" >
            <img src="">
     
  ```
## Customize Setting Script

```
var setting = {
        previewer: null,
        deleteBtnVisibily:true,
        fileSize: '4MB',
        notifyBlockVisibily:false,
        imgSize:{
            width: '>500',
            height:'>500',
        },
        imgType: ['png', 'jpg'],
        validateCallback: function(validObj, that) {
            
            alert(validObj.validMsg.validMsgShortForShow, function(){
                $(that).siblings('.deleteImage').trigger('click');
            });
            //Delete files
            if (option.files.length > 0) {
                $.each(option.files, function(fk, file)
                {
                    $.each(file, function(key, value) {
                        if (key == $(that).attr('data-name')) {
                            option.files.splice(fk,1);
                        }
                    });
                    
                });
            }
        },
        defaultImg: { //Default Img 
            width: '100',
            height: '132.8',
            url: '/images/1px.png'
        }
    };
    setting.previewer = $('input[type="file"]').siblings('img');
    
```
## Assign to selector
```
    setting.previewer = $('input[type="file"]').siblings('img');
    $('input[type="file"]').imageuploadPreviewer(setting);
```

