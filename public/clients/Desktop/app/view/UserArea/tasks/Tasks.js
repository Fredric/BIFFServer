Ext.define('BIFF.view.UserArea.tasks.Tasks', {
    extend: 'Ext.grid.Panel',
    xtype: 'tasks',


    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.plugin.Clipboard',
        'BIFF.view.UserArea.tasks.superclip',
        'BIFF.view.UserArea.tasks.superselect',
        'BIFF.lib.importing.ImportButton'
    ],
    bufferedRenderer: false,
    columnLines:true,
    controller: 'taskscontroller',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        }),
        'superclip'
    ],
    listeners:{
      cellkeydown:function(a, b, cellIdx, d, e, rowIdx, g, h, event){
          a.editingPlugin.startEditByPosition({row:rowIdx, column:cellIdx})
      }
    },

    selModel: {
        type: 'superselect',
        columnSelect: true,
       // checkboxSelect: true,
        pruneRemoved: false
    },

    columns: [
        {header: 'A', dataIndex:'username', editor: 'textfield'},
        {header: 'B', dataIndex: 'password', editor: 'textfield'},
        {
            header: 'C', dataIndex: 'email', flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }
    ],

    dockedItems: [

        {
            xtype: 'toolbar',
            items: [
                {
                    text: 'Add',
                    listeners: {
                        click: 'onAdd'
                    }
                },
                {
                    text: 'Delete selected',
                    listeners: {
                        click: 'onRemove'
                    }
                },
                {
                    text: 'Save',
                    listeners: {
                        click: 'onSave'
                    }
                },
                {
                    xtype:'importbutton',
                    text:'Import'
                },
                {
                    text:'fetch',
                    handler:function(){
                      /*  var getTasks = fetch('/tasks')
                        var getUsers = fetch('/users')


                        readJson = function(response){
                            return response.text();
                        }
                        printIt = function(text) {
                            console.log('got text', text)
                        }
                        errorHandler = function(ex) {
                            console.log('failed', ex)
                        }

                        getTasks
                            .then(readJson)
                            .then(printIt).
                            then(
                                getUsers
                                    .then(readJson)
                                    .then(printIt)
                            )
                            .catch(errorHandler)*/
                    }
                }
            ]
        }

    ],
    initComponent: function () {
        var me = this;
        me.store = Ext.StoreMgr.lookup('Tasks');


        me.callParent();

    }
})