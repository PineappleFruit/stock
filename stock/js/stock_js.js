/**
 * Created by Administrator on 2017/3/7.
 */
var  saveID=new Array;
var i=0;
var stockData;
var stockIDnew;

function stock(stockID) {
    var tableStock = document.getElementById('tableStock');
    var sortStock=document.getElementById("sortStock");
    var deleteButton=document.getElementById("Delete");
    //判断输入的正确性
    if(stockID.length === 6){
        stockIDnew="0"+stockID;
    }else {
        stockIDnew=stockID;
    }
    if (stockIDnew.length != 7){
        alert("输入的股票长度有误");
         return 0;
    }
    if(saveID.length === 0) {
        saveID.unshift(stockIDnew);
        $("<tr><td><input type='checkbox' name='checked'></td><td></td><td></td><td></td><td></td>" +
            "<td><button class='btn btn-warning aloneDelte' >删除</button></td></tr>").appendTo("#tableStock");

    }

    for(var j in saveID){
        if (stockIDnew === saveID[j]){
            break;
        }
        if(stockIDnew != saveID[j] && j == saveID.length-1){
            saveID.push(stockIDnew);
            $("<tr><td><input type='checkbox' name='checked'></td><td></td><td></td><td></td><td></td>" +
                "<td><button class='btn btn-warning aloneDelte'>删除</button></td></tr>").appendTo("#tableStock");
        }
    }

    //单独删除一行
    $(".aloneDelte").unbind();
    $(".aloneDelte").click(function(){
        //console.log($(this).parents("tr").index());
        var x=$(this).parents("tr").index();
        $(this).parents("tr").remove();
        //console.log()$(this).parents("tr")
        saveID.splice(x-1,1);
        console.log($(this).parents("tr"));
        console.log("xxxx:"+x);
        console.log(saveID)
    });
    var intel='http://api.money.126.net/data/feed/'+saveID+'?callback=callbackID';
    var tmpDom=document.createElement('script');
    tmpDom.src=intel;
    var search=document.getElementById('search').value;
    var divDome=document.getElementById('divDome');
    divDome.appendChild(tmpDom);
    divDome.removeChild(tmpDom);
    //定时器
    setInterval(timeUpdate,1000);
    function timeUpdate(){
        if(saveID.length === 0) {
            return  false;
        }
        var intel='http://api.money.126.net/data/feed/'+saveID+'?callback=callbackID';
        var tmpDom=document.createElement('script');
        tmpDom.src=intel;
        var divDome=document.getElementById('divDome');
        divDome.appendChild(tmpDom);
        divDome.removeChild(tmpDom);
        //setTimeout(timeUpdate(),1000);
    }


    //删除
    deleteButton.onclick=function deleteCheck() {
        //var table12 = document.getElementById('table12');
        var checkDelet = tableStock.getElementsByTagName("input");
        var LENGTH = saveID.length - 1;
        for (var k = LENGTH; k >= 0; k--) {
            if (checkDelet[k].checked) {
                tableStock.deleteRow(k + 1);
                saveID.splice(k, 1);
            }
        }
    };
//排序
    sortStock.onclick=function(){
        console.log(saveID);
        if(saveID.length === 0){
            return false;
        }
        for(var i=0 ; i < saveID.length ; i++ ){
            for (var j=0 ; j < saveID.length ; j++){
                if(stockData[saveID[i]].price < stockData[saveID[j]].price){
                    var temp;
                    temp=saveID[i];
                    saveID[i]=saveID[j];
                    saveID[j]=temp;
                }
            }
        }
    };

//全部选中
    $("#Choose").click(function(){
        $("[name = checked]:checkbox").prop("checked",this.checked);
    });
    $('[name=checked]:checkbox').click(function(){
        var flag=true;
        $('[name=checked]:checkbox').each(function(){
            console.log($('[name=checked]:checkbox'));
            if(!this.checked){
                flag = false;
            }
        });
        console.log(flag);
        $("#Choose").prop("checked",flag);
    });

}
function callbackID(data) {
   //取得数据，判断有没有新的股票id,有就添加一行 并将数据加进去
    stockData = data; /*存入数据*/
    update();
}

//插入数据
function update() {
    for (var k = 0; k < saveID.length; k++){
        if (stockData[saveID[k]]){
            $($("tr")[k+1]).children("td").eq(1).text(stockData[saveID[k]].name);
            $($("tr")[k+1]).children("td").eq(2).text(stockData[saveID[k]].high);
            $($("tr")[k+1]).children("td").eq(3).text(stockData[saveID[k]].low);
            $($("tr")[k+1]).children("td").eq(4).text(stockData[saveID[k]].price);
            //$($("tr")[k+1]).children("td").eq(3).text(new Date());
        }else{
            alert('输入的股票不存在');
            var tableStock = document.getElementById('tableStock');
            tableStock.deleteRow(k+1);
            saveID.splice(k,1);
        }

        //$($("tr")[k+1]).children("td").eq(2).text(new  Date());
    }
}

////删除
//function deleteCheck() {
//    var table12 = document.getElementById('table12');
//    var checkDelet = table12.getElementsByTagName("input");
//    var LENGTH = saveID.length - 1;
//    for (var k = LENGTH; k >= 0; k--) {
//        if (checkDelet[k].checked) {
//            table12.deleteRow(k + 1);
//            saveID.splice(k, 1);
//        }
//    }
//}
////排序
//function sortPrice() {
//    if(saveID.length === 0){
//        return false;
//    }
//    for(var i=0 ; i < saveID.length ; i++ ){
//        for (var j=0 ; j < saveID.length ; j++){
//            if(stockData[saveID[i]].price < stockData[saveID[j]].price){
//                var temp;
//                temp=saveID[i];
//                saveID[i]=saveID[j];
//                saveID[j]=temp;
//            }
//        }
//    }
//}