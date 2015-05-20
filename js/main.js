$(function(){
	var form = new Moon.View({
		id:"form",
		data:{
			mode:"css",
			fileMode:"gulpfile",
			usePreprocessor:"",
			useAutoPrefixer:"true",
			useMinifyCss:"true",
			cssPreprocessor:"sass",
			cssSrc:"css/src",
			cssDest:"css/dist",
			cssStyleGuideDest:"docs/css",
			useCssComb:"true",
			useCmq:"true",
			useCssStyleGuide:"",
			useCssLint:"",
			jsSrc:"js/src",
			jsDest:"js/dist",
			// jsDocDest:"docs/js",
			useUglifyJs:"true",
			useAltJs:"",
			useConcatJs:"",
			useJsHint:"",
			// useJsDoc:"",
			altJs:"coffee",
			concatJs:"main.js",
			htmlSrc:"html",
			htmlDest:"./",
			useTemplateEngine:"",
			templateEngine:"ejs",
			useMinifyHtml:"",
			useImageMin:"",
			imageSrc:"images/src",
			imageDest:"images/dist",
			useIconFont:"",
			iconFontName:"myicon",
			iconFontSrc:"fonts/src",
			iconFontDest:"fonts/dist",
			iconFontCssPrefix:"icon",
			useBrowserSync:"",
			browserSyncDir:"./",
			browserSyncLocal:"true",
			cssExtName:function(){
				var preprocessor = this.data.cssPreprocessor;
				if(!this.data.usePreprocessor){
					return "css";
				}else{
					if(preprocessor == "sass"){
						return "sass"
					}else if (preprocessor == "less"){
						return "less";
					}else if (preprocessor == "stylus"){
						return "styl";
					}
				}
			},
			cssTask:function(){
				var data = this.data;
				if(!data.usePreprocessor){
					return "css";
				}else{
					return data.cssPreprocessor;
				}
			},
			jsExtName:function(){
				var data = this.data;
				if(!data.useAltJs){
					return "js";
				}else if(data.altJs == "babel"){
					return "js";
				}else if(data.altJs == "coffee"){
					return "coffee";
				}else if(data.altJs == "typescript"){
					return "ts";
				}
			},
			jsTask:function(){
				var data = this.data;
				if(!data.useAltJs){
					return "js";
				}else{
					return data.altJs;
				}
			},
			htmlExtName:function(){
				var data = this.data;
				if(!data.useTemplateEngine){
					return "html";
				}else{
					return data.templateEngine;
				}
			},
			htmlTask:function(){
				var data = this.data;
				if(!data.useTemplateEngine){
					return "html";
				}else{
					return data.templateEngine;
				}
			},
			useRename:function(){
				var data = this.data;
				if(data.useMinifyCss || data.useUglifyJs || data.useMinifyHtml){
					return true;
				}else{
					return false;
				}
			},
			useImageTask:function(){
				var data = this.data;
				if(data.useBrowserSync || data.useImageMin){
					return true;
				}else{
					return false;
				}
			},
			imageTasks:function(){
				var data = this.data;
				if(data.useImageMin){
					if(data.useBrowserSync){
						return "'image','reload'";
					}else{
						return "'image'";
					}
				}else{
					return "'reload'";
				}
			}
		},
		method:{
			changeMode:function(mode){
				this.data.mode = mode;
				this.update();
				source.update("text");
				package.update("text");
				Prism.highlightElement($('#code')[0]);
				Prism.highlightElement($('#jsoncode')[0]);
			},
			changeFileMode:function(mode){
				this.data.fileMode = mode;
				this.update();
				source.update("text");
				package.update("text");
				Prism.highlightElement($('#code')[0]);
				Prism.highlightElement($('#jsoncode')[0]);
			},
			refresh:function(){
				this.update();
				source.update("text");
				package.update("text");
				Prism.highlightElement($('#code')[0]);
				Prism.highlightElement($('#jsoncode')[0]);
			},
			refreshSource:function(){
				source.update("text");
				package.update("text");
				Prism.highlightElement($('#code')[0]);
				Prism.highlightElement($('#jsoncode')[0]);
			},
			showAlert:function(){
				var $alert = $("<div class='sourceCopied'>クリップボードにソースをコピーしました</div>");
                $("body").append($alert);
                $alert.delay(1).queue(function(next){
                    $(this).addClass("active");
                    next();
                }).delay(700).queue(function(next){
                    $(this).removeClass('active');
                    next();
                }).delay(200).queue(function(next){
                    $(this).remove();
                    next();
                });
			},
			sourceCopy:function(){
				this.method.showAlert();
				source.copyToClipBoard();
			},
			packageCopy:function(){
				this.method.showAlert();
				package.copyToClipBoard();
			},
			downloadPackage:function(){
				var data = this.data;
				var zip = new JSZip();
				zip.file("gulpfile.js", source.getHtml());
				zip.file("package.json", package.getHtml());
				if(data.useIconFont){
					var iconPath = data.iconFontSrc+"/template/"+data.iconFontName;
					zip.file(iconPath+".html", fontHtml.getHtml());
					zip.file(iconPath+".css", fontCss.getHtml());
				}
				var content = zip.generate({type:"blob"});
				saveAs(content, "gulp-generator.zip");
			}
		},
	});
	var source = new Moon.View({
		id:"source",
		data:form.data,
	});
	var package = new Moon.View({
		id:"package",
		data:form.data,
	});
	var fontCss = new Moon.View({
		id:"myfont-css",
		data:form.data
	});
	var fontHtml = new Moon.View({
		id:"myfont-html",
		data:form.data
	});
	form.update();
	source.update("text");
	package.update("text");
});