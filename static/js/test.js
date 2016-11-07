$(document).ready(function() {

    var changes_list = [];

    /*var data = [
        ["2016", 10, 11, 12, 13],
        ["2017", 20, 11, 14, 13],
        ["2018", 30, 15, 12, 13]
    ];

    var container = document.getElementById('example');

    var options = {
        data: data,
        colHeaders: ["Year", "Ford", "Volvo", "Toyota", "Honda"],
        rowHeaders: true,
        stretchH: 'all',
        columnSorting: true,
        sortIndicator: true,
        contextMenu: true,
        width: 100
    };

    var ht = new Handsontable(container, options);
    //Handsontable.hooks.add('beforeInit', myCallback, hotInstance);
    ht.setDataAtCell(3, 0, 'new value');*/

    var
        $$ = function(id) {
          return document.getElementById(id);
        },
        container = $$('example'),
        exampleConsole = $$('example1console'),
        //autosave = $$('autosave'),
        load = $$('load'),
        save = $$('save'),
        //autosaveNotification,
        hot;

    hot = new Handsontable(container, {
    //startRows: 8,
    //startCols: 6,
    rowHeaders: true,
    //colHeaders: true,
    colHeaders: ["Intent Name", "Test phrases", "Action", "Parameter", "Output", "Comments"],
    afterChange: function (change, source) {
        console.log(change);
        console.log(source);
        if (change != null){changes_list.push(change[0]);console.log(changes_list); console.log(changes_list.length);}
        if (source === 'loadData') {
            return; //don't save this change
        }
        /*if (!autosave.checked) {
            return;
        }
        clearTimeout(autosaveNotification);
        ajax('scripts/json/save.json', 'GET', JSON.stringify({data: change}), function (data) {
            exampleConsole.innerText  = 'Autosaved (' + change.length + ' ' + 'cell' + (change.length > 1 ? 's' : '') + ')';
            autosaveNotification = setTimeout(function() {
                exampleConsole.innerText ='Changes will be autosaved';
            }, 1000);
        });*/
    }
    });

    Handsontable.Dom.addEvent(load, 'click', function() {

        $.ajax({
            url:'static/js/load.json',
            type: 'GET',
            cache:false,
            success: function(res){
                var data = res;
                hot.loadData(data.data);
                exampleConsole.innerText = 'Data loaded';
            },
            error: function(data){
                console.log(data)
            }
        })
    });

    Handsontable.Dom.addEvent(save, 'click', function() {
        // save all cell's data
        //console.log(hot.getData());
        //console.log(hot.getCell(2, 4));
        var console_string = '';
        if(changes_list.length > 0){
            for (i in changes_list){
                console_string += 'changed '+changes_list[i][2]+' for '+changes_list[i][3] +' in ' + hot.getDataAtCell(changes_list[i][0], 0)+' intent' + '\n';
                //console.log(changes_list[i]);
            }
            exampleConsole.innerText = console_string;
            /*$.ajax({
                url:'/save_test',
                type: 'POST',
                data: {'data': JSON.stringify(changes_list)},
                contentType: 'application/json',
                success: function(res){
                    console.log(res);
                },
                error: function(data){
                    console.log(data)
                }
            })*/
        } else  {
            console.log('you changed nothing');
            exampleConsole.innerText = 'i see no changes';
        }
    });

  /*Handsontable.Dom.addEvent(autosave, 'click', function() {
    if (autosave.checked) {
      exampleConsole.innerText = 'Changes will be autosaved';
    }
    else {
      exampleConsole.innerText ='Changes will not be autosaved';
    }
  });*/

});