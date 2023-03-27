var txt = '';
var listTXT = '';
getTxt = $.ajax({
  type:'GET',
  url:'https://good.ncu.edu.cn/mediawiki/index.php/Main_Page',
  async:true,
  dataType:'text',
  success(res){
      txt = res;
  }
});
$.when(getTxt).done(function(){
  listTXT = txt.split('<div id="mw-content-text" class="mw-body-content mw-content-ltr" lang="en" dir="ltr"><div class="mw-parser-output">');
  listTXT = listTXT[1];
  listTXT = listTXT.split('\n\x3C!-- \nNewPP limit report\n')[0];
  showStr = '';
  newList = listTXT.split("<tr>");
  for(i in newList){
      if(i == '0'){ // 特殊处理部分
              showStr += "<tr>";
        showStr += newList[i];
      }
      else {
        selected =  newList[i].split("<td><b>")[1];
        if(selected.includes("CCF A")||selected.includes("CCF B")||selected.includes("Q1")||selected.includes("Q2")){ //表示这部分是要显示的
            // 只要 0 1 3部分
            showStr +=  "<tr>";// 记得加回删去的<tr>
            partStr = "";
            count = 0;
            partedList = newList[i].split('</td>');
        while(count < partedList.length){
                if(count == 0 || count == 1 || count == 3){
                    partStr += partedList[count];
                    partStr += '</td>';
                      
                }
                count++;
            }
            showStr += partStr; 
        showStr +="</tr>";
        }else{ //不显示的就跳过
            continue;
        }
    }
  }
  showStr += "</tbody></table>";

  document.getElementById("pub").innerHTML = showStr;
});