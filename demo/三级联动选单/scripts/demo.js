var whatsProvince = ['湖北','广东','河南'];
var whatsCity = [['武汉','孝感','鹤壁','宜昌'],['广州','深圳','佛山','东莞'],['郑州','开封','洛阳','许昌']];
var whatsTown = [[[1,2,3],[4,5,6],[7,8,9],[10,11,12]],
                [[13,14,15],[16,17,18],[19,20,21],[22,23,24]],
                [[25,26,27],[28,29,30],[31,32,33],[34,35,36]]];

var num = 0;
var num1 = 0;

for(var i = 0; i < whatsProvince.length; i++) {
    //插入子节点
    $('.province').append('<option>' + whatsProvince[i] + '</option>');     
}
//改变省的选项就触发以下程序
$('.province').change(function () {     

    // 移除城市下的子节点（不包括第０位）
    $('.city').children().not(':eq(0)').remove(); 
     
    // 移除村镇下的子节点（不包括第０位）
    $('.town').children().not(':eq(0)').remove();   

    //获取被选节点的子节点的索引
    num = $(this).children('option:selected').index();      

    for (var j = 0; j < whatsCity.length; j++) {

        //num-1为了匹配数组的索引
        $('.city').append('<option>' + whatsCity[num - 1][j] + '</option>');  
    }
});

$('.city').change(function () {

    // 移除村镇下的子节点（不包括第０位）
    $('.town').children().not(':eq(0)').remove();   

    num1 = $(this).children('option:selected').index();

    for (var k = 0; k < whatsTown.length; k++) {

        //num-1为了匹配数组的索引
        $('.town').append('<option>' + whatsTown[num - 1][num1 - 1][k] + '</option>');  
    }
});
