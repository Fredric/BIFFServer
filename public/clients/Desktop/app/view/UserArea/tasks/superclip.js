Ext.define('BIFF.view.UserArea.tasks.superclip', {
    extend:'Ext.grid.plugin.Clipboard',
    alias: 'plugin.superclip',

    putCellData: function (data, format) {

        var values = Ext.util.TSV.decode(data),
            view = this.getCmp().getView(),
            toAdd = 0,
            i,
            navModel = view.getNavigationModel(),
            destination = navModel.getPosition();

        if(destination){
            toAdd = values.length + destination.rowIdx - view.dataSource.getCount();
        }else{
            toAdd = values.length - view.dataSource.getCount();
        }



        for (i = 0; i < toAdd; i++) {
            this.getCmp().getView().dataSource.add({});
        }



        var row,
            recCount = values.length,
            colCount = recCount ? values[0].length : 0,
            sourceRowIdx, sourceColIdx,

            maxRowIdx = view.dataSource.getCount() - 1,
            maxColIdx = view.getVisibleColumnManager().getColumns().length - 1,


            dataIndex, destinationStartColumn,
            dataObject = {};






        if (destination) {
            // Create a new Context based upon the outermost View.
            // NavigationModel works on local views. TODO: remove this step when NavModel is fixed to use outermost view in locked grid.
            // At that point, we can use navModel.getPosition()
            destination = new Ext.grid.CellContext(view).setPosition(destination.record, destination.column);
        } else {
            destination = new Ext.grid.CellContext(view).setPosition(0, 0);
        }
        destinationStartColumn = destination.colIdx;

        for (sourceRowIdx = 0; sourceRowIdx < recCount; sourceRowIdx++) {
            row = values[sourceRowIdx];

            // Collect new values in dataObject
            for (sourceColIdx = 0; sourceColIdx < colCount; sourceColIdx++) {
                dataIndex = destination.column.dataIndex;
                if (dataIndex) {
                    switch (format) {
                        // Raw field values
                        case 'raw':
                            dataObject[dataIndex] = row[sourceColIdx];
                            break;

                        // Textual data with HTML tags stripped
                        case 'text':
                            dataObject[dataIndex] = row[sourceColIdx];
                            break;

                        // innerHTML from the cell inner
                        case 'html':
                            break;
                    }
                }
                // If we are at the end of the destination row, break the column loop.
                if (destination.colIdx === maxColIdx) {
                    break;
                }
                destination.setColumn(destination.colIdx + 1);
            }

            // Update the record in one go.
            destination.record.set(dataObject);

            // If we are at the end of the destination store, break the row loop.
            if (destination.rowIdx === maxRowIdx) {
                break
            }

            // Jump to next row in destination
            destination.setPosition(destination.rowIdx + 1, destinationStartColumn);

        }
    }



})