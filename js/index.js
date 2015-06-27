var DurePraise = {
    CURRENT_IMAGE_NUMBER: 524,
    LAST_NUMBER: 853,
    IS_ZOOM_OUT: true,
    IS_VIDEO: false,
    changeImageSize: function() {
        if (this.IS_ZOOM_OUT) {
            this.zoomInImage()
        } else {
            this.zoomOutImage()
        }
    },
    tapNextPrevBtn: function(obj) {
        this.changeImageProcess(obj)
    },
    viewYoutubeVideo: function() {
        window.open("http://m.youtube.com/watch?v=" + map.get("dure" + this.CURRENT_IMAGE_NUMBER), "_blank")
    },
    selectInSearchResultList: function($obj) {
        if (!this.IS_VIDEO) {
            this.changeImageProcess($obj.data("no"))
        } else {
            this.clearResultList();
            this.showDawnPraiseVideo();
            var videoId = 'http://www.youtube.com/embed/' + dawnPraise[$obj.data("no") - 1].videoId;
            var width = document.body.clientWidth - 25;
            var height = width / 4 * 3;
            var videoIframe = '<iframe width=' + width + ' height=' + height + ' src=' + videoId + ' frameborder="0" allowfullscreen></iframe>';
            $('#container #dawnPraiseVideo').html(videoIframe)
        }
    },
    showSearchIndexList: function(obj) {
        var temp = obj.children();
        if (temp.get(0).id === 'dawn') {
            this.showDawnPriaseVideoList()
        } else {
            this.showSearchResultList(eval(temp.get(0).id))
        }
    },
    showDawnPriaseVideoList: function() {
        this.clearResultList();
        this.hideYoutubeVideoLink();
        this.hideImage();
        this.showResultList();
        this.hideDawnPraiseVideo();
        dawnPraise.forEach(this.showDawnPraiseList);
        this.IS_VIDEO = true
    },
    showDawnPraiseList: function(element, index, array) {
        $("#resultlist").prepend("<li data-no=" + element.no + ">" + element.no + ".&nbsp;&nbsp;&nbsp;" + element.date + "</li>")
    },
    searchTitleOrNumber: function() {
        var title = $("#searchTitle").val().trim();
        var number = Number($("#searchTitle").val());
        history.back();
        if (number) {
            this.searchNumber(number)
        } else {
            this.searchTitle(title)
        }
        this.clearSearchword()
    },
    searchNumber: function(number) {
        this.changeImageProcess(number)
    },
    searchTitle: function(title) {
        var index;
        var searchResultArray = new Array();
        for (index = 0; index < imgArray.length; index++) {
            if (imgArray[index].indexOf(title) != -1) {
                searchResultArray.push(index + 1)
            }
        }
        this.showSearchResultList(searchResultArray)
    },
    showSearchResultList: function(searchResultArray) {
        this.clearResultList();
        this.hideYoutubeVideoLink();
        this.hideImage();
        this.hideDawnPraiseVideo();
        this.showResultList();
        this.IS_VIDEO = false;
        searchResultArray.forEach(this.showEachArray)
    },
    showEachArray: function(element, index, array) {
        $("#resultlist").append("<li data-no=" + element + ">" + element + "장" + "&nbsp;&nbsp;&nbsp;" + imgArray[element - 1] + "</li>")
    },
    changeImage: function() {
        $("#dureImg").attr("src", "http://vespasiani.cdn3.cafe24.com/dure" + this.CURRENT_IMAGE_NUMBER + ".jpg");
        $("#imageNumber").html(this.CURRENT_IMAGE_NUMBER)
    },
    checkYoutubeLink: function() {
        if (typeof(map.get("dure" + this.CURRENT_IMAGE_NUMBER)) === "undefined") {
            this.hideYoutubeVideoLink()
        } else {
            this.showYoutubeVideoLink()
        }
    },
    checkPrevNextBtn: function(obj) {
        var temp = obj;
        if (Number(temp)) {
            return
        } else if (temp.context.id === "next") {
            this.CURRENT_IMAGE_NUMBER++
        } else if (temp.context.id === "prev") {
            this.CURRENT_IMAGE_NUMBER--
        }
    },
    checkNumberRange: function(number) {
        if (number <= this.LAST_NUMBER && number >= 1) {
            this.CURRENT_IMAGE_NUMBER = number
        } else if (this.CURRENT_IMAGE_NUMBER > this.LAST_NUMBER) {
            this.CURRENT_IMAGE_NUMBER = 1
        } else if (this.CURRENT_IMAGE_NUMBER < 1) {
            this.CURRENT_IMAGE_NUMBER = this.LAST_NUMBER
        }
    },
    changeImageProcess: function(obj) {
        this.IS_VIDEO = false;
        this.hideDawnPraiseVideo();
        this.moveLeftMenu();
        this.hideResultList();
        this.checkPrevNextBtn(obj);
        this.checkNumberRange(obj);
        this.changeImage();
        this.zoomOutImage();
        this.showImage();
        this.checkYoutubeLink();
        console.log(this.CURRENT_IMAGE_NUMBER)
    },
    zoomInImage: function() {
        $("#dureImg").addClass("zoomIn");
        $("#dureImg").removeClass("zoomOut");
        this.IS_ZOOM_OUT = false
    },
    zoomOutImage: function() {
        $("#dureImg").removeClass("zoomIn");
        $("#dureImg").addClass("zoomOut");
        this.IS_ZOOM_OUT = true
    },
    clearResultList: function() {
        $("#resultlist").empty()
    },
    clearSearchword: function() {
        $("#searchTitle").val("")
    },
    showResultList: function() {
        $("#resultlist").addClass("showResultList");
        $("#resultlist").removeClass("hideResultList")
    },
    hideResultList: function() {
        $("#resultlist").removeClass("showResultList");
        $("#resultlist").addClass("hideResultList")
    },
    hideImage: function() {
        $("#dureImg").addClass("hideImage")
    },
    showImage: function() {
        $("#dureImg").removeClass("hideImage")
    },
    showYoutubeVideoLink: function() {
        $("#youtubeVideoLink").addClass("showYoutubeVideoLink");
        $("#youtubeVideoLink").removeClass("hideYoutubeVideoLink")
    },
    hideYoutubeVideoLink: function() {
        $("#youtubeVideoLink").removeClass("showYoutubeVideoLink");
        $("#youtubeVideoLink").addClass("hideYoutubeVideoLink")
    },
    showDawnPraiseVideo: function() {
        $("#dawnPraiseVideo").addClass("showDawnPraiseVideo");
        $("#dawnPraiseVideo").removeClass("hideDawnPraiseVideo")
    },
    hideDawnPraiseVideo: function() {
        $("#dawnPraiseVideo").removeClass("showDawnPraiseVideo");
        $("#dawnPraiseVideo").addClass("hideDawnPraiseVideo");
        $("#dawnPraiseVideo").empty()
    },
    viewLeftMenu: function() {
        var status = $("#leftmenu").attr("class").indexOf("in");
        if (status < 0) {
            this.moveLeftMenu("in")
        } else {
            this.moveLeftMenu()
        }
    },
    moveLeftMenu: function(type) {
        if (type === "in") {
            $("#leftmenu").addClass("in");
            $("#container").addClass("in")
        } else {
            $("#leftmenu").removeClass("in");
            $("#container").removeClass("in")
        }
    },
    stopDefaultEvent: function(e) {
        e.preventDefault();
        e.stopPropagation()
    }
};
$(function() {
    $(document).on("mobileinit", function() {
        $.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
        $.mobile.defaultHomeScroll = 0;
        $.mobile.buttonMarkup.hoverDelay = 0;
        $.mobile.loadPage("#searchDialog", {
            showLoadMsg: false
        });
        $.mobile.loadPage("#infoDialog", {
            showLoadMsg: false
        })
    });
    DurePraise.changeImage();
    DurePraise.checkYoutubeLink();
    $("#dureImg").on("tap", function(e) {
        DurePraise.stopDefaultEvent(e);
        DurePraise.changeImageSize()
    });
    $("#indexHeaderNavbor .headerBtn").on("tap", function(e) {
        DurePraise.stopDefaultEvent(e);
        DurePraise.tapNextPrevBtn($(this))
    });
    $("#youtubeVideoLink").on("tap", function(e) {
        DurePraise.stopDefaultEvent(e);
        DurePraise.viewYoutubeVideo()
    });
    $(document).on("tap", "#resultlist li", function(e) {
        DurePraise.stopDefaultEvent(e);
        DurePraise.selectInSearchResultList($(this))
    });
    $(".indexBtn").on("tap", function(e) {
        DurePraise.stopDefaultEvent(e);
        DurePraise.showSearchIndexList($(this))
    });
    $("#search").on("tap", function(e) {
        DurePraise.stopDefaultEvent(e);
        DurePraise.searchTitleOrNumber()
    });
    $("#indexListBtn").on("tap", function(e) {
        DurePraise.stopDefaultEvent(e);
        DurePraise.viewLeftMenu()
    })
});