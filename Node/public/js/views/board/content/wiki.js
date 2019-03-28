$(document).ready(function () {
    pageSetUp();

    $("#menu-board").addClass("active open");
    $("#menu-board-wiki").addClass("active");

    let boardCategories;

    $.ajax({
        url: "/board/list/"
        , method : "get"
        , data : {}
        , success : (result) => {
            boardCategories = result.rows;
        } 
    });

    function contentColumn(cellvalue, options, rowObject) {
        return `<a href='javascript:void(0)' data-idx='${rowObject.idx}' class='contentColumn'>보기</a>`;  
    }

    $("#jqgrid").jqGrid({
        url: "/board/content/list?boardIdx="+$("#boardIdx").val(),
        datatype: "json",
        height: 'auto',
        colNames: ['보기', 'idx', '카테고리', '제목', '내용', '태그', '생성일', '수정일'],
        colModel: [{
            name:'act',
            index:'act',
            width: 30,
            formatter: contentColumn
        }, {
            name: 'idx',
            index: 'idx',
            hidden: true,
            key: true,
        }, {
            name: 'boardTitle',
            index: 'boardTitle',
            width: 30,
            editable: true,
        }, {
            name: 'title',
            index: 'title',
            editable: true,
        }, {
            name: 'content',
            index: 'content',
            hidden: true,
            editable: true,
        }, {
            name: 'tag',
            index: 'tag',
            editable: true,
            hidden: true,
        }, {
            name: 'createDate',
            index: 'createDate',
            editable: true,
            width: 70,
        }, {
            name: 'modifyDate',
            index: 'modifyDate',
            editable: true,
            width: 70,
        }],
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: '#pjqgrid',
        sortname: 'idx',
        toolbarfilter: true,
        viewrecords: true,
        sortorder: "desc",
        caption: "게시판",
        autowidth: true,
        gridComplete: function() {
            $(".contentColumn").on("click", (e) => {
                readDraw($("#jqgrid").jqGrid('getRowData', $(e.currentTarget).attr("data-idx")))
            });
        },
    });

    $("#jqgrid").jqGrid('navGrid', "#pjqgrid"
        , { edit: false, add: false, del: true }
            , {beforeInitData: () => {
                location.href="/board/content/form?idx="+$("#jqgrid").jqGrid('getRowData', $("#jqgrid").jqGrid('getGridParam', 'selrow')).idx;
                return false;
            }
        }
        , {beforeInitData: (e) => {
                location.href="/board/content/form";
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


    function tagDraw($article, tag) {
        tag.split(',').forEach((element) => {
            $article.find("div.widget-body div.widget-body-toolbar")
            .append($("<div>")
                .addClass("badge bg-color-purple")
                .text(element)
            )
        });
    }

    function tagInputDraw($article, tag) {
        $article.find("div.widget-body div.widget-body-toolbar")
        .append($("<input name='tags'>")
            .addClass("form-control tagsinput")
            .attr("data-role", "tagsinput")
            .val(tag)
        ).find("input").tagsinput();
    }

    function removeEditShowView($article) {
        $article.find(".tui-editor-defaultUI").remove();
        $article.find(".tui-editor-contents").show();
        $article.find("div.widget-body div.contentView").css("height", "100%");
        $article.find(".cancelBt").remove();
        $article.find(".saveBt").remove();
        $article.find("div.widget-toolbar div").remove();
        $article.find("div.widget-body div.widget-body-toolbar div.bootstrap-tagsinput").remove();
        $article.find("div.widget-body div.widget-body-toolbar input.tagsinput").remove();
        $article.find("h2.readTitle").text($article.find("h2.readTitle input").val());
        $article.find("h2.readTitle input").remove();
    }

    $("#writeBtn").click(() => {
        let data = {idx: 0, title: "", tag: "", content: ""}
        let $article = $("#readTemplate article").clone()
        $article.find("h2.readTitle").text("");
        $article.find("div.widget-body div.contentView").attr("id", `content_0`);

        $("section#widget-grid div#readRow").prepend($article)

        $article.find(".hideBt").click(() => {
            $article.find(".hideBt i").toggleClass("fa-minus").toggleClass("fa-plus")
            $article.find("div.content").slideToggle(200)
        })

        $article.find(".delBt").click(() => {
            $article.remove();
        });
        
        $article.find(".editBt").click(() => {
            editDraw($article, data);
        });
        
        editDraw($article, data)
    })

    function editDraw($article, data) {
        if ($article.find(".tui-editor-defaultUI").length == 0) {
            $article.find("div.widget-body div.widget-body-toolbar div.badge").remove()
            tagInputDraw($article, data.tag)
            
            $article.find("h2.readTitle").html("")
            $article.find("h2.readTitle")
            .append($("<input name='title'>")
                .addClass("form-control")
                .val(data.title)
            )


            let $categoryButton = $("<button>");
            let $categoryUl = $("<ul>").addClass("dropdown-menu pull-right");

            $categoryButton.addClass("btn dropdown-toggle btn-xs btn-warning")
                .attr("data-toggle", "dropdown")
                .append($("<i>")
                    .addClass("fa fa-caret-down")
            )

            boardCategories.forEach((element) => {
                if ($("#boardIdx").val() == element.boardIdx) {
                    $categoryButton.text(element.title);
                }

                $categoryUl
                .append($("<li>")
                    .append($("<a href='javascript:void(0);'>")
                        .text(element.title)
                        .attr("data-boardIdx", element.boardIdx)
                        .click((target) => {
                            $article.find("div.widget-toolbar div button").text($(target.currentTarget).text())
                            $("#boardIdx").val($(target.currentTarget).attr("data-boardIdx"));
                        })
                    )
                )
            });

            $article.find("div.widget-toolbar")
            .append($("<div>")
                .addClass("btn-group")
                .append($categoryButton)
                .append($categoryUl)
            );

            let editor = new tui.Editor({
                el: document.querySelector(`#content_${data.idx}`),
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                height: '600px',
                initialValue: data.content
            });
            
            $article.find("div.contentView .tui-editor-contents").hide();
            $article.find("div.contentView .te-preview .tui-editor-contents").show();
            
            $article.find("div.jarviswidget-ctrls")
            .prepend($("<a>")
                .addClass("button-icon jarviswidget-edit-btn cancelBt")
                .attr("rel", "tooltip")
                .attr("title", "")
                .attr("data-placement", "bottom")
                .attr("data-original-title", "닫기")
                .append($("<i>")
                    .addClass("fa fa-ban")
                )
                .click(() => {
                    if (data.idx == 0) {
                        $article.remove();
                    } else {
                        removeEditShowView($article)
                        tagDraw($article, data.tag)
                    }
                })
            )
            .prepend($("<a>")
                .addClass("button-icon jarviswidget-edit-btn saveBt")
                .attr("rel", "tooltip")
                .attr("title", "")
                .attr("data-placement", "bottom")
                .attr("data-original-title", "입력")
                .append($("<i>")
                    .addClass("fa fa-save")
                )
                .click(() => {
                    let method = "post";

                    if (data.idx != 0) {
                        method = "put"
                    }

                    $.ajax({
                        url: "/board/content/form"
                        , method : method
                        , data : {
                            idx : $article.attr("data-idx")
                            , boardIdx : $("#boardIdx").val()
                            , title : $article.find("h2.readTitle input").val()
                            , content: editor.getValue()
                            , tags : $article.find("input[name='tags']").val()
                        }
                        , success : (result) => {
                            if (method == "post") {
                                $article.attr("id", "readArticle_"+result.idx).attr("data-idx", result.idx);
                                $article.find("div.widget-body div.contentView").attr("id", `content_${result.idx}`);

                                let viewer = new tui.Viewr({
                                    el: document.querySelector(`#content_${result.idx}`)
                                    , initialValue : data.content
                                });
                    
                                data.viewer = viewer;
                                data.idx = result.idx;
                                data.title = $article.find("h2.readTitle input").val();
                                data.tag = $("input[name='tags']").val();
                                data.content = editor.getValue();

                                tagDraw($article, data.tag)
                                data.viewer.setValue(editor.getValue());
                                removeEditShowView($article)
                            } else {
                                data.title = $article.find("h2.readTitle input").val();
                                data.tag = $("input[name='tags']").val();
                                data.content = editor.getValue();
                                
                                tagDraw($article, data.tag)
                                data.viewer.setValue(editor.getValue());
                                removeEditShowView($article)
                            }
                            $("#jqgrid").trigger("reloadGrid");
                        }
                        , error : (err) => {
                            alert("error");
                        }
                    });
                })
            )                    
        }
    }

    function readDraw(data) {
        if ($("#readArticle_"+data.idx).length == 0) {

            let $article = $("#readTemplate article").clone()
            $article.attr("id", "readArticle_"+data.idx).attr("data-idx", data.idx);
            $article.find("h2.readTitle").text(data.title);
            $article.find("div.widget-body div.contentView").attr("id", `content_${data.idx}`);

           
            $("section#widget-grid div#readRow").prepend($article)

            let viewer = new tui.Viewr({
                el: document.querySelector(`#content_${data.idx}`)
                , initialValue : data.content
            });

            data.viewer = viewer;

            tagDraw($article, data.tag);
            
            $article.find(".hideBt").click(() => {
                $article.find(".hideBt i").toggleClass("fa-minus").toggleClass("fa-plus")
                $article.find("div.content").slideToggle(200)
            })

            $article.find(".delBt").click(() => {
                $article.remove();
            });
            
            $article.find(".editBt").click(() => {
                editDraw($article, data);
            });  
        } else {
            return;
        }
    }
});