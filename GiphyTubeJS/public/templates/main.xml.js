var Template = function () {
    var appName = "GiphyTube";
    var title = "Trending";
    var items = AppData.trending.map(function (item) {
        return buildItem(item.images.looping.mp4, item.images.original_still.url);
    });
    var template = `<?xml version="1.0" encoding="UTF-8" ?>
                <document>
                   <catalogTemplate>
                      <banner>
                         <title>${appName}</title>
                      </banner>
                      <list>
                         <section>
                            <listItemLockup>
                               <title>${title}</title>
                               <relatedContent>
                                  <grid>
                                     <section>
                                        ${items}
                                     </section>
                                  </grid>
                               </relatedContent>
                            </listItemLockup>
                         </section>
                      </list>
                   </catalogTemplate>
                </document>`;
    return template;
};

function buildItem(videoURL, previewURL) {
    return `<lockup videoURL="${videoURL}">
                <img src="${previewURL}" width="500" height="308"/>
            </lockup>`;
};