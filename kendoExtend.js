'use strict';
angular.module('ag.service', []).factory('kendoExtend', ['$filter', '$translate', function($filter, $translate) {
    var _ddlTranslate = function(e) {
        var ddl = e.sender;
        // if (ddl.options.optionLabel) ddl.options.optionLabel = $filter('translate')(ddl.options.optionLabel);
        ddl.dataSource.data().forEach(function(item, index) {
            item.set(ddl.options.dataTextField, $filter('translate')(item.get(ddl.options.dataTextField)));
        });
    }
    return {
        init: function() {
            var kendo = window.kendo,
                ui = kendo.ui,
                Widget = ui.Widget;

            $.extend(true, kendo.ui.DatePicker.fn.options, {
                format: 'yyyy-MM-dd',
                month: '{empty: "<div class="center tb-lightgray">#= data.value #</div>"}'
            });

            $.extend(true, kendo.ui.DropDownList.fn.options, {
                dataBound: _ddlTranslate
            });

            $.extend(true, kendo.ui.Upload.fn.options, {
                async: {
                    autoUpload: false,
                },
                localization: {
                    cancel: $filter('translate')('Upload.Cancel'),
                    headerStatusUploaded: $filter('translate')('Upload.Uploaded'),
                    headerStatusUploading: $filter('translate')('Upload.Uploading'),
                    retry: $filter('translate')('Upload.Retry'),
                    select: $filter('translate')('Upload.SelectFiles'),
                    uploadSelectedFiles: $filter('translate')('Upload.UploadFiles')
                },
                multiple: false,
                upload: function(e) {
                    e.data = {
                        _method: 'PUT'
                    };
                }
            });

            var windowPlg = (function(init) {
                return kendo.ui.Window.extend({
                    options: {
                        // actions: false,
                        modal: true,
                        resizable: false,
                        title: false,
                        visible: false
                    },
                    init: function(element, options) {
                        if (options.title) {
                            options.title = $filter('translate')(options.title);
                        }
                        init.call(this, element, options);
                    }
                });
            })(kendo.ui.Window.fn.init);
            kendo.ui.plugin(windowPlg);
        },
        dataSourceTranslate: function(e) {
            _ddlTranslate(e);
        }
    };
}])