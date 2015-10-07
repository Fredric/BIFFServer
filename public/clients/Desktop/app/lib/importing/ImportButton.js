Ext.define('BIFF.lib.importing.ImportButton', {
    xtype: 'importbutton',
    extend: 'Ext.button.Button',
    requires: [
        'BIFF.lib.importing.PasteExcelPlugin'
    ],
    config: {
        sourceGrid: null,
        wizard: null

    },
    handler: function () {
        this.setSourceGrid(this.getGrid());
        this.startWizard();
    },
    getGrid: function () {
        return this.up('grid');
    },

    startWizard: function () {

        this.win = Ext.create('Ext.window.Window', {
            plugins: 'pasteexcel',
            button: this,
            layout: 'card',
            width: 500,
            title: 'Import from clipboard',
            height: 300,
            autoShow: true,
            modal: true,
            bodyPadding: 15,
            autoScroll:true,
            items: [
                {

                    html: '<h2>1. Copy cell range from Excel sheet</h2><h2>2.  Paste in this window</h2><img src="/clients/Desktop/resources/paste.png">'
                }
            ]

        });

        this.fieldStore = Ext.create('Ext.data.Store',{
            fields:['id', 'text'],
            data:this.getMappingFields()
        })
        this.dataIndexArray = this.getVisibleColumnsDataIndexArray()



    },
    onPasted: function (data, recCount, colCount) {
        var fields =[],
            columns = [],
            i;

        for (i = 0; i < colCount; i++) {
            fields.push({type:'string', name:'field' + i});
        }
        for (i = 0; i < colCount; i++) {
            columns.push(
                {
                    width:130,
                    hoverCls:'',
                   // text:'column ' + i ,
                    resizable:false,
                    draggable:false,
                    menuDisabled:true,
                    sortable:false,
                    dataIndex:'field' + i,
                    items: [
                        {
                            margin:'0 10 10 10',
                            xtype: 'combobox',
                            valueField:'id',
                            emptyText:'Select field',
                            valueNotFoundText:'Select field',
                            displayField:'text',
                            store: this.fieldStore ,
                            value: this.dataIndexArray.length > i ? this.dataIndexArray[i]:'nomap',
                            width:110 ,
                            id:'combo' + i
                        }
                    ]
                }
            );
        }
        var store = Ext.create('Ext.data.ArrayStore', {
            fields:fields,
            data:data
        });

        this.grid = Ext.create('Ext.grid.Panel',{
            columnLines:true,
            disableSelection:true,
            enableTextSelection:true,
            viewConfig:{
              trackOver:false,
              stripeRows:true
            },
            columns:columns,
            store:store,
            buttons:[
                {text:'Import', scope: this, handler:this.doMappedImport},
                {text:'Cancel', scope: this, handler:this.cancelWizard}
            ]
        })

        this.win.setWidth(1000),
        this.win.setHeight(800);
        this.win.setTitle('Map data fields to columns')
        this.win.center();
        this.win.add(this.grid);



        this.win.getLayout().setActiveItem(1);

    },

    onDestroy: function () {
        if (this.win) {
            this.win.destroy();

        }
        this.callParent();
    },
    getMappingFields:function(){
        var arr = [{id:'nomap', text:'< n/a >'}];
        Ext.each(this.getSourceGrid().store.model.getFields(),function(field){
            arr.push({id:field.name, text: field.name});
        }, this)
        return arr;
    },
    getVisibleColumnsDataIndexArray:function(){
        var arr = [];
        var columns = this.getSourceGrid().columnManager.getColumns();
        Ext.each(columns, function(column){
            arr.push(column.dataIndex);
        });
        return arr;
    },
    doMappedImport:function(){
        var i;
        var arr = [];
        if(this.validateMappingCombos() === false){
            Ext.Msg.alert('Mapping error','Check field mappings for duplicates');
            return;
        }

        this.getSourceGrid().store.removeAll();
        var fieldOrder = [];
        Ext.each(this.grid.columnManager.getColumns(), function(col){

            fieldOrder.push(col.down('combo').getValue());

        });
        this.grid.store.each(function(rec){
            var obj = {}
            for (i = 0; i < fieldOrder.length; i++) {
               obj[fieldOrder[i]] = rec.get('field' + i)
            }
           arr.push(obj);

        },this);

        this.getSourceGrid().store.add(arr);
        this.cancelWizard();


    },
    cancelWizard:function(){
        this.win.destroy();
        this.grid.destroy();
    },
    validateMappingCombos:function(){
        return true;
    }

})