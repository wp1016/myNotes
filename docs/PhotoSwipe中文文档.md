# PhotoSwipe中文文档
## 入门
开始之前，您需要了解的是：
- PhotoSwipe 不是一个简单的jQuery插件,至少需要具备基本的JavaScript知识才能安装。
- PhotoSwipe需要预定义的图片尺寸[更多信息](https://photoswipe.com/documentation/faq.html#image-size)
- 如果您在无响应的网站上使用PhotoSwipe，则控件将在移动设备上缩放（因为整个页面都缩放了）。因此，您需要实现自定义控件（例如，右上角的单个大关闭按钮）。
- 文档中的所有代码均为纯Vanilla JS，并支持IE 8及更高版本。如果您的网站或应用程序使用某些JavaScript框架（例如jQuery或MooTools），或者您不需要支持旧版浏览器，请随时简化代码。
- 避免为移动设备投放大图片（大于2000x1500px），因为大图片会大大降低动画效果，并可能导致崩溃（尤其是在iOS Safari上）。可能的解决方案：[使用响应式图片](https://photoswipe.com/documentation/responsive-images.html)，或在单独的页面上打开图像，或使用支持图像平铺的库（如[Leaflet](https://leafletjs.com/)）（在FAQ中有更多信息）。

### 初始化
#### 步骤1：引入JS和CSS文件
您可以在GitHub仓库库的dist /文件夹中找到它们
Sass和未编译的JS文件位于src /文件夹中。
如果你打算修改现有样式，则建议使用Sass，因为其中的代码是经过结构化和注释的。
``` html{4}
<!-- Core CSS file -->
<link rel="stylesheet" href="path/to/photoswipe.css"> 

<!-- Skin CSS file (styling of UI - buttons, caption, etc.)
     In the folder of skin CSS file there are also:
     - .png and .svg icons sprite, 
     - preloader.gif (for browsers that do not support CSS animations) -->
<link rel="stylesheet" href="path/to/default-skin/default-skin.css"> 

<!-- Core JS file -->
<script src="path/to/photoswipe.min.js"></script> 

<!-- UI JS file -->
<script src="path/to/photoswipe-ui-default.min.js"></script> 
```

引入的文件顺序无关紧要，只有在调用 ```new PhotoSwipe()```时才会执行代码，如果你不需要在初始化时使用PhotoSwipe，请使用延迟加载

PhotoSwipe还支持 AMD/CMD的方式导入：
``` js{4}
require([ 
        'path/to/photoswipe.js', 
        'path/to/photoswipe-ui-default.js' 
    ], function( PhotoSwipe, PhotoSwipeUI_Default ) {

    //      var gallery = new PhotoSwipe( someElement, PhotoSwipeUI_Default ...
    //      gallery.init() 
    //      ...

});
```
您还可以通过Bower或者NPM进行安装。

#### 步骤2：将PhotoSwipe（.pswp）元素添加到DOM

您可以通过JS动态地添加HTML代码（直接在初始化之前），也可以将其直接添加到页面中（就像在演示页面上完成的一样）。该代码可以附加在任何地方，但最好在```</body>```之前。您可以在多个图库中重复使用它（只要您使用相同的UI类）。
``` html{4}
<!-- Root element of PhotoSwipe. Must have class pswp. -->
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

        <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

                <!--  Controls are self-explanatory. Order can be changed. -->

                <div class="pswp__counter"></div>

                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <button class="pswp__button pswp__button--share" title="Share"></button>

                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                <!-- element will get class pswp__preloader--active when preloader is running -->
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div> 
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

        </div>

    </div>

</div>
```

```pswp__bg```，```pswp__scroll-wrap```，```pswp__container```和```pswp__item```元素的顺序不能更改。

您可能会问，为什么PhotoSwipe不能通过JS自动添加此代码，原因很简单–只是为了节省文件大小，以防万一您需要对布局进行一些修改。

#### 步骤3：初始化

执行PhotoSwipe构造函数。它接受4个参数：
1. .pswp 元素（必须将其添加到DOM中）。
2. PhotoSwipe UI类。如果您包括默认的photoswipe-ui-default.js，则类将为PhotoSwipeUI_Default。也可用false.
3. 包含 slides 对象的数组
4. 可配置的选项。


#### 创建幻灯片对象数组

数组中的每个对象都应包含有关幻灯片的数据，它可以是您希望在PhotoSwipe中显示的任何内容-图像的路径，标题字符串，共享数，注释等。

PhotoSwipe默认使用5个属性：src(图像路径),w(图像宽度),h(图像高度),msrc(小图像占位符的路径，大图像将在顶部加载)，html（自定义HTML，更多关于它）

在导航过程中，PhotoSwipe将自己的属性添加到该对象（如minZoom或已加载）

您可以在PhotoSwipe读取时通过 gettingData事件动态定义幻灯片内容，例如，根据不同的屏幕尺寸提供不同的图像。

#### 如何从链接列表构建幻灯片数组

假设您有一个看起来像这样的链接/缩略图列表（有关画廊标记的更多信息）：
``` js{4}
<div class="my-gallery" itemscope itemtype="http://schema.org/ImageGallery">

    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
        <a href="large-image.jpg" itemprop="contentUrl" data-size="600x400">
            <img src="small-image.jpg" itemprop="thumbnail" alt="Image description" />
        </a>
        <figcaption itemprop="caption description">Image caption</figcaption>
    </figure>

    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
        <a href="large-image.jpg" itemprop="contentUrl" data-size="600x400">
            <img src="small-image.jpg" itemprop="thumbnail" alt="Image description" />
        </a>
        <figcaption itemprop="caption description">Image caption</figcaption>
    </figure>


</div>
```
并且您想点击缩略图以打开具有大图的PhotoSwipe，你需要执行以下操作：
1. 将点击事件绑定到链接/缩略图。
2. 用户单击缩略图后，找到其索引。
3. 从DOM元素创建幻灯片对象数组–遍历找到链接的所有href属性值（大图像url），data-size属性（图像大小），缩略图的src和标题的内容。

photosweep并不在乎你怎么做。如果您使用jQuery或MooTools之类的框架，或者不需要支持IE8，代码可以大大简化。

以下带有IE8支持的纯Vanilla JS实现：
``` js{4}
var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');
```

## 选项
选项以键值对的形式添加并作为参数传递给PhotoSwipe构造函数，例如：

``` js{4}
var options = {
    index: 3,
    escKey: false,

    // ui option
    timeToIdle: 4000
};
var gallery = new PhotoSwipe( someElement, PhotoSwipeUI_Default, someItems, options);
gallery.init();

// Note that options object is cloned during the initialization.
// But you can access it via `gallery.options`.
// For example, to dynamically change `escKey`:
gallery.options.escKey = false;

// `options.escKey = false` will not work
```

### 核心

- **index**: number类型| 默认值：0

开始幻灯片索引。0是第一张幻灯片。必须为整数，而不是字符串。

- **getThumbBoundsFn**: function
函数应该返回一个具有坐标的对象，初始缩放动画将从坐标开始(或缩放动画将结束)。

对象应该包含三个属性:x (相对于文档左上角水平偏移量)，y (相对于文档左上角垂直偏移量)，w(元素的宽度)。高度将根据大图的尺寸自动计算。例如，如果你返回{x:0,y:0,w:50}缩放动画将从页面左上角开始。

函数包含一个参数```index```：打开或关闭项的下标.

在非模态框模式下，模板相对于视图的位置应该从x和y中减去。更多信息请看[FAQ](https://photoswipe.com/documentation/faq.html#inline-gallery)。

计算缩略图位置的例子:

``` js{4}
getThumbBoundsFn: function(index) {

    // find thumbnail element
    var thumbnail = document.querySelectorAll('.my-gallery-thumbnails')[index];

    // get window scroll Y
    var pageYScroll = window.pageYOffset || document.documentElement.scrollTop; 
    // optionally get horizontal scroll

    // get position of element relative to viewport
    var rect = thumbnail.getBoundingClientRect(); 

    // w = width
    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};


    // Good guide on how to get element coordinates:
    // http://javascript.info/tutorial/coordinates
}
```

如果你的缩略图的尺寸与大图像的尺寸不匹配，考虑启用缩放+渐变过渡。您可以通过添加选项```showHideOpacity:true```来做到这一点(试着将它添加到上面的代码页来测试它的外观)。或者通过添加```hideAnimationDuration:0```, ```showAnimationDuration:0```来禁用过渡。更多信息在[FAQ](https://photoswipe.com/documentation/faq.html#different-thumbnail-dimensions)中。

- **showHideOpacity** :boolean | false

如果设置为false:过渡动画时图片的透明度不会随着图片的缩放而改变，否则 根PhotoSwipe元素的透明度和图片缩放会随着过渡动画而改变

如果想要仅仅启用透明度过渡(没有缩放)，不要定义getThumbBoundsFn选项。

- **showAnimationDuration** number | 333

放大动画持续时间(毫秒)。设置为0禁用。除了这个JS选项，你还需要CSS文件:

``` css{4}
.pswp--animate_opacity,
.pswp__bg,
.pswp__caption,
.pswp__top-bar,
.pswp--has_mouse .pswp__button--arrow--left,
.pswp--has_mouse .pswp__button--arrow--right{
    -webkit-transition: opacity 333ms cubic-bezier(.4,0,.22,1);
    transition: opacity 333ms cubic-bezier(.4,0,.22,1);
}
```

如果使用Sass，只需更改_main-settings.scss中的转换持续时间变量。
- **hideAnimationDuration** : number | 333

缩小动画的持续时间，pswp——open类将被添加到根元素中，您可以使用它在CSS中应用不同的转换持续时间。

- **bgOpacity**: number | 1

```.pswp__bg``` 元素背景的透明度，取值范围0-1，通过js设置，随着相关手势改变。

- **spacing**: number | 0.12

幻灯片间隔，单位百分比，0.12表示滑动饰扣宽度的12%（四舍五入）

- **allowPanToNext**: boolean | true

允许手势滑动到切换时图片处于缩放状态，此选项在无触摸手势的设备上永远为false。

- **maxSpreadZoom**：number | 2

执行扩展(缩放)手势时的最大缩放级别。2表示图像可以从原来的大小缩小2倍。在这里尽量避免大的值，因为太大的图像可能会在移动设备上导致内存问题(尤其是在iOS上)。

- **getDoubleTapZoom**：function

在双击手势触发后返回缩放级别，或当用户点击缩放图标时，或当鼠标点击图片时。如果返回1 图片将回到原始尺寸。

默认值：
``` js{4}
getDoubleTapZoom: function(isMouseClick, item) {

    // isMouseClick          - true if mouse, false if double-tap
    // item                  - slide object that is zoomed, usually current
    // item.initialZoomLevel - initial scale ratio of image
    //                         e.g. if viewport is 700px and image is 1400px,
    //                              initialZoomLevel will be 0.5

    if(isMouseClick) {

        // is mouse click on image or zoom icon

        // zoom to original
        return 1;

        // e.g. for 1400px image:
        // 0.5 - zooms to 700px
        // 2   - zooms to 2800px

    } else {

        // is double-tap

        // zoom to original if initial zoom is less than 0.7x,
        // otherwise to 1.5x, to make sure that double-tap gesture always zooms image
        return item.initialZoomLevel < 0.7 ? 1 : 1.5;
    }
}
```

函数在每次启动放大动画时被调用。因此，您可以根据图像的大小或屏幕DPI为不同的图像返回不同的值。

- **loop**：boolean | true

手势滑动时是否循环滚动。当滚动选项少于3张时一直为 false

此选项与箭头导航无关。箭头循环永久开启。您可以通过创建自定义UI来修改此行为。

- **pinchToClose**：boolean | true

双指捏合关闭画廊手势，画廊的背景将逐渐淡出，因为用户缩小。手势完成后，画廊将关闭

- **closeOnScroll**：boolean | true

页面滚动时关闭画廊，该选项只适用于非手势设备。

- **closeOnVerticalDrag**：boolean | true

垂直拖动图片时关闭画廊。

- **mouseUsed**：boolean | true

该选项允许您预定义是否使用鼠标，一些PhotoSwipe 特性依赖它，例如：默认的UI左右箭头只会在选项设置为true的情况下显示，

- **escKey**：boolean | true

支持使用```Esc```键退出画廊模式，此属性支持动态设置
```yourPhotoSwipeInstance.options.escKey = false;```

- **arrowKeys**: boolean | true

是否开启键盘左右键导航，可动态开启```yourPhotoSwipeInstance.options.arrowKeys = false;```

- **history**： boolean | true

如果设置为false，则禁用历史记录模块(后退按钮关闭图库，每个幻灯片的唯一URL)。您还可以从构建中排除history.js模块。

- **galleryUID**: number | 1

画廊唯一ID。历史模块在形成URL时使用。例如，带有UID 1的画廊的第二张图片将有URL: http://example.com/#&gid=1&pid=2。

- **galleryPIDs**： boolean | false

允许为每个幻灯片对象自定义id。如果将选项设置为true，则滑动对象必须具有pid(图片标识符)属性，该属性可以是字符串或整数。例如:
``` js{4}
var slides = [
    {
        src: 'path/to/1.jpg',
        w:500,
        h:400,
        pid: 'image-one'
    },
    {
        src: 'path/to/2.jpg',
        w:300,
        h:700,
        pid: 'image-two'
    },

    ... 
];
```

第二个幻灯片的Url为 ```http://example.com/#&gid=1&pid=image-two```

有关如何实现自定义PID的更多信息，请参阅FAQ部分。

- **errorMsg** :string

图像未加载时的错误信息 ```%url%```将被图像的url替换。

默认值：
``` html{4}
<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>
```

- **preload**: array | [1,1]

根据移动方向延迟加载附近的图片。应该是一个有两个整数的数组，第一个整数是当前图像之前要预加载的项数，第二个整数是当前图像之后后要预加载的项数。例如，如果你把它设置为[1,3]，它将加载当前图片之前一张图片和之后的三张图片。数组的值不能小于1。

- **mainClass**: string | undefined

.pswp 根元素的额外添加的类名，可以包含多个类名，已空格分隔

- **getNumItemsFn**：function

返回画廊中图片总数的函数。尽量保证函数简洁，此函数会频繁执行。

- **focus**： boolean | true

画廊打开后将设置PhotoSwipe 元素为焦点

- **isClickableElement**：function

默认值：
``` js{4}
isClickableElement: function(el) {
    return el.tagName === 'A';
}
```

检查元素是否可以点击，如果是，PhotoSwipe 将不执行 ```preventDefault```以保证点击生效。
函数应该尽可能间接，因为它在拖动时会被多次执行。

- **modal**： boolean | true

控制 PhotoSwipe 查看器是否占据整个视图区域。 如果设置为false，查看器将已当前位置父元素为魔板展开

#### 默认UI选项

将PhotoSwipeUI_Default (dist/ui/photoswipe-ui-default.js)的选项以相同的方式添加到与核心选项相同的对象中。

``` js{4}
// 顶部导航和底部状态栏的高度,
// "bottom" 属性的值可以是 'auto' (自动计算高度)
// 属性在mouse使用情况下才能生效, 
// 或者屏幕宽度大于 1200px
// 
// (Also refer to `parseVerticalMargin` event)
barsSize: {top:44, bottom:'auto'}, 

// Adds class pswp__ui--idle to pswp__ui element when mouse isn't moving for 4000ms
// 当鼠标不移动4000毫秒后，将类pswp__ui--idle添加到pswp__ui元素
timeToIdle: 4000,

// Same as above, but this timer applies when mouse leaves the window
// 当鼠标离开窗口后添加
timeToIdleOutside: 1000,

// Delay until loading indicator is displayed
// 显示加载指示器的延迟
loadingIndicatorDelay: 1000,

// Function builds caption markup
addCaptionHTMLFn: function(item, captionEl, isFake) {
    // item      - slide object
    // captionEl - caption DOM element
    // isFake    - true when content is added to fake caption container
    //             (used to get size of next or previous caption)

    if(!item.title) {
        captionEl.children[0].innerHTML = '';
        return false;
    }
    captionEl.children[0].innerHTML = item.title;
    return true;
},

// Buttons/elements
closeEl:true,
captionEl: true,
fullscreenEl: true,
zoomEl: true,
shareEl: true,
counterEl: true,
arrowEl: true,
preloaderEl: true,

// Tap on sliding area should close gallery
tapToClose: false,

// Tap should toggle visibility of controls
tapToToggleControls: true,

// Mouse click on image should close the gallery,
// only when image is smaller than size of the viewport
clickToCloseNonZoomable: true,

// Element classes click on which should close the PhotoSwipe.
// In HTML markup, class should always start with "pswp__", e.g.: "pswp__item", "pswp__caption".
// 
// "pswp__ui--over-close" class will be added to root element of UI when mouse is over one of these elements
// By default it's used to highlight the close button.
closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'], 

// Separator for "1 of X" counter
indexIndicatorSep: ' / ',



// Share buttons
// 
// Available variables for URL:
// {{url}}             - url to current page
// {{text}}            - title
// {{image_url}}       - encoded image url
// {{raw_image_url}}   - raw image url
shareButtons: [
    {id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
    {id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
    {id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'},
    {id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
],


// Next 3 functions return data for share links
// 
// functions are triggered after click on button that opens share modal,
// which means that data should be about current (active) slide
getImageURLForShare: function( shareButtonData ) {
    // `shareButtonData` - object from shareButtons array
    // 
    // `pswp` is the gallery instance object,
    // you should define it by yourself
    // 
    return pswp.currItem.src || '';
},
getPageURLForShare: function( shareButtonData ) {
    return window.location.href;
},
getTextForShare: function( shareButtonData ) {
    return pswp.currItem.title || '';
},

// Parse output of share links
parseShareButtonOut: function(shareButtonData, shareButtonOut) {
    // `shareButtonData` - object from shareButtons array
    // `shareButtonOut` - raw string of share link element
    return shareButtonOut;
}
```

## API

以下所有的属性和方法都是公共的，您可以在初始化时获取PhotoSwipe实例化对象
``` js{4}
var photoswipeInstance = new PhotoSwipe( /* ... */ );
```

### 方法

``` js{4}
var pswp = new PhotoSwipe( /* ... */ );

// 初始化与打开画廊
// (您可以在调用之前绑定事件)
pswp.init();

// Go to slide by index
// @param {int} `index`
pswp.goTo(index);

// Go to the next slide
pswp.next();

// Go to the previous slide
pswp.prev();

// 更新画廊尺寸
// @param  {boolean} `force` 如果设置为 true, 即使视图尺寸没有发生变化也会触发更新
//                          
pswp.updateSize(force);

// Close gallery
pswp.close();

// Destroy gallery,
// automatically called after close() 
pswp.destroy()

// Zoom current slide to (optionally with animation)
// @param  {number}   `destZoomLevel` Destination scale number. 1 - original.  
//                                   pswp.currItem.fitRatio - image will fit into viewport.
// @param  {object}   `centerPoint`   Object of x and y coordinates, relative to viewport.
// @param  {int}      `speed`         Animation duration. Can be 0.
// @param  {function} `easingFn`      Easing function (optional). Set to false to use default easing.
// @param  {function} `updateFn`      Function will be called on each update frame. (optional)
//
// Example below will 2x zoom to center of slide:
// pswp.zoomTo(2, {x:pswp.viewportSize.x/2,y:pswp.viewportSize.y/2}, 2000, false, function(now) {
//      
// });
pswp.zoomTo(destZoomLevel, centerPoint, speed, easingFn, updateFn);

// Apply zoom and pan to the current slide
// 
// @param   {number} `zoomLevel`
// @param   {int}    `panX`
// @param   {int}    `panY`
// 
// For example: `pswp.applyZoomPan(1, 0, 0)`
// will zoom current image to the original size
// and will place it on top left corner
// 
// 
pswp.applyZoomPan(zoomLevel, panX, panY);
```

### 属性

``` js{4}
// current slide object
pswp.currItem

// items array (slides, images)
pswp.items

// size of sliding viewport
pswp.viewportSize

// object holds all functions from framework
// framework-bridge.js
pswp.framework

// UI object (e.g. PhotoSwipeUI_Default instance)
pswp.ui

// background element (pswp__bg)
pswp.bg

// container element (pswp__container)
pswp.container

// options
pswp.options



// Even though methods below aren't technically properties, we list them here:

// current item index (int)
pswp.getCurrentIndex();

// total number of items
pswp.options.getNumItemsFn()

// current zoom level (number)
pswp.getZoomLevel();

// one (or more) pointer is used
pswp.isDragging();

// two (or more) pointers are used
pswp.isZooming();

// `true` when transition between is running (after swipe)
pswp.isMainScrollAnimating();
```
 ### 事件
 
 PhotoSwipe 使用了非常简单的事件/通知系统。它包含两个方法```shout```(触发事件) 和 ```listen```(控制器),目前还没有方法来解除绑定监听器,但是他们会在PhotoSwipe关闭时全部被清除
 
 ``` js{4}
 var pswp = new PhotoSwipe(/* ... */);

// Listen for "helloWorld" event
pswp.listen('helloWorld', function(name) {
    alert('Name is: ' + name);
});

// Trigger "helloWorld" event
pswp.shout('helloWorld', 'John' /* you may pass more arguments */);
```
 可用事件：
 
 ``` js{4}
 // 图片切换之前
// (内容变化之前，导航变化之后)
// Update UI here (like "1 of X" indicator)
pswp.listen('beforeChange', function() { });

// 图片切换完成后
// (after content changed)
pswp.listen('afterChange', function() { });

// 图片加载完成
pswp.listen('imageLoadComplete', function(index, item) { 
    // index - index of a slide that was loaded
    // item - slide object
});

// 视窗尺寸发生改变
pswp.listen('resize', function() { });

// PhotoSwipe 读取 slide 数据时触发,
// which happens before content is set, or before lazy-loading is initiated.
// 多用来动态修改属性
pswp.listen('gettingData', function(index, item) {
    // index - index of a slide that was loaded
    // item - slide object

    // e.g. change path to the image based on `something`
    if( something ) {
        item.src = item.something;
    } else {
        item.src = item.somethingElse;
    }
});

// Mouse was used (triggers only once)
pswp.listen('mouseUsed', function() { });


// 放大动画开始时触发
pswp.listen('initialZoomIn', function() { });

// 放大动画结束时触发
pswp.listen('initialZoomInEnd', function() { });

// 缩小动画开始时触发
pswp.listen('initialZoomOut', function() { });

// 缩小动画结束后触发
pswp.listen('initialZoomOutEnd', function() { });


// 允许覆盖单个slide项的垂直外边距
pswp.listen('parseVerticalMargin', function(item) { 
    // For example:
    var gap = item.vGap;

    gap.top = 50; // There will be 50px gap from top of viewport
    gap.bottom = 100; // and 100px gap from the bottom
})

// 画廊开始关闭
pswp.listen('close', function() { });

// 画廊解绑事件
// (关闭动画开始时触发)
pswp.listen('unbindEvents', function() { });

// 画廊关闭且动画执行完成后触发.
// Clean up your stuff here.
pswp.listen('destroy', function() { });

// 页面滚动时调用.
// 回调函数传递一个偏移量对象 {x: number, y: number}.
//
// PhotoSwipe 通过偏移量确定页面的左上角位置
// 当module设置为false时，默认为视窗左上角,
// 您应该在调用 .init()之前监听此事件并修改偏移量
// 使用魔板的 getBoundingClientRect().
//
// Look at the "Implementing inline gallery display" FAQ section for more info.
pswp.listen('updateScrollOffset', function(_offset) {
    var r = gallery.template.getBoundingClientRect();
    _offset.x += r.left;
    _offset.y += r.top;
});

// PhotoSwipe有一个名为pswpTap的特殊事件
// 使用默认的JavaScript事件模型调度。
// 因此，你可以调用 stopPropagation.
// pswp.framework.bind - 是 addEventListener的缩写
pswp.framework.bind( pswp.scrollWrap /* bind on any element of gallery */, 'pswpTap', function(e) {
    console.log('tap', e, e.detail);
    // e.detail.origEvent  // original event that finished tap (e.g. mouseup or touchend)
    // e.detail.target // e.target of original event
    // e.detail.releasePoint // object with x/y coordinates of tap
    // e.detail.pointerType // mouse, touch, or pen
});

// Allow to call preventDefault on down and up events
pswp.listen('preventDragEvent', function(e, isDown, preventObj) {
    // e - original event
    // isDown - true = drag start, false = drag release

    // Line below will force e.preventDefault() on:
    // touchstart/mousedown/pointerdown events
    // as well as on:
    // touchend/mouseup/pointerup events
    preventObj.prevent = true;
});



// Default UI events
// -------------------------

// 分享按钮点击事件
pswp.listen('shareLinkClick', function(e, target) { 
    // e - original click event
    // target - link that was clicked

    // If `target` has `href` attribute and 
    // does not have `download` attribute - 
    // share modal window will popup
});
 ```
 ### 动态添加slides
 
 直接修改items数组即可:
 
 ``` js{4}
 pswp.items.push({
    src: "path/to/image.jpg", 
    w:1200,
    h:500 
});
```
 如果您修改的是当前、下一个或上一个slide，你需要调用方法来更新他们
 
 ``` js{4}
 // sets a flag that slides should be updated
pswp.invalidateCurrItems();
// updates the content of slides
pswp.updateSize(true);
 ```
 
 否则，您无需执行其他任何操作。如果您要更新默认UI的某些部分（例如，“ 1 of X”计数器），则可能会调用pswp.ui.update（）。另请注意：
 - 您不能赋值整个数组，只能对其进行修改（例如，使用splice删除元素）。
 - 如果要删除当前slide-请先调用 goTo 方法
 - 至少需要一个slide
 - 此方法用于服务响应式图片。
 
## 自定义HTML内容

如果您想在Slide中显示HTML内容，您需要在slides对象中定义 html属性。它应该是HTML字符串或者DOM元素对象

``` js{4}
var items = [
    // slide 1 with HTML
    {
        html: '<div><h1>Any HTML <a href="http://example.com">content</a></h1></div>'
    },

    // slide 2 with image
    {
        src: 'path/to/image.jpg',
        w:600,
        h:200
    }
];


// 初始化
var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

// 不必一开始就包含html属性.
// 也可以在gettingData事件中动态插入:
/*
    gallery.listen('gettingData', function(index, item) {
        if(index === 3) {
            item.html = '<div>Dynamically generated HTML ' + Math.random() + '</div>';
        }

    });
*/

// 绑定gettingData事件后调用 init方法。
gallery.init();
```

其他重要说明：
- 为了避免与其他第三方模块冲突，包含html属性的slide项应该不包含src属性
- PhotoSwipe 是为图片设计，而不是作为文本内容的滚动容器，例如带有相关画廊的幻灯片，介绍性幻灯片或图像之间的广告
- 强烈建议您不要使用此方法添加视频或音频元素或者iframe，由于HTML5视频在许多移动浏览器中都阻止了触摸事件（用户将无法对其进行滑动）。如果确实需要在PhotoSwipe中播放视频，则可以将其添加为用户在当前幻灯片上轻按时出现的模态框中，可以在DOM中动态创建模态并将其添加到```.pswp__scroll-wrap```元素之后
- 如果您启用了初始放大/缩小过渡，如果当前幻灯片具有```html```，PhotoSwipe将自动禁用它，而将使用简单的淡入过渡。
- 默认情况下，PhotoSwipe将仅在a标签及其子元素上允许单击事件。要更改此行为，请查看isClickableElement选项或preventDragEvent事件
- HTML slides不支持缩放。


## 响应式图片

PhotoSwipe不支持```<picture>```或srcset，因为它需要定义的图像尺寸并使用延迟加载。但是，由于图像是动态加载的，即使在不支持srcset的旧浏览器中，切换资源也很容易。

假设您只有“中”图像和“原始”（“大”）图像。首先，您需要将图像的路径和大小存储在幻灯片对象中，例如:
``` js{4}
var items = [

    // Slide 1
    {
        mediumImage: {
            src: 'path/to/medium-image-1.jpg',
            w:800,
            h:600
        },
        originalImage: {
            src: 'path/to/large-image-1.jpg',
            w: 1400,
            h: 1050
        }
    },

    // Slide 2
    // {
    //     mediumImage: {
    //         src: 'path/to/medium-image-2.jpg',
    //         ...
    //     
    // ...

];
```

然后：

``` js{4}
// initialise as usual
var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

// 声明变量保存实际视窗宽度
var realViewportWidth,
    useLargeImages = false,
    firstResize = true,
    imageSrcWillChange;

// 在视窗发生改变时会触发 beforeResize 事件
gallery.listen('beforeResize', function() {
    // gallery.viewportSize.x - width of PhotoSwipe viewport
    // gallery.viewportSize.y - height of PhotoSwipe viewport
    // window.devicePixelRatio - ratio between physical pixels and device independent pixels (Number)
    //                          1 (regular display), 2 (@2x, retina) ...


    // 计算视窗真实像素
    realViewportWidth = gallery.viewportSize.x * window.devicePixelRatio;

    // 如果要图像在window.resize上动态切换，则需要以下代码。

    // Find out if current images need to be changed
    if(useLargeImages && realViewportWidth < 1000) {
        useLargeImages = false;
        imageSrcWillChange = true;
    } else if(!useLargeImages && realViewportWidth >= 1000) {
        useLargeImages = true;
        imageSrcWillChange = true;
    }

    // Invalidate items only when source is changed and when it's not the first update
    if(imageSrcWillChange && !firstResize) {
        // invalidateCurrItems sets a flag on slides that are in DOM,
        // which will force update of content (image) on window.resize.
        gallery.invalidateCurrItems();
    }

    if(firstResize) {
        firstResize = false;
    }

    imageSrcWillChange = false;

});


// gettingData event fires each time PhotoSwipe retrieves image source & size
gallery.listen('gettingData', function(index, item) {

    // Set image source & size based on real viewport width
    if( useLargeImages ) {
        item.src = item.originalImage.src;
        item.w = item.originalImage.w;
        item.h = item.originalImage.h;
    } else {
        item.src = item.mediumImage.src;
        item.w = item.mediumImage.w;
        item.h = item.mediumImage.h;
    }

    // It doesn't really matter what will you do here, 
    // as long as item.src, item.w and item.h have valid values.
    // 
    // Just avoid http requests in this listener, as it fires quite often

});


// Note that init() method is called after gettingData event is bound
gallery.init();
```

- 您不必使用看起来完全像上面的幻灯片对象的结构（带有mediumImage和largeImage对象）。例如，您可以将图像的大小直接存储在图像文件名（/path/to/large-image-600x500.jpg）中，然后在getDataData事件中解析大小。PhotoSwipe仅在触发getData事件后才读取item.src，item.w和item.h属性。
- 图片越大，动画越不平滑
- 尽量避免仅基于devicePixelRatio或仅基于视口大小来提供图片，请始终将两者结合
- 缩略图上允许使用 ```srcset```

## 性能优化

### 动画

- 动画效果很大程度上取决于图像的大小。图片越小动画越平滑。因此，请不要使用懒加载和响应式图片，或者在移动设备商使用大于1200x1200的图片
- 不要在动画持续期间使用导致重排或重绘的操作。不要向DOM中添加新元素。不要修改```display```或```visibility```属性.您只能修改```transform```和```opacity```。尽量使用```beforeChange```,```initialZoomInEnd```,```initialZoomOutEnd``` 事件在动画结束后延迟修改
- 如果启用了放大/缩小动画，则尽量避免在打开PhotoSwipe的缩略图上使用复杂的：hover和：active效果（应用第一个规则）。
- 尽量不要在PhotoSwipe滑动区域上的UI上设置复杂的样式。例如，字幕文本上的文本阴影可能会引起问题。


### 包含文件
- 默认的PhotoSwipe UI具有png和svg精灵图。默认情况下，仅在打开PhotoSwipe之后才加载它。为了使控件立即显示，您可以将Gallery 精灵图与站点“ main” 精灵图合并，或使用CSS预加载。
- 如果PhotoSwipe 不是页面的主要功能，请异步加载PhotoSwipe JS文件
- 压缩合并js,css文件