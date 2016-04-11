var resourceLoader;

App.onLaunch = function (options) {
    var javascriptFiles = [
        `${options.BASEURL}js/Network.js`,
        `${options.BASEURL}js/AppData.js`,
        `${options.BASEURL}js/ResourceLoader.js`,
        `${options.BASEURL}js/Presenter.js`
    ];

    evaluateScripts(javascriptFiles, function (success) {
        if (success) {
            Network.jsonRequest({
                url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
                method: 'GET',
                callback: function (err, data) {
                    AppData.trending = data.data;
                    resourceLoader = new ResourceLoader(options.BASEURL);
                    resourceLoader.loadResource(`${options.BASEURL}templates/main.xml.js`, function (resource) {
                        var doc = Presenter.makeDocument(resource);
                        doc.addEventListener("select", Presenter.load.bind(Presenter));
                        Presenter.pushDocument(doc);
                    })
                }
            });

        } else {
            var errorDoc = createAlert("Evaluate Scripts Error", "Error attempting to evaluate external JavaScript files.");
            navigationDocument.presentModal(errorDoc);
        }
    });
};

var createAlert = function (title, description) {
    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
		<document>
			<alertTemplate>
				<title>${title}</title>
				<description>${description}</description>
				<button>
					<text>OK</text>
				</button>
			</alertTemplate>
		</document>`;
    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc;
}