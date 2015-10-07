Ext.define('BIFF.lib.importing.PasteExcelPlugin', {
    extend: 'Ext.plugin.AbstractClipboard',
    alias: 'plugin.pasteexcel',
    requires: [
        'Ext.util.Format',
        'Ext.util.TSV'
    ],
    getTextData: function (data, format) {
    },

    putTextData: function (data, format) {
        var cmp = this.getCmp().button;
        var values = Ext.util.TSV.decode(data),
            row,
            recCount = values.length,
            colCount = recCount ? values[0].length : 0;

        cmp.onPasted(values, recCount, colCount);
    }
});