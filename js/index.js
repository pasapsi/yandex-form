$(function() {
    
    $.fn.FadeSlideToggle = function(speed, fn) {
        return $(this)
                    .stop(0,0)
                    .animate({
                        'height': 'toggle',
                        'opacity': 'toggle'
                    },speed || 400, function() {
                       $.isFunction(fn) && fn.call(this); 
                    });
    }
    
    $.ajaxSetup({
        url: '',    
        type: 'post',
        dataType: 'json'
    });
    
    //Event 
    $('.more-info').on('click', showInfo);
    $('.form-head').on('click', slideBox);
    $('#submit').on('click', collectionInformation);
    $('#reset').on('click', reset);
    $('#fio').on('keyup', function() {
        var $this =$(this),
            val = $this.val();
       $('#fio-p').text(val != '' ? ',' + val + ',': ''); 
    });
    $('#select-info').on('click', function() {
       var $this = $(this),
           num = $this.val();
       
       $('#select-info-6')[num == 6 ? 'removeClass' : 'addClass']('display_n') 
         
    });
    
    //Function
    function showInfo() {
        
        $(this).closest('.form-anketa-row-body-descripotion')
               .find('.short')
               .addClass('display_n')
               .end()
                 .find('.full')
                 .removeClass('display_n');   
    }
    
    function slideBox() {
        $(this).next().FadeSlideToggle(700);
    }
    
    function collectionInformation() {
        var setData = {}; 
        $('#form').find('.wrapper-form input, .wrapper-form textarea').each(function() {
            var $this = $(this);
            setData[$this.attr('id')] = $this.val();
        });
        
        setData['select-info'] = $('#select-info').val();
        setData['select-info-6'] = $('#select-info-6').val();
        setData['agreement'] = $('#agreement').val();
        
        $.ajax({
            url: 'save/save',
            data: {'set_data': setData},
            success: function(data) {
                if(data['statu'] == 'accept') {
                    alert('Данные успешно отправлены')
                }
            }
        });  
    }
    
    function reset() {
        $('#form').find('.wrapper-form input, .wrapper-form textarea').each(function() {
           $(this).val(''); 
        });
    }
});