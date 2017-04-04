/**
 * Created by Administrator on 2017/3/7.
 */
var  saveID=new Array;
var i=0;
var stockData;
var stockIDnew;
var allID=new  Array;
//
var table12=document.getElementById('table12');
function stock(stockID) {
    //判断输入的正确性
    console.log('stock');
    stockIDnew="0"+stockID;
    if (stockIDnew.length != 7){
            return 0;
        }
    if(saveID.length === 0) {
        saveID.unshift(stockIDnew);
        $("<tr><td></td><td></td><td></td><td></td><td><input type='checkbox' name='checked'></td></tr>").appendTo("#table12");
    }
    console.log(saveID == null);
    for(var j in saveID){
        if (stockIDnew === saveID[j]){
            break;
        }
        if(stockIDnew != saveID[j] && j == saveID.length-1){
            saveID.push(stockIDnew);
            $("<tr><td></td><td></td><td></td><td></td><td><input type='checkbox' name='checked'></td></tr>").appendTo("#table12");
            break;
        }
    }
    var intel='http://api.money.126.net/data/feed/'+saveID+'?callback=callback';
    var tmpDom=document.createElement('script');
    tmpDom.src=intel;
    var search=document.getElementById('search').value;
    var divDome=document.getElementById('divDome');
    divDome.appendChild(tmpDom);
    divDome.removeChild(tmpDom);
    console.log(saveID);
}
function callback(data) {
    console.log('callback');
   //取得数据，判断有没有新的股票id,有就添加一行 并将数据加进去
    stockData = data; /*存入数据*/
    update();
}

function update() {
    console.log('updata');
    for (var k = 0; k < saveID.length; k++){
        $($("tr")[k+1]).children("td").eq(0).text(stockData[saveID[k]].name);
        // $($("tr")[k+1]).children("td").eq(1).text(stockData[saveID[k]].high);
        $($("tr")[k+1]).children("td").eq(2).text(stockData[saveID[k]].low);
        $($("tr")[k+1]).children("td").eq(3).text(stockData[saveID[k]].price);
        $($("tr")[k+1]).children("td").eq(1).text(Date);
    }
}

function deleteCheck(){
    var table12=document.getElementById('table12');
    var checkDelet=table12.getElementsByTagName("input");
    var LENGTH = saveID.length-1;
    for(var k= LENGTH;k >= 0; k--){
        if (checkDelet[k].checked){
        table12.deleteRow(k+1);
        saveID.splice(k,1);
            console.log(k)
         }
    }
    // console.log($("input[name='checked']:checked"));
    // $("input[name='checked']:checked").each(function(i,elem){
    // //     // table12.deleteRow(index+1);
    //     console.log($(elem).parents("tr"));
    //     var iTable=$(elem).parents("tr").index();
    //     console.log(iTable);
    //     document.getElementById('table12').deleteRow(iTable);
    //     saveID.splice(iTable,1);
    // });
}
// timeUpdate  =  setInterval(function () {
//     // update();
//     stock(saveID);
// },2000);

function sortPrice() {

    var table12=document.getElementById('table12');
    var _rows =table12.tBodies[0].rows;
    console.log(_rows);
    for (var i = 0; i < _rows.length-1; i++){
        allID[i] = _rows[i+1];
    }
    // console.log(allID);

    allID.sort(function(first, second) {
        // console.log(first);
        var t1 = parseFloat(first.cells[3].innerHTML);
        var t2 = parseFloat(second.cells[3].innerText);
        if (t1 > t2) {
            return 1;
        } else if (t1 < t2) {
            return -1;
        } else {
            return 0;
        }
    });
    for (var i = 0; i < allID.length; i++) {
        table12.tBodies[0].appendChild(allID[i]);
    }
    // saveID=allID;

    allID.length=0;
}