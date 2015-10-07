Ext.define('BIFF.view.UserArea.tasks.superselect', {
    extend:'Ext.grid.selection.SpreadsheetModel',

    alias: 'selection.superselect',

    onEditorTab: function(editingPlugin, e) {
            //close editor and move to next cell

        var me = this,
            direction = e.shiftKey ? 'left' : 'right',
            pos = editingPlugin.context,
            position  = pos.view.walkCells(pos, direction, e, me.preventWrap);

        // Navigation had somewhere to go.... not hit the buffers.
        if (position) {
            // If we were able to begin editing clear the wasEditing flag. It gets set during navigation off an active edit.
                position.view.getNavigationModel().setPosition(position, null, e);

        }
    }

});

