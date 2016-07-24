(function ( $ ) {
    "use strict";
    $.fn.filePanel = function(opt){
        var defaultOption = {
            files:[],
            setFilePanel: setFilePanel,
            updateFiles:updateFiles
        };
        var option = $.extend(defaultOption,opt);
        var panel = this.selector;
        function updateFiles(files){
            option.files = files;
        }
        function initImgPreviewer() {
            var imgDiv = $('#imgPathArea');
            var target = null;
            var setting = {
                previewer: null,
                deleteBtnVisibily:true,
                fileSize: '4MB',
                notifyBlockVisibily:true,
                imgSize:{
                    width: storeSetting.productImageWidth.value,
                    height:storeSetting.productImageHeight.value,
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
                file.myPayImageuploadPreviewer(itemSetting);
                file.removeClass('new');
            });
        };
        initImgPreviewer();
        $('body').delegate(panel+' .path_type','click', function(){
            $('.uploadUrl').hide();
            if ($(this).val() == PATH_TYPE_IMG) {
                $('#imgPathArea').show();
            } else if ($(this).val() == PATH_TYPE_MOVIE || $(this).val() == PATH_TYPE_IMAGE_LINK) {
                $("#moviePath").rules("add", {required: true});
                $('#moviePathArea').show();
            } else {
                $("input[name=imgPathArea]").hide();
                $("input[name=moviePathArea]").hide();
            }
        });
        function setFilePanel(data)
        {
            $(panel+' .path_type[value='+data['path_type']+']').prop('checked', true);
            if (data['path_type'] == PATH_TYPE_IMG) {
                $('#imgPath .imgPath').remove();
                $('#pathImg').attr('src',data['path']);
                
                $('#imgPathArea').show();
            } else if (data['path_type'] == PATH_TYPE_MOVIE || $('#path_type:checked').val() == PATH_TYPE_IMAGE_LINK ) {
                $('#moviePath').attr('value', data['path']);
                $('#moviePathArea').show();
            }
        }
        return option;
    }
    return ;
}(jQuery));