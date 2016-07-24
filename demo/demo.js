function initImgPreviewer() {
    var imgDiv = $('#imgDiv');
    var target = null;
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
            //刪掉files
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
        defaultImg: { // 設定若驗證失敗，要顯示的預設圖，若無設定則顯示上一次成功上傳的預覽圖
            width: '100',
            height: '132.8'
        }
    };

    imgDiv.each(function() {

        var target = $(this);
        var file = target.find('input[type="file"]');
        var previewer = target.find('img');
        var itemSetting = $.extend({}, setting);

        itemSetting.previewer = previewer;
        itemSetting.successCallback = function() {
            if (previewer.hasClass('border-dashed-red')) {
                previewer.removeClass('border-dashed-red');
                previewer.next('.img-error').remove();
            }
        };
        file.imageuploadPreviewer(itemSetting);
        file.removeClass('new');
    });
};
$(document).ready(function(){
    initImgPreviewer();      
    });
