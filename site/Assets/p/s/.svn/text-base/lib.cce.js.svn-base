     function ResetAll(){
                var frm = this.document.forms['basic_search'];
                frm.action="reset.jsp";
                frm.target="topFrame";
                frm.submit();
      }
    function DoByIDSearch(){
            var PersonIDStr= $("#PersonID").val();
            if(PersonIDStr == ""){
                alert("Please enter a valid ID in the textbox.");
                return;
            }
            var frm = this.document.forms['basic_search'];
            frm.action="../persons/DisplayPerson.jsp?PersonID="+PersonIDStr;
            frm.target="displayFrame";
            frm.submit();
    }
    function DoSearch(FrameName){
        var frm = this.document.forms['basic_search'];
        frm.action="update.jsp";
        frm.target="topFrame";
        frm.submit();
        frm.action="search.jsp";
        frm.target=FrameName;
        frm.submit();
    }
    function UpdateForm(){
      var frm = this.document.forms['basic_search'];
      frm.action="update.jsp";
      frm.target="topFrame";
      frm.submit();
    }
    function DownloadSearch(){
     var frm = this.document.forms['basic_search'];
      frm.action="downloadSearchState.jsp";
      frm.target = "displayFrame";
      frm.submit();
    }
     function loadDiocese(ts) {
        var tf = ts.form;
        var cvalue = ts.options[ts.selectedIndex].value;
        tf.submit();
     }
