$(document).ready(function() {
    pageSetUp();

    $("#menu-project").addClass("active open");
    $("#menu-project-project").addClass("active");

    $("#jqgrid").jqGrid({
        url: "/project/list",
        datatype: "json",
        height: 'auto',
        colNames: ['내용보기', 'idx', 'title', 'description', 'view_mode'],
        colModel: [{name:'act', index:'act', width: 45}, {
            name: 'idx', index: 'idx', hidden: true, key: true,
        }, {
            name: 'title', index: 'title',
        }, {
            name: 'description', index: 'description', hidden: true,        
        }, {
            name: 'view_mode', index: 'view_mode',
        }],
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: '#pjqgrid',
        sortname: 'idx',
        toolbarfilter: true,
        viewrecords: true,
        sortorder: "desc",
        caption: "Project",
        autowidth: true,
        gridComplete: function() {
            let ids = $("#jqgrid").jqGrid('getDataIDs');

            for (let i = 0; i < ids.length; i++) {
                let cl = ids[i];
                re = "<a href='/project/read/"+ids[i]+"'>내용보기</a>"
                $("#jqgrid").jqGrid('setRowData', ids[i], {act:re});
            }
        },
        onSelectRow: function(ids) {
            $("#jqgrid_version").jqGrid('setGridParam'
            , {url:"/project/version/listByProductIdx?projectIdx="+ids
                , datatype: "json"}).trigger('reloadGrid');
        },      
    });

    $("#jqgrid").jqGrid('navGrid', "#pjqgrid"
        , { edit: true, add: true, del: false }
        , {beforeInitData: () => {
                location.href="/project/form?idx="+$("#jqgrid").jqGrid('getRowData', $("#jqgrid").jqGrid('getGridParam', 'selrow')).idx;
                return false;
            }
        }
        , {beforeInitData: (e) => {
                location.href="/project/form";
                return false;
            }
        }
    );






    $("#jqgrid_version").jqGrid({
        url:"/project/version/listByProductIdx"
        , datatype: "local"
        , colNames : ['내용보기', 'idx', 'projectidx', '버전명', '설명', '시작시간', '마감시간', '생성일']
        , colModel : [{name:'act', index:'act', width: 45}, {
            name : 'idx', index : 'idx', hidden : true,
        }, {
            name: 'projectIdx', index: 'projectIdx', hidden: true,
        }, {
            name: 'title', index: 'title',
        }, {
            name: 'description', index: 'description', hidden: true,
        }, {
            name : 'start_date', index : 'start_date',
        }, {
            name : 'finish_date', index : 'finish_date',
        }, {
            name : 'create_date', index : 'create_date', hidden: true,
        }]
        , rowNum:10
        , pager: "#pjqgrid_version"
        , sortname: 'idx'
        , sortorder: "desc"
        , height: 'auto'
        , onSelectRow: function(ids) {
            $("#jqgrid_task").jqGrid('setGridParam'
            , {url:"/project/task/listByVersionIdx?versionIdx="+ids
                , datatype: "json"}).trigger('reloadGrid');
        },
        gridComplete: function() {
            let ids = $("#jqgrid_version").jqGrid('getDataIDs');

            for (let i = 0; i < ids.length; i++) {
                let cl = ids[i];
                re = "<a href='/project/version/read/"+ids[i]+"'>내용보기</a>"
                $("#jqgrid_version").jqGrid('setRowData', ids[i], {act:re});
            }
        },
    });
    $("#jqgrid_version").jqGrid('navGrid', "#pjqgrid_version"
        , {edit:true,add:true,del:false}
        , {beforeInitData: (e) => {
                location.href="/project/version/form?idx="+$("#jqgrid_version").jqGrid('getRowData', $("#jqgrid_version").jqGrid('getGridParam', 'selrow')).idx;
            }
        }
        , {beforeInitData: (e) => {
            location.href="/project/version/form"
            return false;
        }
    });








    function depthText(cellvalue, options, rowObject) {
        let frontText = "";
        
        for (let i = 0 ; i < rowObject.depth; i++) {
            frontText += ' <i class="fa-arrow-right fa"></i>'
        }
        return frontText + "  " + cellvalue;
    }
    
    function linkTask(cellvalue, options, rowObject) {
        return "<a href='/project/task/read/"+rowObject.idx+"'>보기</a>";
    }

    $("#jqgrid_task").jqGrid({
        url: "/project/task/listByVersionIdx",
        datatype: "local",
        height: 'auto',
        colNames: ['보기', '번호', 'depth', '프로젝트', '버전', '제목', '타입', '상태', '우선도', '시작일', '마감일', '담당자', '진척도'],
        colModel: [{name:'act', index:'act', width: 25, formatter: linkTask}, {
            name: 'idx', index: 'idx', width: 25, key:true,
        }, {
            name: 'depth', index: 'depth', hidden: true,
        }, {
            name: 'projectName', index: 'projectName', width: 80, hidden: true,
        }, {
            name: 'versionName', index: 'versionName', width: 70, hidden: true,
        }, {
            name: 'title', index: 'title', editable: true, formatter:depthText,
        }, {
            name: 'typeName', index: 'typeName', width: 40,
        }, {
            name: 'priorityName', index: 'priorityName', width: 40,
        }, {
            name: 'statusName', index: 'statusName', width: 40,
        }, {
            name: 'start_time', index: 'start_time', width: 60,
        }, {
            name: 'finish_time', index: 'finish_time', width: 60,
        }, {
            name: 'manager', index: 'manager', hidden: true,
        }, {
            name: 'progress', index: 'progress', width: 60,
        }],
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: '#pjqgrid_task',
        //sortname: 'idx',
        toolbarfilter: true,
        viewrecords: true,
        //sortorder: "desc",
        gridComplete: function() {
        },
        caption: "일감",
        autowidth: true,
    });
    $("#jqgrid_task").jqGrid('navGrid', "#pjqgrid_task"
        , { edit: true, add: true, del: true }
        , {beforeInitData: () => {
                location.href="/project/task/form?idx="+$("#jqgrid_task").jqGrid('getRowData', $("#jqgrid_task").jqGrid('getGridParam', 'selrow')).idx;
                return false;
            }
        }
        , {beforeInitData: (e) => {
                location.href="/project/task/form";
                return false;
            }
        }
    );


    $('.navtable .ui-pg-button').tooltip({
        container: 'body'
    });
    // remove classes
    $(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
    $(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
    $(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
    $(".ui-jqgrid-pager").removeClass("ui-state-default");
    $(".ui-jqgrid").removeClass("ui-widget-content");

    // add classes
    $(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
    $(".ui-jqgrid-btable").addClass("table table-bordered table-striped");

    $(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
    $(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
    $(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
    $(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
    $(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
    $(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
    $(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
    $(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

    $(".ui-icon.ui-icon-seek-prev").wrap("<div class='btn btn-sm btn-default'></div>");
    $(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

    $(".ui-icon.ui-icon-seek-first").wrap("<div class='btn btn-sm btn-default'></div>");
    $(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

    $(".ui-icon.ui-icon-seek-next").wrap("<div class='btn btn-sm btn-default'></div>");
    $(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

    $(".ui-icon.ui-icon-seek-end").wrap("<div class='btn btn-sm btn-default'></div>");
    $(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");
})